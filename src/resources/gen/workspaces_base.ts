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
    "path": "/workspaces/%s/addUser",
    "params": [
      {
      "name": "workspace_gid",
      "type": "string",
      "example_values": [""],
      "comment": "Globally unique identifier for the workspace or organization.",
      "required": true
      }
    ],
    "comment": "Add a user to a workspace or organization. The user can be referenced by their globally unique user ID or their email address. Returns the full user record for the invited user."
  },
  {
    "name": "getWorkspace",
    "method": "GET",
    "path": "/workspaces/%s",
    "params": [
      {
      "name": "workspace_gid",
      "type": "string",
      "example_values": [""],
      "comment": "Globally unique identifier for the workspace or organization.",
      "required": true
      }
    ],
    "comment": "Returns the full workspace record for a single workspace."
  },
  {
    "name": "getWorkspaces",
    "method": "GET",
    "path": "/workspaces",
    "params": [
    ],
    "comment": "Returns the compact records for all workspaces visible to the authorized user."
  },
  {
    "name": "removeUserForWorkspace",
    "method": "POST",
    "path": "/workspaces/%s/removeUser",
    "params": [
      {
      "name": "workspace_gid",
      "type": "string",
      "example_values": [""],
      "comment": "Globally unique identifier for the workspace or organization.",
      "required": true
      }
    ],
    "comment": "Remove a user from a workspace or organization. The user making this call must be an admin in the workspace. The user can be referenced by their globally unique user ID or their email address. Returns an empty data record."
  },
  {
    "name": "updateWorkspace",
    "method": "PUT",
    "path": "/workspaces/%s",
    "params": [
      {
      "name": "workspace_gid",
      "type": "string",
      "example_values": [""],
      "comment": "Globally unique identifier for the workspace or organization.",
      "required": true
      }
    ],
    "comment": "A specific, existing workspace can be updated by making a PUT request on the URL for that workspace. Only the fields provided in the data block will be updated; any unspecified fields will remain unchanged. Currently the only field that can be modified for a workspace is its name. Returns the complete, updated workspace record."
  },
  ]
}
export = resourceBase;