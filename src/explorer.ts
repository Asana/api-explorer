import react = require("react");

import Explorer = require("./components/explorer");

/**
 * Creates and renders the API Explorer component.
 */
export function run(): void {
    react.render(Explorer.create(), document.getElementById("container"));
}
