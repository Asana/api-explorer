/// <reference path="./asana.d.ts" />
import Asana = require("asana");
import constants = require("./constants");

/**
 * Fetches credentials if the user has recently oauthed in.
 *
 * @TODO #StoredCredentials: Implement fetching credentials.
 * @returns {Asana.auth.Credentials|null}
 */
function fetchCredentialsOrNull(): Asana.auth.Credentials {
    console.warn("Fetching credentials is currently unsupported.");
    return null;
}

/**
 * Stores credentials from an authorized client for use in later sessions.
 *
 * @TODO #StoredCredentials: Implement storing credentials.
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

    constructor(client?: Asana.Client) {
        this.client = client || Asana.Client.create({
            clientId: constants.CLIENT_ID,
            redirectUri: constants.REDIRECT_URI
        });

        // Try to use credentials, if they are supplied. Otherwise, we use the popup flow.
        this.client.useOauth({
            credentials: fetchCredentialsOrNull(),
            flowType: Asana.auth.PopupFlow
        });
    }

    private credentials(): Asana.auth.Credentials {
        // We know our authenticator is an oauth authenticator, so we typecast it as such.
        return (<Asana.auth.OauthAuthenticator>this.client.dispatcher.authenticator).credentials;
    }

    /**
     * Checks if the current client has non-expired credentials.
     *
     * @TODO #StoredCredentials: Implement this after we can store credentials.
     * @returns {boolean}
     */
    public isAuthorized(): boolean {
        // Note: Currently assumes any credentials are valid. Fix after #StoredCredentials.
        console.warn("Using stored credentials is currently unsupported.");

        return this.credentials() != null;
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
            storeCredentialsFromClient(client);

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
