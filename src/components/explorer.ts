/// <reference path="../asana_json.d.ts" />
import AsanaJson = require("asana-json");
import build = require("./build");
import react = require("react");
import TypedReact = require("typed-react");

import AuthorizedClient = require("../authorized_client");
import JsonResponse = require("./json_response");
import ResourceEntry = require("./resource_entry");
import RouteEntry = require("./route_entry");

import Resources = require("../resources");

var r = react.DOM;

export interface Props {
  initialAuthorizedClient?: AuthorizedClient;
  initial_resource_string?: string;
  initial_route?: string;
}

export interface State {
  authorizedClient?: AuthorizedClient;
  resource?: AsanaJson.Resource;
  action?: AsanaJson.Action;
  response?: any;
}

/**
 * The main API Explorer component.
 */
export class Component extends TypedReact.Component<Props, State> {
  getInitialState() {
    // If a client exists in props, use it. Otherwise, make a new one.
    var authorizedClient =
      this.props.initialAuthorizedClient || new AuthorizedClient();

    // Fetch the resource JSON given in the props, if any.
    var resource =
      Resources.resourceFromResourceName(this.props.initial_resource_string) ||
      Resources.resourceFromResourceName("Users");

    // If the initial route is valid, use it. Otherwise, use a valid one.
    var action =
      Resources.actionFromResourcePath(resource, this.props.initial_route) ||
      resource.actions[0];

    return {
      authorizedClient: authorizedClient,
      resource: resource,
      action: action
    };
  }

  /**
   * Authorize the client, if it has expired, and force a re-rendering.
   */
  authorize() {
    this.state.authorizedClient.authorizeIfExpired().then(function() {
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

    var route = this.state.action.path;

    this.state.authorizedClient.get(route).then(function(response: any) {
      this.setState({
        response: response
      });
    }.bind(this));
  }

  render() {
    if (!this.state.authorizedClient.isAuthorized()) {
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
