/// <reference path="../resources/interfaces.ts" />
import React = require("react");

var r = React.DOM;

/**
 * The JSON response code block.
 */
class JsonResponse extends React.Component<JsonResponse.Props, {}> {
  static create = React.createFactory(JsonResponse);

  private _renderResponseHeaderInfo = () => {
    if (this.props.response === undefined) {
      return null;
    }

    var action: Action = this.props.response.action;
    return r.div({
      className: "json-response-info"
    }, action.method + " " + action.path);
  };

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

module JsonResponse {
  export interface Props {
    response: any;
  }
}

export = JsonResponse;
