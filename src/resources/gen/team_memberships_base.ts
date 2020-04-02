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
      }
    ],
    "comment": "Returns the complete team membership record for a single team membership."
  },
  {
    "name": "getTeamMemberships",
    "method": "GET",
    "path": "/team_memberships",
    "params": [
    ],
    "comment": "Returns compact team membership records."
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
      }
    ],
    "comment": "Returns the compact team memberships for the team."
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
      }
    ],
    "comment": "Returns the compact team membership records for the user."
  },
  ]
}
export = resourceBase;