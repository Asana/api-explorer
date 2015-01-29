/// <reference path="./asana.d.ts" />
import Asana = require("asana");

/**
 * Example function that uses the asana npm package (for testing gulp).
 * TODO: Delete once I start implementing the tester.
 *
 * @returns {Asana.Client}
 */
export function getAsanaClient(): typeof Asana.Client {
    return Asana.Client.create();
}

