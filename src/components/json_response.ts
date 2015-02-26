/// <reference path="../asana_json.d.ts" />
import AsanaJson = require("asana-json");
import build = require("./build");
import react = require("react/addons");
import TypedReact = require("typed-react");

var cx = react.addons.classSet;
var r = react.DOM;

/**
 * Stores information about the response of a request.
 * This is set after the user submits a query.
 */
export interface ResponseData {
  action: AsanaJson.Action;
  error?: any;
  raw_response: any;
  route: string;
}

export interface Props {
  response: ResponseData;
}

/**
 * The JSON response code block.
 */
export class Component extends TypedReact.Component<Props, {}> {
  private _renderResponseHeaderInfo() {
    var action = this.props.response.action;

    return action === undefined ? null :
      r.div({
        className: "json-response-info"
      }, action.method + " " + this.props.response.route);
  }

  render() {
    var raw_response = this.props.response.raw_response;

    var json_string = raw_response === undefined ? null :
      JSON.stringify(raw_response, undefined, 2);

    return r.div({ },
      this._renderResponseHeaderInfo(),
      r.pre({
        className: cx({
            "json-response-block": true,
            "json-error": this.props.response.error !== undefined
          }),
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
