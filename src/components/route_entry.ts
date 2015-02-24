/// <reference path="../asana_json.d.ts" />
import AsanaJson = require("asana-json");
import build = require("./build");
import react = require("react");
import TypedReact = require("typed-react");

import Resources = require("../resources");

var r = react.DOM;

export interface Props {
  resource: AsanaJson.Resource;
  route: string;
  onFormSubmit: (event?: React.FormEvent) => void;
  onRouteChange: (event?: React.FormEvent) => void;
}

/**
 * The route entry area.
 */
export class Component extends TypedReact.Component<Props, {}> {

  private _renderSelectRoute() {
    return r.select({
      className: "select-route",
      onChange: this.props.onRouteChange,
      value: this.props.route,
      children: Resources.routesFromResource(this.props.resource).map(
          route => {
          return r.option({
            value: route
          }, route);
        })
    });
  }

  render() {
    return r.form({
      className: "route-entry",
      onSubmit: this.props.onFormSubmit,
      children: [
        this._renderSelectRoute(),
        r.button({
          className: "submit-request"
        }, "Submit!"),
        r.div({ },
          this.props.resource.properties.map(property => property.name).join()
        )
      ]
    });
  }
}

export var create = build(Component);
