/// <reference path="../interfaces.ts" />

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
    "collection": false,
    "path": "/users/%s/favorites",
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
      "example_values": ["1234"],
      "comment": "The workspace in which to get favorites.",
      "required": true
      },
      {
      "name": "resource_type",
      "type": "string",
      "example_values": [],
      "comment": "The resource type of favorites to be returned.",
      "required": true
      },
    ],
    "comment": "Get a user&#x27;s favorites"
  },
  {
    "name": "getUser",
    "method": "GET",
    "collection": false,
    "path": "/users/%s",
    "params": [
      {
      "name": "user_gid",
      "type": "string",
      "example_values": ["me"],
      "comment": "A string identifying a user. This can either be the string \&quot;me\&quot;, an email, or the gid of a user.",
      "required": true
      },
    ],
    "comment": "Get a user"
  },
  {
    "name": "getUsers",
    "method": "GET",
    "collection": true||false,
    "path": "/users",
    "params": [
      {
      "name": "workspace",
      "type": "string",
      "example_values": ["1331"],
      "comment": "The workspace or organization ID to filter users on.",
      "required": false
      },
    ],
    "comment": "Get multiple users"
  },
  {
    "name": "getUsersForTeam",
    "method": "GET",
    "collection": true||false,
    "path": "/teams/%s/users",
    "params": [
      {
      "name": "team_gid",
      "type": "string",
      "example_values": ["159874"],
      "comment": "Globally unique identifier for the team.",
      "required": true
      },
    ],
    "comment": "Get users in a team"
  },
  {
    "name": "getUsersForWorkspace",
    "method": "GET",
    "collection": true||false,
    "path": "/workspaces/%s/users",
    "params": [
      {
      "name": "workspace_gid",
      "type": "string",
      "example_values": ["12345"],
      "comment": "Globally unique identifier for the workspace or organization.",
      "required": true
      },
    ],
    "comment": "Get users in a workspace or organization"
  },
  ]
}
export = resourceBase;
