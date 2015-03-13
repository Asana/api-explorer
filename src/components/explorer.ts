/// <reference path="../asana.d.ts" />
/// <reference path="../resources/interfaces.ts" />
import Asana = require("asana");
import React = require("react/addons");
import url = require("url");
import util = require("util");
import _ = require("lodash");

import constants = require("../constants");
import CredentialsManager = require("../credentials_manager");
import JsonResponse = require("./json_response");
import ParameterEntry = require("./parameter_entry");
import PropertyEntry = require("./property_entry");
import ResourceEntry = require("./resource_entry");
import Resources = require("../resources/resources");
import RouteEntry = require("./route_entry");

import ResourcesHelpers = require("../resources/helpers");

var r = React.DOM;
var update = React.addons.update;

/**
 * If a client exists in props, use it. Otherwise, make a new one.
 * Fetch OAuth information from localStorage, and put in the client.
 *
 * @returns {Asana.Client}
 */
function initializeClient(initialClient?: Asana.Client): Asana.Client {
  var client = initialClient || Asana.Client.create({
      clientId: constants.CLIENT_ID,
      redirectUri: constants.REDIRECT_URI
    });
  client.useOauth({
    credentials: CredentialsManager.getFromLocalStorage(),
    flowType: Asana.auth.PopupFlow
  });

  return client;
}

/**
 * The main API Explorer component.
 */
class Explorer extends React.Component<Explorer.Props, Explorer.State> {
  static create = React.createFactory(Explorer);

