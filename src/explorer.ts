import react = require("react");

import Explorer = require("./components/explorer");

/**
 * Creates and renders the API Explorer component.
 */
export function run(initial_resource?: string, initialRoute?: string): void {
  react.render(Explorer.create({
    initialResourceString: initial_resource,
    initialRoute: initialRoute
  }), document.getElementById("tab-explorer"));
}
