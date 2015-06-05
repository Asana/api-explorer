/// <reference path="../resources/interfaces.ts" />
import React = require("react/addons");
import _ = require("lodash");

var r = React.DOM;
var update = React.addons.update;

/**
 * The extra parameter input area
 */
class ExtraParameterEntry extends React.Component<ExtraParameterEntry.Props, ExtraParameterEntry.State> {
  static create = React.createFactory(ExtraParameterEntry);

  constructor(props: ExtraParameterEntry.Props, context: any) {
    super(props, context);
    this.state = {
      extra_params: []
    };
  }

  private _setStateAndPropagate = (new_state: ExtraParameterEntry.State) => {
    this.setState(new_state);

    // Pass new list of extra params to prop function, so we can propagate
    // changes in the parent component.
    this.props.syncExtraParameters(new_state.extra_params);
  };

  private _renderAddNewExtraParameterLink = () => {
    return r.a({
      className: "add-extra-param",
      href: "#",
      onClick: (e) => {
        e.preventDefault();
        this.setState(update(this.state, <any>{
          extra_params: {
            $push: [<ExtraParameterEntry.ExtraParameter>{
              key: "",
              value: ""
            }]
          }
        }));
      }
    }, "Add new parameter!");
  };

  private _renderExtraParameterInput = (extra_param: ExtraParameterEntry.ExtraParameter, idx: number) => {
    var id_prefix = "extra_param_" + idx;

    return r.p({
      key: id_prefix,
      className: "extra-param",
      children: [
        r.input({
          placeholder: "Key",
          type: "text",
          id: id_prefix + "_key",
          className: "parameter-input extra-param-key",
          value: this.state.extra_params[idx].key,
          onChange: (event: React.FormEvent) => {
            this._setStateAndPropagate(update(this.state, <any>{
              extra_params: _.object(
                [idx.toString()],
                [{ key: { $set: (<any>event.target).value } }]
              )
            }));
          }
        }),
        ":",
        r.input({
          placeholder: "Value",
          type: "text",
          id: id_prefix + "_value",
          className: "parameter-input extra-param-value",
          value: this.state.extra_params[idx].value,
          onChange: (event: React.FormEvent) => {
            this._setStateAndPropagate(update(this.state, <any>{
              extra_params: _.object(
                [idx.toString()],
                [{ value: { $set: (<any>event.target).value } }]
              )
            }));
          }
        }),
        r.span({
          className: "delete-extra-param",
          onClick: () => {
            this._setStateAndPropagate(update(this.state, <any> {
              extra_params: {
                $splice: [[ idx, 1 ]]
              }
            }));
          }
        }, "×")
      ]
    });
  };

  render() {
    return r.div({
        className: "parameter-entry",
        children: [
          this.props.text,
          this.state.extra_params.map(this._renderExtraParameterInput),
          this._renderAddNewExtraParameterLink()
        ]
      }
    );
  }
}

module ExtraParameterEntry {
  export interface ExtraParameter {
    key: string;
    value: string;
  }

  export interface Props {
    text: React.DOMElement<any>;
    syncExtraParameters: (parameters: ExtraParameter[]) => void;
  }

  export interface State {
    extra_params: ExtraParameter[];
  }
}

export = ExtraParameterEntry;
