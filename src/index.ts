/// <reference path="./asana.d.ts" />
import Asana = require("asana");
/// <reference path="jquery/jquery.d.ts" />
import $ = require("jquery");

// TODO: Add tests for this.

/**
 * TODO: WRITE DOCS
 * TODO: Convert to typescript
 * TODO: Isolate into multiple functions
 */
export function authorizeAndGetName(credentials?: any): void {
    var CLIENT_ID = "23824292948206";
    var REDIRECT_URI = "http://localhost:8338/popup_receiver.html";

    var client = Asana.Client.create({
        clientId: CLIENT_ID,
        redirectUri: REDIRECT_URI
    });

    // Try to use credentials, if they are supplied. Otherwise, we use the popup flow.
    // TODO: Make sure credentials are renewed after expiration.
    client.useOauth({
        credentials: credentials,
        flowType: Asana.auth.PopupFlow
    });

    // Try to authorize, and display the user's name.
    $("#ui").html("Authorizing...");
    client.authorize().then(function() {
        // The client is authorized! Make a simple request.
        $("#ui").html("Fetching...");
        return client.users.me().then(function(me) {
            $("#ui").html("Hello " + me.name + "!");
        });
    }).catch(function(err) {
        $("#ui").html("Error: " + err);
    });
}

/**
 * TODO: WRITE DOCS
 */
export function runReceiver(): void {
    Asana.auth.PopupFlow.runReceiver();
}
