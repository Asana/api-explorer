/// <reference path="../resources/interfaces.ts" />
import build = require("./build");
import react = require("react/addons");
import TypedReact = require("typed-react");
import _ = require("lodash");

var cx = react.addons.classSet;
var r = react.DOM;

export interface Props {
  text: string;
  parameters: Parameter[];
  onParameterChange: (event?: React.FormEvent) => void;
}

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
/**
 * The parameter input area
 */
export class Component extends TypedReact.Component<Props, {}> {
  private _renderParameterInput(parameter: Parameter) {
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
  }

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

export var create = build(Component);
