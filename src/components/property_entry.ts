/// <reference path="../asana_json.d.ts" />
import AsanaJson = require("asana-json");
import build = require("./build");
import react = require("react");
import TypedReact = require("typed-react");
import _ = require("lodash");

var r = react.DOM;

export interface Props {
  text: string;
  properties: AsanaJson.Property[];
  useProperty: (property: string) => boolean;
  isPropertyChecked: (event?: React.FormEvent) => void;
}

/**
 * The property toggling area
 */
export class Component extends TypedReact.Component<Props, {}> {
  unique_id: string;

  private _renderPropertyCheckbox(property: AsanaJson.Property) {
    return r.span({ key: property.name },
      r.input({
        type: "checkbox",
        id: this.unique_id + "_checkbox_" + property.name,
        className: "property-checkbox",
        checked: this.props.useProperty(property.name),
        onChange: this.props.isPropertyChecked,
        value: property.name
      }, property.name)
    );
  }

  render() {
    this.unique_id = _.uniqueId("property");

    return r.div({
        className: "property-entry",
        children: [
          this.props.text,
          r.span({
            className: "property-checkboxes"
          }, this.props.properties.map(this._renderPropertyCheckbox))
        ]
      }
    );
  }
}

export var create = build(Component);
