/// <reference path="../resources/interfaces.ts" />
import React = require("react");
import marked = require("marked");

import ResourcesHelpers = require("../resources/helpers");

var r = React.DOM;

/**
 * The route entry area.
 */
class RouteEntry extends React.Component<RouteEntry.Props, {}> {
  static create = React.createFactory(RouteEntry);

  private renderSelectRoute = () => {
    return r.p({ },
      r.select({
        className: "select-route",
        onChange: this.props.onActionChange,
        value: this.props.action.name,
        children: this.props.resource.actions.map(
            action => {
            return r.option({
              value: action.name
            }, action.method + " " + ResourcesHelpers.pathForAction(action));
          })
      })
    );
  };

  private renderRouteInfo = () => {
    return r.div({ },
      r.h3({ }, "Route description"),
      r.p({ dangerouslySetInnerHTML: {
        __html: marked(this.props.action.comment, { sanitize: true }) }
      }),
      r.hr({ }),
      r.h3({ }, "Current request URL"),
      r.p({ },
        r.pre({ },
          r.code({ }, this.props.action.method + " " + this.props.currentRequestUrl)
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
        this.renderSelectRoute(),
        this.renderRouteInfo()
      ]
    });
  }
}

module RouteEntry {
  export interface Props {
    action: Action;
    currentRequestUrl: string;
    onActionChange: (event?: React.FormEvent) => void;
    resource: Resource;
  }
}

export = RouteEntry;
