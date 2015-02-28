/// <reference path="../asana_json.d.ts" />
import AsanaJson = require("asana-json");
import build = require("./build");
import react = require("react/addons");
import TypedReact = require("typed-react");
import _ = require("lodash");

var cx = react.addons.classSet;
var r = react.DOM;

export interface Props {
  text: string;
  parameters: AsanaJson.Parameter[];
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
  unique_id: string;

  private _renderParameterInput(parameter: AsanaJson.Parameter) {
    return r.span({ key: parameter.name },
      r.input({
        type: "text",
        id: this.unique_id + "_input_" + parameter.name,
        className: cx({
          "parameter-input": true,
          "required-param": parameter.required
        }),
        onChange: this.props.onParameterChange
      }, parameter.name)
    );
  }

  render() {
    this.unique_id = _.uniqueId("parameter");

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
