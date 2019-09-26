/// <reference path="../resources/interfaces.ts" />
import cx = require("../class_names");
import React = require("react");

const r = React.createElement;

/**
 * The JSON response code block.
 */
class JsonResponse extends React.Component<JsonResponse.Props, {}> {
  static create = React.createFactory(JsonResponse);

  render() {
      const rawResponse = this.props.response.rawResponse;

      const jsonString = rawResponse === undefined ? null :
          JSON.stringify(rawResponse, undefined, 2);

      return r("div", { },
      this.renderResponseHeaderInfo(),
      r("pre", {
        className: cx({
            "json-response-block": true,
            "json-error": this.props.response.error !== undefined,
            "json-loading": this.props.response.isLoading || false
          }),
        children: [
          r("code", {
            className: "json"
          }, jsonString)
        ]
      })
    );
  }

  private renderResponseHeaderInfo = () => {
      const action = this.props.response.action;

      return action === undefined ? null :
      r("p", {
        className: "json-response-info",
        children: [
          action.method + " " + this.props.response.route,
          action.method !== "GET" ? "" :
            r("a", {
              className: "raw-route-link",
              href: this.props.response.routeUrl,
              target: "_blank"
            }, r("small", { }, " (open raw response)"))
        ]
      });
  }
}

module JsonResponse {
  /**
   * Stores information about the response of a request.
   * This is set after the user submits a query.
   */
  export interface ResponseData {
    action?: Action;
    error?: any;
    isLoading?: boolean;
    rawResponse?: any;
    route?: string;
    routeUrl?: string;
  }

  export interface Props {
    response: ResponseData;
  }
}

export = JsonResponse;
