/// <reference path="../asana.d.ts" />
/// <reference path="../asana_json.d.ts" />
import Asana = require("asana");
import AsanaJson = require("asana-json");
import react = require("react");
import TypedReact = require("typed-react");

import build = require("./build");
import constants = require("../constants");
import CredentialsManager = require("../credentials_manager");
import JsonResponse = require("./json_response");
import ResourceEntry = require("./resource_entry");
import RouteEntry = require("./route_entry");

import Resources = require("../resources");

var r = react.DOM;

export interface Props {
  initialClient?: Asana.Client;
  initial_resource_string?: string;
  initial_route?: string;
}

export interface State {
  action?: AsanaJson.Action;
  client?: Asana.Client;
  params?: any;
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
      params: { },
      resource: resource,
      response: <JsonResponse.ResponseData>{
        action: undefined,
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
   * Updates the resource state following an onChange event.
   */
  onChangeResourceState(event: React.FormEvent) {
    var resource = Resources.resourceFromResourceName(
      (<HTMLSelectElement>event.target).value);

    // If the resource has changed, also update the action.
    var action = (resource !== this.state.resource) ?
      resource.actions[0] : this.state.action;

    this.setState({
      resource: resource,
      action: action
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
   * Send a get request to the API using the current state's route, and
   * update the state after receiving a response.
   */
  onSubmitRequest(event: React.FormEvent) {
    event.preventDefault();

    var dispatcher = this.state.client.dispatcher;
    var params = this.state.params;
    var route = this.state.action.path;

    dispatcher.get(route, params, null).then(function(response: any) {
      this.setState({
        response: <JsonResponse.ResponseData>{
          action: this.state.action,
          params: params,
          raw_response: response
        }
      });

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
          JsonResponse.create({
            response: this.state.response
          })
        ]
      });
    }
  }
}

export var create = build(Component);
