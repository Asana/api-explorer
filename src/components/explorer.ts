/// <reference path="../asana.d.ts" />
/// <reference path="../resources/interfaces.ts" />
import Asana = require("asana");
import Promise = require("bluebird");
import React = require("react/addons");
import url = require("url");
import _ = require("lodash");

import constants = require("../constants");
import Credentials = require("../credentials");
import ExtraParameterEntry = require("./extra_parameter_entry");
import JsonResponse = require("./json_response");
import PaginateEntry = require("./paginate_entry");
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
    credentials: Credentials.getFromLocalStorage(),
    flowType: Asana.auth.PopupFlow
  });

  return client;
}

function _isWorkspaceParameter(parameter: Parameter): boolean {
  return parameter.name === "workspace" || parameter.name === "organization";
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

    var client = initializeClient(this.props.initialClient);

    this.state = {
      action: action,
      auth_state: Credentials.authStateFromClient(client),
      client: client,
      params: Explorer.emptyParams(),
      resource: resource,
      response: <JsonResponse.ResponseData>{
        action: undefined,
        route: undefined,
        route_url: undefined,
        raw_response: undefined
      }
    };

    // In order to prevent blocked popups, we override the unauthorized trigger.
    client.dispatcher.handleUnauthorized = (): Promise<any> => {
      this.state.auth_state = Credentials.AuthState.Expired;

      // This isn't an authorization, so return accordingly.
      return Promise.resolve(false);
    };

    // These tasks require authentication, which will update state on failure.
    if (this.state.auth_state === Credentials.AuthState.Authorized) {
      this.fetchAndStoreWorkspaces();
    }
  }

  _canPaginate = (): boolean => {
    // TODO: Also can't paginate on users over personal projects domain.

    return this.state.action.collection &&
      !this.state.action.collection_cannot_paginate;
  };

  /**
   * Authorize the client, if it has expired, and force a re-rendering.
   */
  authorize = (): void => {
    this.state.client.authorize().then(client => {
      Credentials.storeFromClient(client);
      this.state.auth_state = Credentials.authStateFromClient(client);

      // After authorization, perform tasks that require authentication.
      this.fetchAndStoreWorkspaces();

      this.forceUpdate();
    });
  };

  /**
   * Fetches the user's workspaces via the API and stores response in state.
   */
  fetchAndStoreWorkspaces() {
    this.state.client.workspaces.findAll().then(workspaces => {
      this.setState({
        workspace: workspaces.data[0],
        workspaces: workspaces.data
      });
    });
  }

  /**
   * Uses the state to return the properly-formatted request parameters.
   */
  requestParameters = () => {
    var params: any = { };

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

    if (this._canPaginate()) {
      params = _.extend(params, this.state.params.paginate_params);
    }

    // The first required parameter is injected into the URL.
    // Other required parameters are included here, so we extract them out.
    var required_params = _.filter(this.state.action.params, "required");
    if (required_params.length > 1) {
      _.forEach(
        this.state.params.required_params,
        (value: string, key: string) => {
          if (required_params[0].name !== key) {
            params[key] = value;
          }
        });
    }

    // If an optional param is for workspace, then inject the chosen workspace.
    var has_optional_workspace_param = _.any(this.state.action.params,
        param => !param.required && _isWorkspaceParameter(param));
    if (has_optional_workspace_param && this.state.workspace !== undefined) {
      params = _.extend(params, { workspace: this.state.workspace.id });
    }

    // The user should be able to override any above, so add extra params last.
    params = _.extend(params, this.state.params.extra_params);

    return params;
  };

  /**
   * Uses the state to return the URL for the current request.
   * Puts the first required parameter (if any) in the URL.
   *
   * @returns {string}
   */
  requestUrl = (): string => {
    var param_value: number;

    var required_param = _.find(this.state.action.params, "required");
    if (required_param !== undefined) {
      param_value = this.state.params.required_params[required_param.name];

      // If we don't have the param_value, and check if it's a workspace.
      if (param_value === undefined && _isWorkspaceParameter(required_param)) {
        // Since we lazy-load workspaces, make sure it has been loaded.
        if (this.state.workspace !== undefined) {
          param_value = this.state.workspace.id;
        }
      }
    }

    return ResourcesHelpers.pathForAction(this.state.action, param_value);
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
    var params = !has_changed ? this.state.params : this._resetParams();

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
    var params = !has_changed ? this.state.params : this._resetParams();

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
   * Updates the paginate state following an onChange event.
   */
  onChangePaginateState = (limit_or_offset: string) => {
    return (event: React.FormEvent) => {
      var target = <HTMLInputElement>event.target;

      // If this won't validate (e.g. negative limit value), don't set state.
      if (!target.checkValidity()) {
        return false;
      }

      // If the user removes the value, we want to disable that parameter.
      if (target.value === "") {
        this.setState(update(this.state, <any> {
          params: {
            paginate_params: {
              $set: _.omit(this.state.params.paginate_params, limit_or_offset)
            }
          }
        }));
      } else {
        this.setState(update(this.state, <any>{
          params: {
            paginate_params:
              _.object([limit_or_offset], [{ $set: target.value }])
          }
        }));
      }
    };
  };

  /**
   * Returns a function to handle the onChange event for a given parameter.
   * @param parameter
   * @returns {function(React.FormEvent): void}
   */
  onChangeParameterState = (parameter: Parameter) => {
    return (event: React.FormEvent) => {
      var target = <HTMLInputElement>event.target;

      if (_isWorkspaceParameter(parameter)) {
        var workspace = _.find(this.state.workspaces,
            workspace => workspace.id.toString() === target.value);

        this.setState({
          workspace: workspace
        });
      } else {
        var param_type = parameter.required ?
          "required_params" : "optional_params";

        // Update or remove the parameter accordingly.
        this.setState(update(this.state, <any>{
          params: _.object([param_type], [{
            $set: target.value === "" ?
              _.omit((<any>this.state.params)[param_type], parameter.name) :
              _.extend(
                (<any>this.state.params)[param_type],
                _.object([parameter.name], [target.value]))
          }])
        }));
      }
    };
  };

  /**
   * Given a list of extra parameters, put them in the state.
   */
  syncExtraParameters = (parameters: ExtraParameterEntry.ExtraParameter[]) => {
    // Reduce from list of extra params to key-value object to store in state.
    var extra_params = _.reduce(
      parameters,
      (result: any, parameter: ExtraParameterEntry.ExtraParameter) => {
        if (parameter.key !== "" && parameter.value !== "") {
          result[parameter.key] = parameter.value;
        }
        return result;
      },
      { }
    );

    this.setState(update(this.state, <any>{
      params: {
        extra_params: {
          $set: extra_params
        }
      }
    }));
  };

  /**
   * Determines the user state status for a submit request. Based on this,
   * we determine whether the user can submit a request.
   */
  userStateStatus = (): Explorer.UserStateStatus => {
    // Ensure the user is authenticated.
    if (this.state.auth_state !== Credentials.AuthState.Authorized) {
      return Explorer.UserStateStatus.ErrorNotAuthorized;
    }

    // Currently, we only submit GET requests. This may be revisited later.
    if (this.state.action.method !== "GET") {
      return Explorer.UserStateStatus.ErrorUnsupportedMethodType;
    }

    // Ensure we've successfully loaded the workspaces.
    if (this.state.workspaces === undefined) {
      return Explorer.UserStateStatus.ErrorAwaitingWorkspaces;
    }

    // Ensure all required parameters are set.
    var required_params = _.filter(this.state.action.params, "required");
    if (required_params.length !== _.size(this.state.params.required_params)) {
      // If the only missing required param is workspace, we're okay.
      var num_missing =
        required_params.length - _.size(this.state.params.required_params);
      if (!_.any(required_params, _isWorkspaceParameter) || num_missing !== 1) {
        return Explorer.UserStateStatus.ErrorUnsetRequiredParams;
      }
    }

    // At this point, we've passed all constraints.
    return Explorer.UserStateStatus.Okay;
  };

  private _canSubmitRequest = (): boolean => {
    return this.userStateStatus() === Explorer.UserStateStatus.Okay;
  };

  /**
   * Send a get request to the API using the current state's route, and
   * update the state after receiving a response.
   */
  onSubmitRequest = (event: React.FormEvent): void => {
    event.preventDefault();

    // Sanity check: we should never reach this state, but this is safer.
    if (!this._canSubmitRequest()) {
      throw new Error("We cannot submit this request.");
    }

    var dispatcher = this.state.client.dispatcher;
    var route = this.requestUrl();
    var route_full = this.requestUrlWithFullParams();
    var route_full_url = dispatcher.url(route_full);
    var params = this.requestParameters();

    // Set intermediate state to signify loading.
    this.setState({
      response: <JsonResponse.ResponseData>{
        action: this.state.action,
        is_loading: true,
        route: route_full,
        route_url: route_full_url
      }
    });

    // Dispatch request and update after response is received.
    dispatcher.get(route, params, null).then((response: any) => {
      this.setState({
        response: <JsonResponse.ResponseData>{
          action: this.state.action,
          raw_response: response,
          route: route_full,
          route_url: route_full_url
        }
      });
    }).error((e: any) => {
      this.setState({
        response: <JsonResponse.ResponseData>{
          action: this.state.action,
          error: e,
          raw_response: e.value,
          route: route_full,
          route_url: route_full_url
        }
      });
    }).finally(() => {
      // Store possibly-updated credentials for later use.
      Credentials.storeFromClient(this.state.client);
    });
  };

  private _resetParams(): Explorer.ParamData {
    var params = Explorer.emptyParams();

    // Don't reset extra parameters, since those aren't route dependent.
    params.extra_params = this.state.params.extra_params;

    return params;
  }

  private _maybeRenderAuthorizationLink() {
    var message = "";
    switch (this.state.auth_state) {
      case Credentials.AuthState.Authorized:
        return null;
      case Credentials.AuthState.Unauthorized:
        message = "Click to authorize!";
        break;
      case Credentials.AuthState.Expired:
        message = "Your authorization token has expired. Click here to refresh it!";
        break;
    }

    return r.div({ },
      r.a({
        className: "authorize-link",
        href: "#",
        onClick: this.authorize
      }, message)
    );
  }

  private _maybeRenderErrorMessage() {
    var message = "";
    switch (this.userStateStatus()) {
      case Explorer.UserStateStatus.Okay:
        return null;
      case Explorer.UserStateStatus.ErrorNotAuthorized:
        message = "You are not authorized to make a request.";
        break;
      case Explorer.UserStateStatus.ErrorUnsupportedMethodType:
        message = "Only GET requests can be submitted in the API Explorer.";
        break;
      case Explorer.UserStateStatus.ErrorAwaitingWorkspaces:
        message = "Workspaces are currently loading.";
        break;
      case Explorer.UserStateStatus.ErrorUnsetRequiredParams:
        message = "You must set all required parameters.";
        break;
    }

    return r.div({
      className: "error-msg"
    }, message);
  }

  private _renderRequestEntryForm() {
    return r.form({
      className: "request-entry-form",
      onSubmit: this.onSubmitRequest,
      children: [
        r.div({ },
          ResourceEntry.create({
            resource: this.state.resource,
            onResourceChange: this.onChangeResourceState
          }),
          RouteEntry.create({
            action: this.state.action,
            current_request_url: this.requestUrlWithFullParams(),
            onActionChange: this.onChangeActionState,
            resource: this.state.resource
          })
        ),
        r.div({ },
          this.state.action.method !== "GET" ? "" :
            // Show the user include/expand properties for GET requests only.
            r.span({ },
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
              })
            ),
          PaginateEntry.create({
            can_paginate: this._canPaginate(),
            onPaginateChange: this.onChangePaginateState,
            paginate_params: this.state.params.paginate_params,
            text: "Paginate parameters: "
          }),
          ParameterEntry.create({
            text: "Attribute parameters: ",
            parameters: this.state.action.params,
            onParameterChange: this.onChangeParameterState,
            workspace: this.state.workspace,
            workspaces: this.state.workspaces
          }),
          ExtraParameterEntry.create({
            text: "Extra parameters: ",
            syncExtraParameters: this.syncExtraParameters
          })
        ),
        r.div({ },
          this._maybeRenderErrorMessage(),
          r.button({
            className: "submit-request",
            disabled: !this._canSubmitRequest(),
            type: "submit"
          }, "Submit!")
        )
      ]
    });
  }

  render() {
    return r.div({
      className: "api-explorer",
      children: [
        this._maybeRenderAuthorizationLink(),
        this._renderRequestEntryForm(),
        r.hr(),
        JsonResponse.create({
          response: this.state.response
        })
      ]
    });
  }
}

module Explorer {
  export function emptyParams(): ParamData {
    return {
      expand_fields: [],
      include_fields: [],
      required_params: {},
      optional_params: {},
      extra_params: {},
      paginate_params: {
        limit: constants.INITIAL_PAGINATION_LIMIT
      }
    };
  }

  export interface ParamData {
    expand_fields: string[];
    include_fields: string[];
    required_params: any;
    optional_params: any;
    extra_params: any;
    paginate_params: {
      limit?: number;
      offset?: string;
    };
  }

  export interface Props {
    initialClient?: Asana.Client;
    initial_resource_string?: string;
    initial_route?: string;
  }

  /**
   * Possible states that the user can be in, given the current state/params.
   */
  export enum UserStateStatus {
    Okay,
    ErrorNotAuthorized,
    ErrorUnsupportedMethodType,
    ErrorAwaitingWorkspaces,
    ErrorUnsetRequiredParams
  }

  export interface State {
    action?: Action;
    auth_state?: Credentials.AuthState;
    client?: Asana.Client;
    params?: ParamData;
    resource?: Resource;
    response?: JsonResponse.ResponseData;
    workspace?: Asana.resources.Workspace;
    workspaces?: Asana.resources.Workspace[];
  }
}

export = Explorer;
