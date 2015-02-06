/// <reference path="./asana.d.ts" />
import Asana = require("asana");

import constants = require("./constants");

// TODO: TEST!!!

// Allows us to mock out localStorage in tests.
export var localStorage: Storage =
    typeof window !== "undefined" ? window.localStorage : null;

/**
 * Returns true if the credentials have not expired.
 *
 * @param {Asana.auth.Credentials} credentials
 * @returns {boolean}
 */
function validate(credentials: Asana.auth.Credentials) {
    // TODO: Actually validate this.
    return credentials != null;
}

/**
 * Returns true if the client has valid credentials.
 *
 * @param {Asana.Client} client
 * @returns {boolean}
 */
export function validateFromClient(client: Asana.Client) {
    return validate(getFromClient(client));
}

/**
 * Fetches credentials from an asana client.
 *
 * @param {Asana.Client} client
 * @returns {Asana.auth.Credentials}
 */
function getFromClient(client: Asana.Client): Asana.auth.Credentials {
    // We know our authenticator is an oauth authenticator, so we typecast it as such.
    return (<Asana.auth.OauthAuthenticator>client.dispatcher.authenticator).credentials;
}

/**
 * Fetches credentials from localStorage, if the user has recently oauthed in.
 * If the credentials have expired or don't exist, then return null.
 *
 * @returns {Asana.auth.Credentials}
 */
export function getFromLocalStorage(): Asana.auth.Credentials {
    if (localStorage !== null) {
        var credentials: Asana.auth.Credentials = JSON.parse(
            localStorage.getItem(constants.LOCALSTORAGE_KEY)
        );

        return validate(credentials) ? credentials : null;
    } else {
        // If we don't have access to local storage, then we can't do anything.
        console.warn("No access to local storage.");
        return null;
    }
}

/**
 * Stores credentials from a client for use in later sessions.
 *
 * @param {Asana.Client} client
 */
export function storeFromClient(client: Asana.Client): void {
    if (localStorage !== null) {
        localStorage.setItem(
            constants.LOCALSTORAGE_KEY,
            JSON.stringify(getFromClient(client))
        );
    } else {
        console.log(localStorage);
        // If we don't have access to local storage, then we can't do anything.
        console.warn("No access to local storage.");
    }
}
