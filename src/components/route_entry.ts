/// <reference path="../resources/interfaces.ts" />
import React = require("react");

import ResourcesHelpers = require("../resources/helpers");

var r = React.DOM;

/**
 * The route entry area.
 */
class RouteEntry extends React.Component<RouteEntry.Props, {}> {
  static create = React.createFactory(RouteEntry);

  private _renderSelectRoute = () => {
    return r.select({
      className: "select-route",
      onChange: this.props.onActionChange,
      value: this.props.action.name,
      children: this.props.resource.actions.map(
          action => {
          return r.option({
            value: action.name
          }, action.method + " " + ResourcesHelpers.pathForAction(action));
        })
    });
  };

  private _renderRouteInfo = () => {
    return r.div({ },
      r.div({ },
        r.strong({ }, "Route description: "),
        this.props.action.comment
      ),
      r.div({ },
        r.strong({ }, "Current request URL: "),
        this.props.action.method + " " + this.props.current_request_url
      )
    );
  };

  render() {
    return r.div({
      className: "route-entry",
      children: [
        this._renderSelectRoute(),
        this._renderRouteInfo()
      ]
    });
  }
}

module RouteEntry {
  export interface Props {
    action: Action;
    current_request_url: string;
    onActionChange: (event?: React.FormEvent) => void;
    resource: Resource;
  }
}

export = RouteEntry;
