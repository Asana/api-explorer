/// <reference path="../resources/interfaces.ts" />
import build = require("./build");
import react = require("react");
import TypedReact = require("typed-react");

var r = react.DOM;

export interface Props {
  response: any;
}

/**
 * The JSON response code block.
 */
export class Component extends TypedReact.Component<Props, {}> {
  private _renderResponseHeaderInfo() {
    if (this.props.response === undefined) {
      return null;
    }

    var action: Action = this.props.response.action;
    return r.div({
      className: "json-response-info"
    }, action.method + " " + action.path);
  }

  render() {
    var json_string = this.props.response === undefined ? null :
      JSON.stringify(this.props.response.data, undefined, 2);

    return r.div({ },
      this._renderResponseHeaderInfo(),
      r.pre({
        className: "json-response-block",
        children: [
          r.code({
            className: "json"
          }, json_string)
        ]
      })
    );
  }
}

export var create = build(Component);
