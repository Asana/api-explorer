import build = require("./build");
import react = require("react");
import TypedReact = require("typed-react");

var r = react.DOM;

export interface Props {
    route: string;
    onFormSubmit: (event?: React.FormEvent) => void;
    onRouteChange: (event?: React.FormEvent) => void;
}

/**
 * The JSON response code block.
 */
export class Component extends TypedReact.Component<Props, {}> {
    render() {
        return r.form({
            className: "route-entry",
            onSubmit: this.props.onFormSubmit,
            children: [
                r.input({
                    className: "input-route",
                    onChange: this.props.onRouteChange,
                    value: this.props.route
                }),
                r.button({
                    className: "submit-request"
                }, "Submit!")
            ]
        });
    }
}

export var create = build(Component);
