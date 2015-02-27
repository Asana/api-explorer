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
 * Given the className from an input rendered from _renderParameterInput,
 * extract the parameter name and return it.
 *
 * @param className
 * @returns {string}
 */
export function parameterFromInputClassName(className: string): string {
  return _.last(className.split("-"));
}
/**
 * The parameter input area
 */
export class Component extends TypedReact.Component<Props, {}> {
  unique_id: string;

  private _renderParameterInput(parameter: AsanaJson.Parameter) {
    var input_id = this.unique_id + "-input-" + parameter.name;

    return r.span({ key: parameter.name },
      r.input({
        type: "text",
        className: cx({
            input_id: true,
            "required-param": parameter.required
        }),
        onChange: this.props.onParameterChange
      }),
      r.label({
        htmlFor: input_id
      }, parameter.name)
    );
  }

  render() {
    this.unique_id = _.uniqueId("parameter");

    return r.div({
        className: this.unique_id + "-entry",
        children: [
          this.props.text,
          r.span({
            className: this.unique_id + "-inputs"
          }, this.props.parameters === undefined ? "" :
            this.props.parameters.map(this._renderParameterInput))
        ]
      }
    );
  }
}

export var create = build(Component);
