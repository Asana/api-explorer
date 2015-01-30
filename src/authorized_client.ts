/// <reference path="./asana.d.ts" />
import Asana = require("asana");
import constants = require("./constants");

/**
 * Fetches credentials if the user has recently oauthed in.
 *
 * @TODO Implement this.
 * @returns {Asana.auth.Credentials|null}
 */
function fetchCredentialsOrNull(): Asana.auth.Credentials {
    console.warn("Fetching credentials is currently unsupported.");
    return null;
}

/**
 * Stores credentials from an authorized client for use in later sessions.
 *
 * @TODO Implement this.
 * @param {Asana.Client} client
 */
function storeCredentialsFromClient(client: Asana.Client): void {
    console.warn("Storing credentials is currently unsupported.");
}

/**
 * A client that seamlessly authorizes and allows use of parts of the API.
 * If credentials are available, then uses those; otherwise, uses popup oauth.
 */
class AuthorizedClient {
    private client: Asana.Client;

    constructor() {
        this.client = Asana.Client.create({
            clientId: constants.CLIENT_ID,
            redirectUri: constants.REDIRECT_URI
        });

        // Try to use credentials, if they are supplied. Otherwise, we use the popup flow.
        this.client.useOauth({
            credentials: fetchCredentialsOrNull(),
            flowType: Asana.auth.PopupFlow
        });
    }

    /**
     * Checks if the current client has non-expired credentials.
     *
     * @TODO: Implement this.
     * @returns {boolean}
     */
    public isAuthorized(): boolean {
        console.warn("Using stored credentials is currently unsupported.");
        return false;
    }

    /**
     * Authorizes the client to make request, and saves the credentials for a
     * later session.
     *
     * @returns {Promise<Client>}  A promise that resolves to this client when
     *     authorization is complete.
     */
    private ensureAuthorized(): Promise<Asana.Client> {
        return this.client.authorize().then(function(client) {
            storeCredentialsFromClient(client);
            return client;
        });
    }

    /**
     * Dispatches a GET request to the Asana API.
     *
     * @param {string} path  The path of the API
     * @param {any} query  The query params
     * @param {any} dispatchOptions  Options for handling the request and response.
     *     See Asana.Dispatcher for more info.
     * @returns {Promise<any>}  The response for the request.
     */
    public get(path: string, query?: any, dispatchOptions?: any): Promise<any> {
        return this.ensureAuthorized().then(function(client) {
            return client.dispatcher.get(path, query, dispatchOptions);
        });
    }
}
export = AuthorizedClient;
