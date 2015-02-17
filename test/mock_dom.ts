/* tslint:disable:no-unused-variable */
import jsdom = require("jsdom");

declare var document: Document;
declare var window: Window;
declare var navigator: Navigator;

/**
 * We need to set up globals to emulate running on the browser.
 * This is a bit hacky, but was inspired by React's Jest framework.
 *
 * Note: This file must be required at the top of the file (before react).
 */
(function () {
  document = jsdom.jsdom("<body></body>");
  window = document.parentWindow;
  navigator = window.navigator;
})();
