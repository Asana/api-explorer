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

  private _renderSelectResource() {
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

  private _renderResourceInfo() {
    var resource = this.props.resource;

    return r.div({ },
      r.div({ },
        r.strong({ }, "Resource description: "),
        resource.comment
      ),
      r.div({ },
        r.strong({ }, "Current resource properties: "),
        resource.properties.map(property => property.name).join()
      )
    );
  }

  render() {
    return r.div({ },
      this._renderSelectResource(),
      this._renderResourceInfo()
    );
  }
}

export var create = build(Component);
