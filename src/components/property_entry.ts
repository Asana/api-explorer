/// <reference path="../asana_json.d.ts" />
import AsanaJson = require("asana-json");
import build = require("./build");
import react = require("react");
import TypedReact = require("typed-react");

var r = react.DOM;

export interface Props {
  class_suffix: string;
  text: string;
  properties: AsanaJson.Property[];
  useProperty: (property: string) => boolean;
  isPropertyChecked: (event?: React.FormEvent) => void;
}

/**
 * The property toggling area
 */
export class Component extends TypedReact.Component<Props, {}> {
  private _renderPropertyCheckbox(property: AsanaJson.Property) {
    return r.span({ key: property.name },
      r.input({
        type: "checkbox",
        id: "property_checkbox_" + property.name,
        className: "property-checkbox-" + this.props.class_suffix,
        checked: this.props.useProperty(property.name),
        onChange: this.props.isPropertyChecked,
        value: property.name
      }, property.name)
    );
  }

  render() {
    return r.div({
        className: "property-entry-" + this.props.class_suffix,
        children: [
          this.props.text,
          r.span({
            className: "property-checkboxes-" + this.props.class_suffix
          }, this.props.properties.map(this._renderPropertyCheckbox))
        ]
      }
    );
  }
}

export var create = build(Component);