  constructor(props: Explorer.Props, context: any) {
    super(props, context);

    // Fetch the resource JSON given in the props, if any.
    var resource =
      ResourcesHelpers.resourceFromResourceName(
        this.props.initial_resource_string) ||
      Resources.Users;

    // If the initial route is valid, use it. Otherwise, use a valid one.
    var action =
      ResourcesHelpers.actionFromResourcePath(
        resource, this.props.initial_route) ||
      resource.actions[0];

    this.state = {
      action: action,
      client: initializeClient(this.props.initialClient),
      params: Explorer.emptyParams(),
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
  authorize = (): void => {
    this.state.client.authorize().then(function() {
      CredentialsManager.storeFromClient(this.state.client);

      this.forceUpdate();
    }.bind(this));
  };

  /**
   * Uses the state to return the properly-formatted request parameters.
   */
  requestParameters = () => {
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
    params = _.extend(params, this.state.params.optional_params);

    return params;
  };

  /**
   * Uses the state to return the URL for the current request.
   * @returns {string}
   */
  requestUrl = (): string => {
    // Assumes we have at-most one required parameter to put in the URL.
    var required_params = this.state.params.required_params;

    return !_.isEmpty(required_params) ?
      util.format(this.state.action.path, _.values(required_params)[0]) :
      this.state.action.path;
  };

  /**
   * Uses the state to return the URL with parameters for the current request.
   * @returns {string}
   */
  requestUrlWithFullParams = (): string => {
    var base_url = this.requestUrl();

    // Add the optional parameters to the URL.
    var parsed = url.parse(base_url);
    parsed.query = this.requestParameters();

    // Format the URL and use commas for readability.
    return url.format(parsed).replace(/%2C/g, ",");
  };

  /**
   * Updates the resource state following an onChange event.
   */
  onChangeResourceState = (event: React.FormEvent): void => {
    var resource = ResourcesHelpers.resourceFromResourceName(
      (<HTMLSelectElement>event.target).value);
    var has_changed = resource !== this.state.resource;

    // If the resource has changed, also reset relevant parts of state.
    var action = !has_changed ? this.state.action : resource.actions[0];
    var params = !has_changed ? this.state.params : Explorer.emptyParams();

    this.setState({
      action: action,
      params: params,
      resource: resource
    });
  };

  /**
   * Updates the action state following an onChange event.
   */
  onChangeActionState = (event: React.FormEvent): void => {
    var action = ResourcesHelpers.actionFromResourceAndName(
      this.state.resource, (<HTMLSelectElement>event.target).value);
    var has_changed = action !== this.state.action;

    // If the action has changed, also reset relevant parts of state.
    var params = !has_changed ? this.state.params : Explorer.emptyParams();

    this.setState({
      action: action,
      params: params
    });
  };

  /**
   * Returns a function to handle the onChange event for a given param_type.
   * @param param_type
   * @returns {function(React.FormEvent): void}
   */
  onChangePropertyChecked = (param_type: string) => {
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
  };

  /**
   * Updates the parameter state following an onChange event.
   */
  onChangeParameterState = (event: React.FormEvent): void => {
    var target = <HTMLInputElement>event.target;

    var parameter = ParameterEntry.parameterFromInputId(target.id);
    var param_type = _.contains(target.className, "required-param")
      ? "required_params" : "optional_params";

    // Update or remove the parameter accordingly.
    this.setState(update(this.state, <any>{
      params: _.object([param_type], [{
        $set: target.value === "" ?
          _.omit((<any>this.state.params)[param_type], parameter) :
          _.extend(
            (<any>this.state.params)[param_type],
            _.object([parameter], [target.value]))
      }])
    }));
  };

  /**
   * Returns true iff the user can submit a request.
   */
  canSubmitRequest = (): boolean => {
    // Require GET request.
    if (this.state.action.method !== "GET") {
      return false;
    }

    // Ensure all required parameters are set.
    var num_required_params =
      _.filter(this.state.action.params, param => param.required).length;
    if (num_required_params !== _.size(this.state.params.required_params)) {
      return false;
    }

    // At this point, we've passed all constraints.
    return true;
  };

  /**
   * Send a get request to the API using the current state's route, and
   * update the state after receiving a response.
   */
  onSubmitRequest = (event: React.FormEvent): void => {
    event.preventDefault();

    var dispatcher = this.state.client.dispatcher;
    var route = this.requestUrl();
    var params = this.requestParameters();

    dispatcher.get(route, params, null).then(function(response: any) {
      this.setState({
        response: <JsonResponse.ResponseData>{
          action: this.state.action,
          raw_response: response,
          route: this.requestUrlWithFullParams()
        }
      });
    }.bind(this)).error(function(e: any) {
      this.setState({
        response: <JsonResponse.ResponseData>{
          action: this.state.action,
          error: e,
          raw_response: e.value,
          route: this.requestUrlWithFullParams()
        }
      });
    }.bind(this)).finally(function() {
      // Store possibly-updated credentials for later use.
      CredentialsManager.storeFromClient(this.state.client);
    }.bind(this));
  };

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
            action: this.state.action,
            current_request_url: this.requestUrlWithFullParams(),
            onActionChange: this.onChangeActionState,
            onFormSubmit: this.onSubmitRequest,
            resource: this.state.resource,
            submit_disabled: !this.canSubmitRequest()
          }),
          r.div( { },
            PropertyEntry.create({
              class_suffix: "include",
              text: "Include Fields: ",
              properties: this.state.resource.properties,
              useProperty: property =>
                _.contains(this.state.params.include_fields, property),
              isPropertyChecked: this.onChangePropertyChecked("include_fields")
            }),
            PropertyEntry.create({
              class_suffix: "expand",
              text: "Expand Fields: ",
              properties: this.state.resource.properties,
              useProperty: property =>
                _.contains(this.state.params.expand_fields, property),
              isPropertyChecked: this.onChangePropertyChecked("expand_fields")
            }),
            ParameterEntry.create({
              text: "Attribute parameters: ",
              parameters: this.state.action.params,
              onParameterChange: this.onChangeParameterState
            })
          ),
          r.hr(),
          JsonResponse.create({
            response: this.state.response
          })
        ]
      });
    }
  }
}

module Explorer {
  export function emptyParams(): ParamData {
    return {
      expand_fields: [],
      include_fields: [],
      required_params: {},
      optional_params: {}
    };
  }

  export interface ParamData {
    expand_fields: string[];
    include_fields: string[];
    required_params: any;
    optional_params: any;
  }

  export interface Props {
    initialClient?: Asana.Client;
    initial_resource_string?: string;
    initial_route?: string;
  }

  export interface State {
    action?: Action;
    client?: Asana.Client;
    params?: ParamData;
    resource?: Resource;
    response?: JsonResponse.ResponseData;
  }
}

export = Explorer;
