/// <reference path="../interfaces.ts" />

/* tslint:disable:max-line-length */
/* tslint:disable:eofline */
var resourceBase = <Resource>{
  "name": "project_briefs",
  "comment": "",
  "properties":[],
  "actions": [
  {
    "name": "createProjectBrief",
    "method": "POST",
    "collection": false,
    "path": "/projects/%s/project_briefs",
    "params": [
      {
      "name": "project_gid",
      "type": "string",
      "example_values": ["1331"],
      "comment": "Globally unique identifier for the project.",
      "required": true
      },
    ],
    "comment": "Create a project brief"
  },
  {
    "name": "deleteProjectBrief",
    "method": "DELETE",
    "collection": false,
    "path": "/project_briefs/%s",
    "params": [
      {
      "name": "project_brief_gid",
      "type": "string",
      "example_values": ["12345"],
      "comment": "Globally unique identifier for the project brief.",
      "required": true
      },
    ],
    "comment": "Delete a project brief"
  },
  {
    "name": "getProjectBrief",
    "method": "GET",
    "collection": false,
    "path": "/project_briefs/%s",
    "params": [
      {
      "name": "project_brief_gid",
      "type": "string",
      "example_values": ["12345"],
      "comment": "Globally unique identifier for the project brief.",
      "required": true
      },
    ],
    "comment": "Get a project brief"
  },
  {
    "name": "updateProjectBrief",
    "method": "PUT",
    "collection": false,
    "path": "/project_briefs/%s",
    "params": [
      {
      "name": "project_brief_gid",
      "type": "string",
      "example_values": ["12345"],
      "comment": "Globally unique identifier for the project brief.",
      "required": true
      },
    ],
    "comment": "Update a project brief"
  },
  ]
}
export = resourceBase;
