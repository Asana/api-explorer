/// <reference path="../asana.d.ts" />
/// <reference path="../resources/interfaces.ts" />
import Asana = require("asana");
import React = require("react");

import constants = require("../constants");
import CredentialsManager = require("../credentials_manager");
import JsonResponse = require("./json_response");
import ResourceEntry = require("./resource_entry");
import Resources = require("../resources/resources");
import RouteEntry = require("./route_entry");

import ResourcesHelpers = require("../resources/helpers");

var r = React.DOM;

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
      client: this.initializeClient(),
      resource: resource,
      action: action
    };
  }

  /**
   * If a client exists in props, use it. Otherwise, make a new one.
   * Fetch OAuth information from localStorage, and put in the client.
   *
   * @returns {Asana.Client}
   */
  initializeClient = (): Asana.Client => {
    var client = this.props.initialClient || Asana.Client.create({
        clientId: constants.CLIENT_ID,
        redirectUri: constants.REDIRECT_URI
      });
    client.useOauth({
      credentials: CredentialsManager.getFromLocalStorage(),
      flowType: Asana.auth.PopupFlow
    });

    return client;
  };

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
   * Updates the resource state following an onChange event.
   */
  onChangeResourceState = (event: React.FormEvent): void => {
    var resource = ResourcesHelpers.resourceFromResourceName(
      (<HTMLSelectElement>event.target).value);

    // If the resource has changed, also update the action.
    var action = (resource !== this.state.resource) ?
      resource.actions[0] : this.state.action;

    this.setState({
      resource: resource,
      action: action
    });
  };

  /**
   * Updates the action state following an onChange event.
   */
  onChangeActionState = (event: React.FormEvent): void => {
    var action_name = (<HTMLSelectElement>event.target).value;
    this.setState({
      action: ResourcesHelpers.actionFromName(this.state.resource, action_name)
    });
  };

  /**
   * Send a get request to the API using the current state's route, and
   * update the state after receiving a response.
   */
  onSubmitRequest = (event: React.FormEvent): void => {
    event.preventDefault();

    var route = this.state.action.path;
    var dispatcher = this.state.client.dispatcher;

    dispatcher.get(route, null, null).then(function(response: any) {
      // Add the corresponding action to the response for later use.
      response.action = this.state.action;

      this.setState({
        response: response
      });

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

module Explorer {
  export interface Props {
    initialClient?: Asana.Client;
    initial_resource_string?: string;
    initial_route?: string;
  }

  export interface State {
    client?: Asana.Client;
    resource?: Resource;
    action?: Action;
    response?: any;
  }
}

export = Explorer;
