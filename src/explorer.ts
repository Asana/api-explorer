import React = require("react");

import ExplorerComponent = require("./components/explorer");

/**
 * Creates and renders the API Explorer component.
 */
export function run(): void {
    var explorer = React.createElement(ExplorerComponent.explorer, {});

    React.render(explorer, document.getElementById("container"));
}
