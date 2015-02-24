/// <reference path="../asana_json.d.ts" />
import AsanaJson = require("asana-json");
import build = require("./build");
import react = require("react");
import TypedReact = require("typed-react");

var r = react.DOM;

export interface Props {
  resource: AsanaJson.Resource;
  action: AsanaJson.Action;
  onFormSubmit: (event?: React.FormEvent) => void;
  onActionChange: (event?: React.FormEvent) => void;
}

/**
 * The route entry area.
 */
export class Component extends TypedReact.Component<Props, {}> {

  private _renderSelectRoute() {
    return r.select({
      className: "select-route",
      onChange: this.props.onActionChange,
      value: this.props.action.name,
      children: this.props.resource.actions.map(
          action => {
          return r.option({
            value: action.name
          }, action.path);
        })
    });
  }

  private _renderRouteInfo() {
    return r.div({ },
      r.div({ },
        r.strong({ }, "Route description: "),
        this.props.action.comment
      ),
      r.div({ },
        r.strong({ }, "Current route attributes: "),
        this.props.action.params !== undefined ?
          this.props.action.params.map(parameter => parameter.name).join() :
          ""
      ),
      r.div({ },
        r.strong({ }, "Route method: "),
        this.props.action.method
      )
    );

  }

  render() {
    return r.form({
      className: "route-entry",
      onSubmit: this.props.onFormSubmit,
      children: [
        this._renderSelectRoute(),
        r.button({
          className: "submit-request"
        }, "Submit!"),
        this._renderRouteInfo()
      ]
    });
  }
}

export var create = build(Component);
