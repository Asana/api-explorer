/// <reference path="../../src/resources/interfaces.ts" />

/* tslint:disable:max-line-length */
/* tslint:disable:eofline */
var resourceBase = <Resource>{
  "name": "users",
  "comment": "",
  "properties":[],
  "actions": [
  {
    "name": "getFavoritesForUser",
    "method": "GET",
    "path": "/users/%s/favorites",
    "params": [
      {
      "name": "user_gid",
      "type": "string",
      "example_values": [""],
      "comment": "A string identifying a user. This can either be the string \&quot;me\&quot;, an email, or the gid of a user.",
      "required": true
      }
    ],
    "comment": "Returns all of a user&#x27;s favorites in the given workspace, of the given type. Results are given in order (The same order as Asana&#x27;s sidebar)."
  },
  {
    "name": "getUser",
    "method": "GET",
    "path": "/users/%s",
    "params": [
      {
      "name": "user_gid",
      "type": "string",
      "example_values": [""],
      "comment": "A string identifying a user. This can either be the string \&quot;me\&quot;, an email, or the gid of a user.",
      "required": true
      }
    ],
    "comment": "Returns the full user record for the single user with the provided ID. Results are sorted by user ID."
  },
  {
    "name": "getUsers",
    "method": "GET",
    "path": "/users",
    "params": [
    ],
    "comment": "Returns the user records for all users in all workspaces and organizations accessible to the authenticated user. Accepts an optional workspace ID parameter. Results are sorted by user ID."
  },
  {
    "name": "getUsersForTeam",
    "method": "GET",
    "path": "/teams/%s/users",
    "params": [
      {
      "name": "team_gid",
      "type": "string",
      "example_values": [""],
      "comment": "Globally unique identifier for the team.",
      "required": true
      }
    ],
    "comment": "Returns the compact records for all users that are members of the team."
  },
  {
    "name": "getUsersForWorkspace",
    "method": "GET",
    "path": "/workspaces/%s/users",
    "params": [
      {
      "name": "workspace_gid",
      "type": "string",
      "example_values": [""],
      "comment": "Globally unique identifier for the workspace or organization.",
      "required": true
      }
    ],
    "comment": "Returns the user records for all users in the specified workspace or organization. Results are sorted alphabetically by user names."
  },
  ]
}
export = resourceBase;