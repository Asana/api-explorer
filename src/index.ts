/// <reference path="./asana.d.ts" />
import Asana = require("asana");
/// <reference path="jquery/jquery.d.ts" />
import $ = require("jquery");
import constants = require("./constants");

// TODO: Add tests for this.

/**
 * Gets a client and ensures it is authorized to make requests.
 * Tries to use given credentials; otherwise, uses the popup oauth flow.
 *
 * @param credentials  Credentials to pass to the client before authorization
 * @returns {Promise<Client>}  A promise that resolves to this client when
 *     authorization is complete.
 */
export function authorizedClient(credentials?: any): Promise<Asana.Client> {
    var client: Asana.Client = Asana.Client.create({
        clientId: constants.CLIENT_ID,
        redirectUri: constants.REDIRECT_URI
    });

    // Try to use credentials, if they are supplied. Otherwise, we use the popup flow.
    // TODO: Make sure credentials are renewed after expiration.
    client.useOauth({
        credentials: credentials,
        flowType: Asana.auth.PopupFlow
    });

    return client.authorize();
}

/**
 * Gets the user's name, and sets text in #ui to reflect it.
 * This is mainly an example, to show how the API and JQuery will interact.
 * TODO: Remove this after implementing other API tester functionality.
 *
 * @param credentials  Credentials to pass to the client before authorization
 */
export function getName(credentials?: any): void {
    // Try to authorize, and display the user's name.
    $("#ui").html("Authorizing...");
    authorizedClient().then(function(client) {
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
 * Runs the receiver code to send the Oauth result to the requesting tab.
 * Note: This logic is handled entirely within the `Asana.auth` module.
 */
export function runReceiver(): void {
    Asana.auth.PopupFlow.runReceiver();
}
