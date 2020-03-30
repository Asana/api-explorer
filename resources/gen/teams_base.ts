/// <reference path="../../src/resources/interfaces.ts" />

/* tslint:disable:max-line-length */
/* tslint:disable:eofline */
var resourceBase = <Resource>{
  "name": "teams",
  "comment": "",
  "properties":[],
  "actions": [
  {
    "name": "addUserForTeam",
    "method": "post",
    "path": "/teams/${encodeURIComponent(String(teamGid))}/addUser",
    "params": [
      {
      "name": "team_gid",
      "type": "string",
      "example_values": [""],
      "comment": "Globally unique identifier for the team.",
      "required": true
      }
    ],
    "comment": "The user making this call must be a member of the team in order to add others. The user being added must exist in the same organization as the team."
  },
  {
    "name": "getTeam",
    "method": "get",
    "path": "/teams/${encodeURIComponent(String(teamGid))}",
    "params": [
      {
      "name": "team_gid",
      "type": "string",
      "example_values": [""],
      "comment": "Globally unique identifier for the team.",
      "required": true
      }
    ],
    "comment": "Returns the full record for a single team."
  },
  {
    "name": "getTeamsForOrganization",
    "method": "get",
    "path": "/organizations/${encodeURIComponent(String(workspaceGid))}/teams",
    "params": [
      {
      "name": "workspace_gid",
      "type": "string",
      "example_values": [""],
      "comment": "Globally unique identifier for the workspace or organization.",
      "required": true
      }
    ],
    "comment": "Returns the compact records for all teams in the organization visible to the authorized user."
  },
  {
    "name": "getTeamsForUser",
    "method": "get",
    "path": "/users/${encodeURIComponent(String(userGid))}/teams",
    "params": [
      {
      "name": "user_gid",
      "type": "string",
      "example_values": [""],
      "comment": "A string identifying a user. This can either be the string \&quot;me\&quot;, an email, or the gid of a user.",
      "required": true
      }
    ],
    "comment": "Returns the compact records for all teams to which the given user is assigned."
  },
  {
    "name": "removeUserForTeam",
    "method": "post",
    "path": "/teams/${encodeURIComponent(String(teamGid))}/removeUser",
    "params": [
      {
      "name": "team_gid",
      "type": "string",
      "example_values": [""],
      "comment": "Globally unique identifier for the team.",
      "required": true
      }
    ],
    "comment": "The user making this call must be a member of the team in order to remove themselves or others."
  },
  ]
}
export = resourceBase;