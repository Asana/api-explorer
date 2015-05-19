import react = require("react");

import Explorer = require("./components/explorer");

/**
 * Creates and renders the API Explorer component.
 */
export function run(initial_resource?: string, initial_route?: string): void {
  react.render(Explorer.create({
    initial_resource_string: initial_resource,
    initial_route: initial_route
  }), document.getElementById("tab-explorer"));
}
