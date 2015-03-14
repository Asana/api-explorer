/// <reference path="./asana.d.ts" />
import Asana = require("asana");

import constants = require("./constants");

// Allows us to mock out localStorage in tests.
export var localStorage: Storage = window.localStorage;

export enum AuthState {
  Unauthorized,
  Expired,
  Authorized
}

/*
 * The time to subtract before we actually consider credentials expired.
 */
var EXPIRY_BUFFER_MS = 5 * 60 * 1000;

/**
 * Returns the authorization state based on credentials in the client.
 *
 * @param {Asana.Client} client
 * @returns {AuthState}
 */
export function authStateFromClient(client: Asana.Client): AuthState {
  var credentials = getFromClient(client);

  // If no credentials, then mark as unauthorized.
  if (credentials === null) {
    return AuthState.Unauthorized;
  }

  // If the credentials have expired, then mark as expired.
  var expiry_timestamp = credentials.expiry_timestamp;
  if (!expiry_timestamp || expiry_timestamp - Date.now() < EXPIRY_BUFFER_MS) {
    return AuthState.Expired;
  }

  return AuthState.Authorized;
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
  if (localStorage !== undefined) {
    return JSON.parse(
      localStorage.getItem(constants.LOCALSTORAGE_KEY)
    );
  }
}

/**
 * Stores credentials from a client for use in later sessions.
 *
 * @param {Asana.Client} client
 */
export function storeFromClient(client: Asana.Client): void {
  if (localStorage !== undefined) {
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
  }
}
