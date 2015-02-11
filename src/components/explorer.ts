import React = require("react");
import TypedReact = require("typed-react");

import AuthorizedClient = require("../authorized_client");
import JsonResponse = require("./json_response");

var r = React.DOM;

// TODO: Add tests.

interface ExplorerState {
    authorized_client?: AuthorizedClient;
    route?: string;
    response?: any;
}

/**
 * The main API Explorer component.
 */
class Explorer extends TypedReact.Component<{}, ExplorerState> {
    getInitialState() {
        return {
            authorized_client: new AuthorizedClient(),
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
                href: "#",
                onClick: this.authorize
            }, "Click to authorize!");
        } else {
            return r.div({
                children: [
                    r.div(null, "Route:" + this.state.route),
                    r.a({
                        href: "#",
                        onClick: this.getAndUpdateState
                    }, "Send request!"),
                    React.createElement(JsonResponse.jsonResponse, {
                        response: this.state.response
                    })
                ]
            });
        }
    }
}

export var explorer = TypedReact.createClass(Explorer);
