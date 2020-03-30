/// <reference path="../../src/resources/interfaces.ts" />

/* tslint:disable:max-line-length */
/* tslint:disable:eofline */
var resourceBase = <Resource>{
  "name": "workspace_memberships",
  "comment": "",
  "properties":[],
  "actions": [
  {
    "name": "getWorkspaceMembership",
    "method": "get",
    "path": "/workspace_memberships/${encodeURIComponent(String(workspaceMembershipGid))}",
    "params": [
      {
      "name": "workspace_membership_gid",
      "type": "string",
      "example_values": [""],
      "comment": "",
      "required": true
      }
    ],
    "comment": "Returns the complete workspace record for a single workspace membership."
  },
  {
    "name": "getWorkspaceMembershipsForUser",
    "method": "get",
    "path": "/users/${encodeURIComponent(String(userGid))}/workspace_memberships",
    "params": [
      {
      "name": "user_gid",
      "type": "string",
      "example_values": [""],
      "comment": "A string identifying a user. This can either be the string \&quot;me\&quot;, an email, or the gid of a user.",
      "required": true
      }
    ],
    "comment": "Returns the compact workspace membership records for the user."
  },
  {
    "name": "getWorkspaceMembershipsForWorkspace",
    "method": "get",
    "path": "/workspaces/${encodeURIComponent(String(workspaceGid))}/workspace_memberships",
    "params": [
      {
      "name": "workspace_gid",
      "type": "string",
      "example_values": [""],
      "comment": "Globally unique identifier for the workspace or organization.",
      "required": true
      }
    ],
    "comment": "Returns the compact workspace membership records for the workspace."
  },
  ]
}
export = resourceBase;