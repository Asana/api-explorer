/// <reference path="../interfaces.ts" />

/* tslint:disable:max-line-length */
/* tslint:disable:eofline */
var resourceBase = <Resource>{
  "name": "team_memberships",
  "comment": "",
  "properties":[],
  "actions": [
  {
    "name": "getTeamMembership",
    "method": "GET",
    "path": "/team_memberships/%s",
    "params": [
      {
      "name": "team_membership_gid",
      "type": "string",
      "example_values": ["724362"],
      "comment": "",
      "required": true
      },
    ],
    "comment": "Get a team membership"
  },
  {
    "name": "getTeamMemberships",
    "method": "GET",
    "path": "/team_memberships",
    "params": [
      {
      "name": "workspace",
      "type": "string",
      "example_values": ["31326"],
      "comment": "Globally unique identifier for the workspace. This parameter must be used with the user parameter.",
      "required": false
      },
      {
      "name": "user",
      "type": "string",
      "example_values": ["512241"],
      "comment": "A string identifying a user. This can either be the string \&quot;me\&quot;, an email, or the gid of a user. This parameter must be used with the workspace parameter.",
      "required": false
      },
      {
      "name": "team",
      "type": "string",
      "example_values": ["159874"],
      "comment": "Globally unique identifier for the team.",
      "required": false
      },
    ],
    "comment": "Get team memberships"
  },
  {
    "name": "getTeamMembershipsForTeam",
    "method": "GET",
    "path": "/teams/%s/team_memberships",
    "params": [
      {
      "name": "team_gid",
      "type": "string",
      "example_values": ["159874"],
      "comment": "Globally unique identifier for the team.",
      "required": true
      },
    ],
    "comment": "Get memberships from a team"
  },
  {
    "name": "getTeamMembershipsForUser",
    "method": "GET",
    "path": "/users/%s/team_memberships",
    "params": [
      {
      "name": "user_gid",
      "type": "string",
      "example_values": ["me"],
      "comment": "A string identifying a user. This can either be the string \&quot;me\&quot;, an email, or the gid of a user.",
      "required": true
      },
      {
      "name": "workspace",
      "type": "string",
      "example_values": ["31326"],
      "comment": "Globally unique identifier for the workspace.",
      "required": true
      },
    ],
    "comment": "Get memberships from a user"
  },
  ]
}
export = resourceBase;
