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
      r.h3({ }, "Route description"),
      r.p({ }, this.props.action.comment),
      r.hr({ }),
      r.h3({ }, "Current request URL"),
      r.p({ },
        r.pre({ },
          r.code({ }, this.props.action.method + " " + this.props.current_request_url)
        )
      ),
      r.hr({ })
    );
  };

  render() {
    return r.div({
      className: "route-entry",
      children: [
        r.hr({ }),
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
