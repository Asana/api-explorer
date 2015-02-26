/// <reference path="../asana.d.ts" />
/// <reference path="../asana_json.d.ts" />
import Asana = require("asana");
import AsanaJson = require("asana-json");
import react = require("react/addons");
import TypedReact = require("typed-react");
import url = require("url");
import _ = require("lodash");

import build = require("./build");
import constants = require("../constants");
import CredentialsManager = require("../credentials_manager");
import JsonResponse = require("./json_response");
import PropertyEntry = require("./property_entry");
import ResourceEntry = require("./resource_entry");
import RouteEntry = require("./route_entry");

import Resources = require("../resources");

var r = react.DOM;

interface ParamData {
  expand_fields: string[];
  include_fields: string[];
}

export interface Props {
  initialClient?: Asana.Client;
  initial_resource_string?: string;
  initial_route?: string;
}

export interface State {
  action?: AsanaJson.Action;
  client?: Asana.Client;
  params?: ParamData;
  resource?: AsanaJson.Resource;
  response?: JsonResponse.ResponseData;
}

/**
 * The main API Explorer component.
 */
export class Component extends TypedReact.Component<Props, State> {
  /**
   * If a client exists in props, use it. Otherwise, make a new one.
   * Fetch OAuth information from localStorage, and put in the client.
   *
   * @returns {Asana.Client}
   */
  initializeClient(): Asana.Client {
    var client = this.props.initialClient || Asana.Client.create({
        clientId: constants.CLIENT_ID,
        redirectUri: constants.REDIRECT_URI
      });
    client.useOauth({
      credentials: CredentialsManager.getFromLocalStorage(),
      flowType: Asana.auth.PopupFlow
    });

    return client;
  }

  getInitialState() {
    // Fetch the resource JSON given in the props, if any.
    var resource =
      Resources.resourceFromResourceName(this.props.initial_resource_string) ||
      Resources.resourceFromResourceName("Users");

    // If the initial route is valid, use it. Otherwise, use a valid one.
    var action =
      Resources.actionFromResourcePath(resource, this.props.initial_route) ||
      resource.actions[0];

    return {
      action: action,
      client: this.initializeClient(),
      params: <ParamData>{
        expand_fields: [],
        include_fields: []
      },
      resource: resource,
      response: <JsonResponse.ResponseData>{
        action: undefined,
        route: undefined,
        raw_response: undefined
      }
    };
  }

  /**
   * Authorize the client, if it has expired, and force a re-rendering.
   */
  authorize() {
    this.state.client.authorize().then(function() {
      CredentialsManager.storeFromClient(this.state.client);

      if (this.isMounted()) {
        this.forceUpdate();
      }
    }.bind(this));
  }

  /**
   * Uses the state to return the properly-formatted request parameters.
   */
  requestParams() {
    var params = { };

    if (this.state.params.expand_fields.length > 0) {
      params = _.extend(params, {
        opt_expand: this.state.params.expand_fields.join()
      });
    }
    if (this.state.params.include_fields.length > 0) {
      params = _.extend(params, {
        opt_fields: this.state.params.include_fields.join()
      });
    }

    return params;
  }

  /**
   * Uses the state to return the URL for the current API request.
   * @returns {string}
   */
  requestUrl(): string {
    var parsed = url.parse(this.state.action.path);
    parsed.query = this.requestParams();

    return url.format(parsed).replace(/%2C/g, ",");
  }
  /**
   * Updates the resource state following an onChange event.
   */
  onChangeResourceState(event: React.FormEvent) {
    var resource = Resources.resourceFromResourceName(
      (<HTMLSelectElement>event.target).value);
    var has_changed = resource !== this.state.resource;

    // If the resource has changed, also reset relevant parts of state.
    var action = !has_changed ? this.state.action : resource.actions[0];
    var params = !has_changed ?
      this.state.params : <ParamData>{ expand_fields: [], include_fields: [] };

    this.setState({
      action: action,
      params: params,
      resource: resource
    });
  }

  /**
   * Updates the action state following an onChange event.
   */
  onChangeActionState(event: React.FormEvent) {
    var action_name = (<HTMLSelectElement>event.target).value;
    this.setState({
      action: Resources.actionFromName(this.state.resource, action_name)
    });
  }

  /**
   * Returns a function to handle the onChange event for a given param_type.
   * @param param_type
   * @returns {function(React.FormEvent): void}
   */
  onChangePropertyChecked(param_type: string) {
    return (event: React.FormEvent) => {
      var target = <HTMLInputElement>event.target;
      var params: any = this.state.params;

      if (target.checked) {
        params[param_type].push(target.value);
      } else {
        params[param_type] = _.without(params[param_type], target.value);
      }

      this.setState({
        params: params
      });
    };
  }

  /**
   * Send a get request to the API using the current state's route, and
   * update the state after receiving a response.
   */
  onSubmitRequest(event: React.FormEvent) {
    event.preventDefault();

    var dispatcher = this.state.client.dispatcher;
    var route = this.state.action.path;
    var params = this.requestParams();

    dispatcher.get(route, params, null).then(function(response: any) {
      this.setState({
        response: <JsonResponse.ResponseData>{
          action: this.state.action,
          raw_response: response,
          route: this.requestUrl()
        }
      });
    }.bind(this)).error(function(e: any) {
      this.setState({
        response: <JsonResponse.ResponseData>{
          action: this.state.action,
          error: e,
          raw_response: e.value,
          route: this.requestUrl()
        }
      });
    }.bind(this)).finally(function() {
      // Store possibly-updated credentials for later use.
      CredentialsManager.storeFromClient(this.state.client);
    }.bind(this));
  }

  render() {
    if (!CredentialsManager.isPossiblyValidFromClient(this.state.client)) {
      return r.a({
        className: "authorize-link",
        href: "#",
        onClick: this.authorize
      }, "Click to authorize!");
    } else {
      return r.div({
        className: "api-explorer",
        children: [
          ResourceEntry.create({
            resource: this.state.resource,
            onResourceChange: this.onChangeResourceState
          }),
          RouteEntry.create({
            resource: this.state.resource,
            action: this.state.action,
            onFormSubmit: this.onSubmitRequest,
            onActionChange: this.onChangeActionState
          }),
          r.div( { },
            PropertyEntry.create({
              text: "Include Fields: ",
              properties: this.state.resource.properties,
              useProperty: property =>
                _.contains(this.state.params.include_fields, property),
              isPropertyChecked: this.onChangePropertyChecked("include_fields")
            }),
            PropertyEntry.create({
              text: "Expand Fields: ",
              properties: this.state.resource.properties,
              useProperty: property =>
                _.contains(this.state.params.expand_fields, property),
              isPropertyChecked: this.onChangePropertyChecked("expand_fields")
            })
          ),
          JsonResponse.create({
            response: this.state.response
          })
        ]
      });
    }
  }
}

export var create = build(Component);
