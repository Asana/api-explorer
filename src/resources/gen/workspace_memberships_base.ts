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
    "collection": false,
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
    "comment": "Get a workspace membership"
  },
  {
    "name": "getWorkspaceMembershipsForUser",
    "method": "GET",
    "collection": true||false,
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
    "comment": "Get workspace memberships for a user"
  },
  {
    "name": "getWorkspaceMembershipsForWorkspace",
    "method": "GET",
    "collection": true||false,
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
    "comment": "Get the workspace memberships for a workspace"
  },
  ]
}
export = resourceBase;
