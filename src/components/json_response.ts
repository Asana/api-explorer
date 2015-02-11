import build = require("./build");
import react = require("react");
import TypedReact = require("typed-react");

var r = react.DOM;

// TODO: Add tests.

export interface Props {
    response: any;
}

/**
 * The JSON response code block.
 */
export class Component extends TypedReact.Component<Props, {}> {
    render() {
        var json_string = this.props.response === undefined ? null :
            JSON.stringify(this.props.response.data, undefined, 2);

        return r.pre({
            className: "json-response-block",
            children: [
                r.code({
                    className: "json"
                }, json_string)
            ]
        });
    }
}

export var create = build(Component);
