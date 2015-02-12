import build = require("./build");
import react = require("react");
import TypedReact = require("typed-react");

import AuthorizedClient = require("../authorized_client");
import JsonResponse = require("./json_response");

var r = react.DOM;

export interface Props {
    initial_authorized_client?: AuthorizedClient
}

export interface State {
    authorized_client?: AuthorizedClient;
    route?: string;
    response?: any;
}

/**
 * The main API Explorer component.
 */
export class Component extends TypedReact.Component<Props, State> {
    getInitialState() {
        // If a client exists in props, use it. Otherwise, make a new one.
        var authorized_client =
            this.props.initial_authorized_client || new AuthorizedClient();

        return {
            authorized_client: authorized_client,
            route: "/users/me"
        };
    }

    /**
     * Authorize the client, if it has expired, and force a re-rendering.
     */
    authorize() {
        this.state.authorized_client.authorizeIfExpired().then(function() {
            if (this.isMounted()) {
                this.forceUpdate();
            }
        }.bind(this));
    }

    /**
     * Send a get request to the API using the current state's route, and
     * update the state after receiving a response.
     */
    getAndUpdateState() {
        var route = this.state.route;

        this.state.authorized_client.get(route).then(function(response: any) {
            this.setState({
                response: response
            });
        }.bind(this));
    }

    render() {
        if (!this.state.authorized_client.isAuthorized()) {
            return r.a({
                className: "authorize-link",
                href: "#",
                onClick: this.authorize
            }, "Click to authorize!");
        } else {
            return r.div({
                className: "api-explorer",
                children: [
                    r.div(null, "Route:" + this.state.route),
                    r.a({
                        className: "send-request",
                        href: "#",
                        onClick: this.getAndUpdateState
                    }, "Send request!"),
                    JsonResponse.create({
                        response: this.state.response
                    })
                ]
            });
        }
    }
}

export var create = build(Component);
