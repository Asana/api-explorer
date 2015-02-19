/// <reference path="./asana.d.ts" />
import Asana = require("asana");

/**
 * Runs the receiver code to send the Oauth result to the requesting tab.
 * Note: This logic is handled entirely within the `Asana.auth` module.
 */
export function run(): void {
  Asana.auth.PopupFlow.runReceiver();
}
