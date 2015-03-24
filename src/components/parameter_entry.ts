/// <reference path="../asana.d.ts" />
/// <reference path="../resources/interfaces.ts" />
import Asana = require("asana");
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
    var classes = cx({
      "parameter-input": true,
      "required-param": parameter.required
    });
    var id = "parameter_input_" + parameter.name;

    // We pre-fetch workspaces, so show a dropdown instead.
    if (parameter.name === "workspace" && this.props.workspaces !== undefined) {
      return r.span({ key: parameter.name },
        r.select({
          id: id,
          className: classes,
          onChange: this.props.onParameterChange,
          value: this.props.workspace.id.toString(),
          children: this.props.workspaces.map(workspace => {
            return r.option({
              value: workspace.id.toString()
            }, workspace.name);
          })
        })
      );
    } else {
      return r.span({ key: parameter.name },
        r.input({
          placeholder: parameter.name,
          type: "text",
          id: id,
          className: classes,
          onChange: this.props.onParameterChange
        }, parameter.name)
      );
    }
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
    workspace: Asana.resources.Workspace;
    workspaces: Asana.resources.Workspace[];
  }
}

export = ParameterEntry;
