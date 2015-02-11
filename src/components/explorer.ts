import React = require("react");
import TypedReact = require("typed-react");

import AuthorizedClient = require("../authorized_client");

// TODO: Add tests.

export interface ExplorerProps {
}

interface ExplorerState {
    authorized_client?: AuthorizedClient;

    // TODO: Remove this after proof-of-concept.
    name: string;
}

/**
 * The main API Explorer component.
 */
class Explorer extends TypedReact.Component<ExplorerProps, ExplorerState> {
    getInitialState() {
        return {
            authorized_client: new AuthorizedClient()
        };
    }

    authorize() {
        this.state.authorized_client.authorizeIfExpired().then(function() {
            if (this.isMounted()) {
                this.forceUpdate();
            }
        }.bind(this));
    }

    render() {
        if (!this.state.authorized_client.isAuthorized()) {
            return React.DOM.a({
                href: "#",
                onClick: this.authorize
            }, "Click to authorize!");
        } else {
            // Update the user's name.
            if (this.state.name !== undefined) {
                return React.DOM.h1(null, "Welcome, " + this.state.name);
            } else {
                this.state.authorized_client.get("/users/me").then(function(response: any) {
                    this.setState({
                        name: response.data.name
                    });
                }.bind(this));

                return React.DOM.h1(null, "Requesting information...");
            }
        }
    }
}

export var explorer = TypedReact.createClass(Explorer);
