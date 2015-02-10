import React = require("react");
import TypedReact = require("typed-react");

export interface ExplorerProps {
}

interface ExplorerState {
}

/**
 * The main API Explorer component.
 */
class Explorer extends TypedReact.Component<ExplorerProps, ExplorerState> {
    render() {
        return React.DOM.h1(null, "Hello, world!");
    }
}

export var explorer = TypedReact.createClass(Explorer);
