/// <reference path="../resources/interfaces.ts" />
import React = require("react");

var r = React.DOM;

/**
 * The property toggling area
 */
class PropertyEntry extends React.Component<PropertyEntry.Props, {}> {
  static create = React.createFactory(PropertyEntry);

  private renderPropertyCheckbox = (property: Property) => {
    return r.span({ key: property.name },
      r.input({
        type: "checkbox",
        id: "property_checkbox_" + property.name,
        className: "property-checkbox-" + this.props.classSuffix,
        checked: this.props.useProperty(property.name),
        onChange: this.props.isPropertyChecked,
        value: property.name
      }, " " + property.name)
    );
  };

  render() {
    return r.p({
        className: "property-entry-" + this.props.classSuffix,
        children: [
          this.props.text,
          r.span({
            className: "property-checkboxes-" + this.props.classSuffix
          }, this.props.properties.map(this.renderPropertyCheckbox))
        ]
      }
    );
  }
}

module PropertyEntry {
  export interface Props {
    classSuffix: string;
    text: React.DOMElement<any>;
    properties: Property[];
    useProperty: (property: string) => boolean;
    isPropertyChecked: (event?: React.FormEvent) => void;
  }
}
export = PropertyEntry;
