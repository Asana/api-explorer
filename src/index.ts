import React = require("react");

import AuthorizedClient = require("./authorized_client");
export import Receiver = require("./receiver");
export import Explorer = require("./components/explorer");

export function initPage(): void {
    var explorer = React.createElement(Explorer.explorer, {});

    React.render(explorer, document.getElementById("container"));
}
/**
 * Gets the user's name, and sets text in #ui to reflect it.
 * This is mainly an example, to show how the API and JQuery will interact.
 * TODO: Remove this after implementing other API tester functionality.
 */
export function getName(): void {
    var client: AuthorizedClient = new AuthorizedClient();

    // Try to authorize, and display the user's name.
    document.getElementById("ui").innerHTML = "Authorizing...";

    // Note: For now, we'll authorize and immediately query the API.
    //       Later, we'll separate those behaviors.
    client.get("/users/me").then(function(response) {
        document.getElementById("ui").innerHTML = "Hello " + response.data.name + "!";
    }).catch(function(err) {
        document.getElementById("ui").innerHTML = "Error: " + err;
    });
}
