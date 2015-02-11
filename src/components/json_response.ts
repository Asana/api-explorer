import React = require("react");
import TypedReact = require("typed-react");

var r = React.DOM;

// TODO: Add tests.

export interface JsonResponseProps {
    response: any;
}

/**
 * The JSON response code block.
 */
class JsonResponse extends TypedReact.Component<JsonResponseProps, {}> {
    render() {
        var json_string = this.props.response === undefined ? null :
            JSON.stringify(this.props.response.data, undefined, 2);

        return r.pre({
            children: [
                r.code({
                    className: "json"
                }, json_string)
            ]
        });
    }
}

export var jsonResponse = TypedReact.createClass(JsonResponse);
