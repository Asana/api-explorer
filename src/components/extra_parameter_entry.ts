/// <reference path="../resources/interfaces.ts" />
import React = require("react");
import _ = require("lodash");
import update from "immutability-helper";

var r = React.createElement;

/**
 * The extra parameter input area
 */
class ExtraParameterEntry extends React.Component<ExtraParameterEntry.Props, ExtraParameterEntry.State> {
  static create = React.createFactory(ExtraParameterEntry);

  constructor(props: ExtraParameterEntry.Props, context: any) {
    super(props, context);
    this.state = {
      extraParams: []
    };
  }

  render() {
    return r("div", {
        className: "parameter-entry",
        children: [
          this.props.text,
          this.state.extraParams.map(this.renderExtraParameterInput),
          this._renderAddNewExtraParameterLink()
        ]
      }
    );
  }

  private setStateAndPropagate = (newState: ExtraParameterEntry.State) => {
    this.setState(newState);

    // Pass new list of extra params to prop function, so we can propagate
    // Changes in the parent component.
    this.props.syncExtraParameters(newState.extraParams);
  }

  private _renderAddNewExtraParameterLink = () => {
    return r("a", {
      className: "add-extra-param",
      href: "#",
      onClick: (e: any) => {
        e.preventDefault();
        this.setState(update(this.state, <any>{
          extraParams: {
            $push: [<ExtraParameterEntry.ExtraParameter>{
              key: "",
              value: ""
            }]
          }
        }));
      }
    }, "Add new parameter!");
  }

  private renderExtraParameterInput = (extraParam: ExtraParameterEntry.ExtraParameter, idx: number) => {
    var idPrefix = "extra_param_" + idx;

    return r("p", {
      key: idPrefix,
      className: "extra-param",
      children: [
        r("input", {
          placeholder: "Key",
          type: "text",
          id: idPrefix + "_key",
          className: "parameter-input extra-param-key",
          value: this.state.extraParams[idx].key,
          onChange: (event: React.FormEvent) => {
            this.setStateAndPropagate(update(this.state, <any>{
              extraParams: _.zipObject(
                [idx.toString()],
                [{ key: { $set: (<any>event.target).value } }]
              )
            }));
          }
        }),
        ":",
        r("input", {
          placeholder: "Value",
          type: "text",
          id: idPrefix + "_value",
          className: "parameter-input extra-param-value",
          value: this.state.extraParams[idx].value,
          onChange: (event: React.FormEvent) => {
            this.setStateAndPropagate(update(this.state, <any>{
              extraParams: _.zipObject(
                [idx.toString()],
                [{ value: { $set: (<any>event.target).value } }]
              )
            }));
          }
        }),
        r("span", {
          className: "delete-extra-param",
          onClick: () => {
            this.setStateAndPropagate(update(this.state, <any> {
              extraParams: {
                $splice: [[ idx, 1 ]]
              }
            }));
          }
        }, "\u2715")
      ]
    });
  }
}

module ExtraParameterEntry {
  export interface ExtraParameter {
    key: string;
    value: string;
  }

  export interface Props {
    text: React.DOMElement<any, any>;
    syncExtraParameters: (parameters: ExtraParameter[]) => void;
  }

  export interface State {
    extraParams: ExtraParameter[];
  }
}

export = ExtraParameterEntry;
