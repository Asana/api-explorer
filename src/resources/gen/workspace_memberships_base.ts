/// <reference path="../interfaces.ts" />

/* tslint:disable:max-line-length */
/* tslint:disable:eofline */
var resourceBase = <Resource>{
  "name": "workspace_memberships",
  "comment": "",
  "properties":[],
  "actions": [
  {
    "name": "getWorkspaceMembership",
    "method": "GET",
    "path": "/workspace_memberships/%s",
    "params": [
      {
      "name": "workspace_membership_gid",
      "type": "string",
      "example_values": ["12345"],
      "comment": "",
      "required": true
      },
    ],
    "comment": "Returns the complete workspace record for a single workspace membership."
  },
  {
    "name": "getWorkspaceMembershipsForUser",
    "method": "GET",
    "path": "/users/%s/workspace_memberships",
    "params": [
      {
      "name": "user_gid",
      "type": "string",
      "example_values": ["me"],
      "comment": "A string identifying a user. This can either be the string \&quot;me\&quot;, an email, or the gid of a user.",
      "required": true
      },
    ],
    "comment": "Returns the compact workspace membership records for the user."
  },
  {
    "name": "getWorkspaceMembershipsForWorkspace",
    "method": "GET",
    "path": "/workspaces/%s/workspace_memberships",
    "params": [
      {
      "name": "workspace_gid",
      "type": "string",
      "example_values": ["12345"],
      "comment": "Globally unique identifier for the workspace or organization.",
      "required": true
      },
      {
      "name": "user",
      "type": "string",
      "example_values": ["me"],
      "comment": "A string identifying a user. This can either be the string \&quot;me\&quot;, an email, or the gid of a user.",
      "required": false
      },
    ],
    "comment": "Returns the compact workspace membership records for the workspace."
  },
  ]
}
export = resourceBase;