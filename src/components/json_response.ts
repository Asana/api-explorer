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

  private renderResponseHeaderInfo = () => {
    var action = this.props.response.action;

    return action === undefined ? null :
      r.p({
        className: "json-response-info",
        children: [
          action.method + " " + this.props.response.route,
          action.method !== "GET" ? "" :
            r.a({
              className: "raw-route-link",
              href: this.props.response.routeUrl,
              target: "_blank"
            }, r.small({ }, " (open raw response)"))
        ]
      });
  };

  render() {
    var rawResponse = this.props.response.rawResponse;

    var jsonString = rawResponse === undefined ? null :
      JSON.stringify(rawResponse, undefined, 2);

    return r.div({ },
      this.renderResponseHeaderInfo(),
      r.pre({
        className: cx({
            "json-response-block": true,
            "json-error": this.props.response.error !== undefined,
            "json-loading": this.props.response.isLoading
          }),
        children: [
          r.code({
            className: "json"
          }, jsonString)
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
    isLoading?: boolean;
    rawResponse?: any;
    route: string;
    routeUrl: string;
  }

  export interface Props {
    response: ResponseData;
  }
}

export = JsonResponse;
