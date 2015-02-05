/// <reference path="./asana.d.ts" />
import Asana = require("asana");
import constants = require("./constants");
import credentials = require("./credentials");

/**
 * A client that seamlessly authorizes and allows use of parts of the API.
 * If credentials are available, then uses those; otherwise, uses popup oauth.
 */
class AuthorizedClient {
    private client: Asana.Client;

    constructor(client?: Asana.Client) {
        this.client = client || Asana.Client.create({
            clientId: constants.CLIENT_ID,
            redirectUri: constants.REDIRECT_URI
        });

        // Try to use credentials, if they are supplied. Otherwise, we use the popup flow.
        this.client.useOauth({
            credentials: credentials.getFromLocalStorage(),
            flowType: Asana.auth.PopupFlow
        });
    }

    /**
     * Checks if the current client has non-expired credentials.
     *
     * @returns {boolean}
     */
    public isAuthorized(): boolean {
        return credentials.validateFromClient(this.client);
    }

    /**
     * Authorizes the client to make request, and saves the credentials for a
     * later session.
     *
     * @returns {Promise<Client>}  A promise that resolves to this client when
     *     authorization is complete.
     */
     public authorize(): Promise<Asana.Client> {
        return this.client.authorize().then(function(client) {
            credentials.storeFromClient(client);

            return client;
        });
    }

    /**
     * Dispatches a GET request to the Asana API, from an already-authorized client.
     *
     * @param {string} path  The path of the API
     * @param {any} query  The query params
     * @param {any} dispatchOptions  Options for handling the request and response.
     *     See Asana.Dispatcher for more info.
     * @returns {Promise<any>}  The response for the request.
     */
    public get(path: string, query?: any, dispatchOptions?: any): Promise<any> {
        if (!this.isAuthorized()) {
            throw new Error("Client is not authorized to perform a request.");
        }

        // TODO: Handle error cases.
        return this.client.dispatcher.get(path, query, dispatchOptions);
    }
}
export = AuthorizedClient;
