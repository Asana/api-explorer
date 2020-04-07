/// <reference path="../interfaces.ts" />

/* tslint:disable:max-line-length */
/* tslint:disable:eofline */
var resourceBase = <Resource>{
  "name": "workspaces",
  "comment": "",
  "properties":[],
  "actions": [
  {
    "name": "addUserForWorkspace",
    "method": "POST",
    "collection": false,
    "path": "/workspaces/%s/addUser",
    "params": [
      {
      "name": "workspace_gid",
      "type": "string",
      "example_values": ["12345"],
      "comment": "Globally unique identifier for the workspace or organization.",
      "required": true
      },
    ],
    "comment": "Add a user to a workspace or organization"
  },
  {
    "name": "getWorkspace",
    "method": "GET",
    "collection": false,
    "path": "/workspaces/%s",
    "params": [
      {
      "name": "workspace_gid",
      "type": "string",
      "example_values": ["12345"],
      "comment": "Globally unique identifier for the workspace or organization.",
      "required": true
      },
    ],
    "comment": "Get a workspace"
  },
  {
    "name": "getWorkspaces",
    "method": "GET",
    "collection": true||false,
    "path": "/workspaces",
    "params": [
    ],
    "comment": "Get multiple workspaces"
  },
  {
    "name": "removeUserForWorkspace",
    "method": "POST",
    "collection": false,
    "path": "/workspaces/%s/removeUser",
    "params": [
      {
      "name": "workspace_gid",
      "type": "string",
      "example_values": ["12345"],
      "comment": "Globally unique identifier for the workspace or organization.",
      "required": true
      },
    ],
    "comment": "Remove a user from a workspace or organization"
  },
  {
    "name": "updateWorkspace",
    "method": "PUT",
    "collection": false,
    "path": "/workspaces/%s",
    "params": [
      {
      "name": "workspace_gid",
      "type": "string",
      "example_values": ["12345"],
      "comment": "Globally unique identifier for the workspace or organization.",
      "required": true
      },
    ],
    "comment": "Update a workspace"
  },
  ]
}
export = resourceBase;
