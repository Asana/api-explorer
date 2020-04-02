/// <reference path="../interfaces.ts" />

/* tslint:disable:max-line-length */
/* tslint:disable:eofline */
var resourceBase = <Resource>{
  "name": "project_memberships",
  "comment": "",
  "properties":[],
  "actions": [
  {
    "name": "getProjectMembership",
    "method": "GET",
    "path": "/project_memberships/%s",
    "params": [
      {
      "name": "project_membership_gid",
      "type": "string",
      "example_values": ["1331"],
      "comment": "",
      "required": true
      },
    ],
    "comment": "Returns the complete project record for a single project membership."
  },
  {
    "name": "getProjectMembershipsForProject",
    "method": "GET",
    "path": "/projects/%s/project_memberships",
    "params": [
      {
      "name": "project_gid",
      "type": "string",
      "example_values": ["1331"],
      "comment": "Globally unique identifier for the project.",
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
    "comment": "Returns the compact project membership records for the project."
  },
  ]
}
export = resourceBase;