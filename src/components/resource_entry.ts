/// <reference path="../resources/interfaces.ts" />
import React = require("react");

import ResourcesHelpers = require("../resources/helpers");

var r = React.DOM;

/**
 * The resource entry area
 */
class ResourceEntry extends React.Component<ResourceEntry.Props, {}> {
  static create = React.createFactory(ResourceEntry);

  private _renderSelectResource = () => {
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
  };

  private _renderResourceInfo = () => {
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
  };

  render() {
    return r.div({ },
      this._renderSelectResource(),
      this._renderResourceInfo()
    );
  }
}

module ResourceEntry {
  export interface Props {
    resource: Resource;
    onResourceChange: (event?: React.FormEvent) => void;
  }
}

export = ResourceEntry;
