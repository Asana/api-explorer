/// <reference path="../src/asana.d.ts" />
/// <reference path="../src/resources/interfaces.ts" />
import Asana = require("asana");
import Resources = require("../src/resources/resources");

var noop = () => { return; };

/**
 * Creates credentials with a given expiry timestamp.
 *
 * @param expiry_ts
 * @returns {Asana.auth.Credentials}
 */
export function createCredentials(expiry_ts: number): Asana.auth.Credentials {
  return {
    access_token: "token",
    expires_in: 3600,
    expiry_timestamp: expiry_ts
  };
}

/**
 * Creates an asana oauth client, with given credentials.
 *
 * @param {Asana.auth.Credentials} creds
 * @returns {Client}
 */
export function createOauthClient(credentials?: Asana.auth.Credentials): Asana.Client {
  return Asana.Client.create({
    clientId: "client_id",
    redirectUri: "redirect_uri"
  }).useOauth({ credentials: credentials });
}

/**
 * Returns the resource at a given index.
 * Note that assumes key ordering will persist within tests.
 *
 * @param {number} idx
 * @returns {Resource}
 */
export function fetchResource(idx: number): Resource {
  var keys = Object.keys(Resources);

  // Return the resource at the index idx, unless it doesn't exist.
  return (idx < keys.length) ? (<any>Resources)[keys[idx]] : null;
}

/**
 * Creates an interface that has required attributes for Storage.
 * This is useful when mocking localStorage.
 *
 * @returns {Storage}
 */
export function createFakeStorage(): Storage {
  return <Storage>{
    getItem: noop,
    setItem: noop,
    removeItem: noop,
    clear: noop,
    length: null,
    key: null,
    remainingSpace: null
  };
}
