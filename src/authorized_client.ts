/// <reference path="./asana.d.ts" />
import Asana = require("asana");
import constants = require("./constants");
import CredentialsManager = require("./credentials_manager");
import Promise = require("bluebird");

var FLOW_TYPE = Asana.auth.PopupFlow;

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

        // Initially set up (possibly expired) credentials. We'll re-authorize if they are indeed expired.
        this.client.useOauth({
            credentials: CredentialsManager.getFromLocalStorage(),
            flowType: FLOW_TYPE
        });
    }

    /**
     * Checks if the current client has non-expired credentials.
     *
     * @returns {boolean}
     */
    public isAuthorized(): boolean {
        return CredentialsManager.validateFromClient(this.client);
    }

    /**
     * Authorizes the client to make request, and saves the credentials for a
     * later session.
     *
     * @returns {Promise<Client>}  A promise that resolves to this client when
     *     authorization is complete.
     */
     public authorizeIfExpired(): Promise<Asana.Client> {
        if (!this.isAuthorized()) {
            // Set up Oauth flow without credentials, so we re-authorize.
            this.client.useOauth({
                flowType: FLOW_TYPE
            });

            return this.client.authorize().then(function (client) {
                CredentialsManager.storeFromClient(client);

                return client;
            });
        } else {
            return Promise.resolve(this.client);
        }
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
        // TODO: Handle error cases.
        return this.authorizeIfExpired().then(function(client) {
            return client.dispatcher.get(path, query, dispatchOptions);
        });
    }
}
export = AuthorizedClient;
