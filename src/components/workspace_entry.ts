/// <reference path="../asana.d.ts" />
/// <reference path="../resources/interfaces.ts" />
import Asana = require("asana");
import React = require("react");

var r = React.DOM;

/**
 * The workspace entry area
 */
class WorkspaceEntry extends React.Component<WorkspaceEntry.Props, {}> {
  static create = React.createFactory(WorkspaceEntry);

  render() {
    return r.div({ },
      "Workspace: ",
      this.props.workspaces === undefined ?
        "Loading..." :
        r.select({
          className: "select-workspace",
          onChange: this.props.onWorkspaceChange,
          value: this.props.workspace.id.toString(),
          children: this.props.workspaces.map(workspace => {
            return r.option({
              value: workspace.id.toString()
            }, workspace.name);
          })
        })
    );
  }
}

module WorkspaceEntry {
  export interface Props {
    client: Asana.Client;
    onWorkspaceChange: (event?: React.FormEvent) => void;
    workspace: Asana.resources.Workspace;
    workspaces: Asana.resources.Workspace[];
  }
}

export = WorkspaceEntry;
