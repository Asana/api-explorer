/// <reference path="../interfaces.ts" />

/* tslint:disable:max-line-length */
/* tslint:disable:eofline */
var resourceBase = <Resource>{
  "name": "teams",
  "comment": "",
  "properties":[],
  "actions": [
  {
    "name": "addUserForTeam",
    "method": "POST",
    "collection": false,
    "path": "/teams/%s/addUser",
    "params": [
      {
      "name": "team_gid",
      "type": "string",
      "example_values": ["159874"],
      "comment": "Globally unique identifier for the team.",
      "required": true
      },
    ],
    "comment": "Add a user to a team"
  },
  {
    "name": "getTeam",
    "method": "GET",
    "collection": true||false,
    "path": "/teams/%s",
    "params": [
      {
      "name": "team_gid",
      "type": "string",
      "example_values": ["159874"],
      "comment": "Globally unique identifier for the team.",
      "required": true
      },
    ],
    "comment": "Get a team"
  },
  {
    "name": "getTeamsForOrganization",
    "method": "GET",
    "collection": true||false,
    "path": "/organizations/%s/teams",
    "params": [
      {
      "name": "workspace_gid",
      "type": "string",
      "example_values": ["12345"],
      "comment": "Globally unique identifier for the workspace or organization.",
      "required": true
      },
    ],
    "comment": "Get teams in an organization"
  },
  {
    "name": "getTeamsForUser",
    "method": "GET",
    "collection": true||false,
    "path": "/users/%s/teams",
    "params": [
      {
      "name": "user_gid",
      "type": "string",
      "example_values": ["me"],
      "comment": "A string identifying a user. This can either be the string \&quot;me\&quot;, an email, or the gid of a user.",
      "required": true
      },
      {
      "name": "organization",
      "type": "string",
      "example_values": ["1331"],
      "comment": "The workspace or organization to filter teams on.",
      "required": true
      },
    ],
    "comment": "Get teams for a user"
  },
  {
    "name": "removeUserForTeam",
    "method": "POST",
    "collection": false,
    "path": "/teams/%s/removeUser",
    "params": [
      {
      "name": "team_gid",
      "type": "string",
      "example_values": ["159874"],
      "comment": "Globally unique identifier for the team.",
      "required": true
      },
    ],
    "comment": "Remove a user from a team"
  },
  ]
}
export = resourceBase;
