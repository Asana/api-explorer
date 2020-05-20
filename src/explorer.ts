import ReactDOM = require("react-dom");

import Explorer = require("./components/explorer");

/**
 * Creates and renders the API Explorer component.
 */
export function run(initialResource?: string, initialRoute?: string): void {
  ReactDOM.render(Explorer.create({
    initialResourceString: initialResource,
    initialRoute: initialRoute
  }), document.getElementById("tab-explorer"));
}
