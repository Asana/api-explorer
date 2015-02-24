/// <reference path="../asana_json.d.ts" />
import AsanaJson = require("asana-json");
import build = require("./build");
import react = require("react");
import TypedReact = require("typed-react");

import Resources = require("../resources");

var r = react.DOM;

export interface Props {
  resource: AsanaJson.Resource;
  onResourceChange: (event?: React.FormEvent) => void;
}

/**
 * The resource entry area
 */
export class Component extends TypedReact.Component<Props, {}> {

  render() {
    return r.select({
      className: "select-resource",
      onChange: this.props.onResourceChange,
      value: Resources.resourceNameFromResource(this.props.resource),
      children: Resources.names().map(resource => {
        return r.option({
          value: resource
        }, resource);
      })
    });
  }
}

export var create = build(Component);
