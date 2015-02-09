/// <reference path="./asana.d.ts" />
import Asana = require("asana");

import constants = require("./constants");

// Note: We may want to move this system to the Asana client. We can create
// a general storage interface and use a localStorage implementation.
// This would provide the ability for auto-renewal in the client

// Allows us to mock out localStorage in tests.
export var localStorage: Storage =
    typeof window !== "undefined" ? window.localStorage : null;

/**
 * The time to subtract before we actually consider credentials expired.
 */
var EXPIRY_BUFFER_MS = 5 * 60 * 1000;

/**
 * Returns true if the credentials have not expired.
 *
 * @param {Asana.auth.Credentials} credentials
 * @returns {boolean}
 */
function isValid(credentials: Asana.auth.Credentials) {
    // If no credentials or expiry time, then mark as invalid.
    if (credentials == null || credentials.expiry_timestamp == null) {
        return false;
    }

    // We're valid when we have more than the buffer remaining before expiry.
    return credentials.expiry_timestamp - Date.now() > EXPIRY_BUFFER_MS;
}

/**
 * Returns true if the client has valid credentials.
 *
 * @param {Asana.Client} client
 * @returns {boolean}
 */
export function isValidFromClient(client: Asana.Client) {
    return isValid(getFromClient(client));
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
 * Fetches credentials from localStorage, if such credentials exist.
 * Note: This may return expired credentials, so we always must re-check
 * before using them.
 *
 * @returns {Asana.auth.Credentials}
 */
export function getFromLocalStorage(): Asana.auth.Credentials {
    if (localStorage !== null) {
        return JSON.parse(
            localStorage.getItem(constants.LOCALSTORAGE_KEY)
        );
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
        var credentials = getFromClient(client);

        if (credentials === null) {
            throw new Error("There are no credentials in the client.");
        }

        // Add expiry timestamp to credentials, for use when checking expiry.
        credentials.expiry_timestamp = Date.now() + credentials.expires_in * 1000;

        localStorage.setItem(
            constants.LOCALSTORAGE_KEY,
            JSON.stringify(credentials)
        );
    } else {
        // If we don't have access to local storage, then we can't do anything.
        console.warn("No access to local storage.");
    }
}
