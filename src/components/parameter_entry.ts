/// <reference path="../resources/interfaces.ts" />
import React = require("react/addons");
import _ = require("lodash");

// TODO: Remove deprecated classSet.
var cx = React.addons.classSet;
var r = React.DOM;

/**
 * The parameter input area
 */
class ParameterEntry extends React.Component<ParameterEntry.Props, {}> {
  static create = React.createFactory(ParameterEntry);

  private _renderParameterInput = (parameter: Parameter) => {
    return r.span({ key: parameter.name },
      r.input({
        type: "text",
        id: "parameter_input_" + parameter.name,
        className: cx({
          "parameter-input": true,
          "required-param": parameter.required
        }),
        onChange: this.props.onParameterChange
      }, parameter.name)
    );
  };

  render() {
    return r.div({
        className: "parameter-entry",
        children: [
          this.props.text,
          r.span({
            className: "parameter-inputs"
          }, this.props.parameters === undefined ? "" :
            this.props.parameters.map(this._renderParameterInput))
        ]
      }
    );
  }
}

module ParameterEntry {
  /**
   * Given the id from an input rendered from _renderParameterInput,
   * extract the parameter name and return it.
   *
   * @param idName
   * @returns {string}
   */
  export function parameterFromInputId(idName: string): string {
    return _.last(idName.split("_"));
  }

  export interface Props {
    text: string;
    parameters: Parameter[];
    onParameterChange: (event?: React.FormEvent) => void;
  }
}

export = ParameterEntry;
