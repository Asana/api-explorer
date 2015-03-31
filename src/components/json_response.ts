/// <reference path="../resources/interfaces.ts" />
import React = require("react/addons");

// TODO: Remove deprecated classSet.
var cx = React.addons.classSet;
var r = React.DOM;

/**
 * The JSON response code block.
 */
class JsonResponse extends React.Component<JsonResponse.Props, {}> {
  static create = React.createFactory(JsonResponse);

  private _renderResponseHeaderInfo = () => {
    var action = this.props.response.action;

    return action === undefined ? null :
      r.div({
        className: "json-response-info"
      }, action.method + " " + this.props.response.route);
  };

  render() {
    var raw_response = this.props.response.raw_response;

    var json_string = raw_response === undefined ? null :
      JSON.stringify(raw_response, undefined, 2);

    return r.div({ },
      this._renderResponseHeaderInfo(),
      r.pre({
        className: cx({
            "json-response-block": true,
            "json-error": this.props.response.error !== undefined,
            "json-loading": this.props.response.is_loading
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

module JsonResponse {
  /**
   * Stores information about the response of a request.
   * This is set after the user submits a query.
   */
  export interface ResponseData {
    action: Action;
    error?: any;
    is_loading?: boolean;
    raw_response: any;
    route: string;
  }

  export interface Props {
    response: ResponseData;
  }
}

export = JsonResponse;
