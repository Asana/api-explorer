/// <reference path="../../src/resources/interfaces.ts" />

/* tslint:disable:max-line-length */
/* tslint:disable:eofline */
var resourceBase = <Resource>{
  "name": "team_memberships",
  "comment": "",
  "properties":[],
  "actions": [
  {
    "name": "getTeamMembership",
    "method": "get",
    "path": "/team_memberships/${encodeURIComponent(String(teamMembershipGid))}",
    "params": [
      {
      "name": "team_membership_gid",
      "type": "string",
      "example_values": [""],
      "comment": "",
      "required": true
      }
    ],
    "comment": "Returns the complete team membership record for a single team membership."
  },
  {
    "name": "getTeamMemberships",
    "method": "get",
    "path": "/team_memberships",
    "params": [
    ],
    "comment": "Returns compact team membership records."
  },
  {
    "name": "getTeamMembershipsForTeam",
    "method": "get",
    "path": "/teams/${encodeURIComponent(String(teamGid))}/team_memberships",
    "params": [
      {
      "name": "team_gid",
      "type": "string",
      "example_values": [""],
      "comment": "Globally unique identifier for the team.",
      "required": true
      }
    ],
    "comment": "Returns the compact team memberships for the team."
  },
  {
    "name": "getTeamMembershipsForUser",
    "method": "get",
    "path": "/users/${encodeURIComponent(String(userGid))}/team_memberships",
    "params": [
      {
      "name": "user_gid",
      "type": "string",
      "example_values": [""],
      "comment": "A string identifying a user. This can either be the string \&quot;me\&quot;, an email, or the gid of a user.",
      "required": true
      }
    ],
    "comment": "Returns the compact team membership records for the user."
  },
  ]
}
export = resourceBase;