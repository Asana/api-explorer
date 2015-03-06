/// <reference path="../resources/interfaces.ts" />
import build = require("./build");
import react = require("react");
import TypedReact = require("typed-react");

import ResourcesHelpers = require("../resources/helpers");

var r = react.DOM;

export interface Props {
  resource: Resource;
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
      value: ResourcesHelpers.resourceNameFromResource(this.props.resource),
      children: ResourcesHelpers.names().map(resource => {
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
