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
    var checkbox_id = this.unique_id + "-checkbox-" + property.name;

    return r.span({ key: property.name },
      r.input({
        type: "checkbox",
        className: checkbox_id,
        checked: this.props.useProperty(property.name),
        onChange: this.props.isPropertyChecked,
        value: property.name
      }),
      r.label({
        htmlFor: checkbox_id
      }, property.name)
    );
  }

  render() {
    this.unique_id = _.uniqueId("property");

    return r.div({
        className: this.unique_id + "-entry",
        children: [
          this.props.text,
          r.span({
            className: this.unique_id + "-checkboxes"
          }, this.props.properties.map(this._renderPropertyCheckbox))
        ]
      }
    );
  }
}

export var create = build(Component);
