/// <reference path="../interfaces.ts" />

/* tslint:disable:max-line-length */
/* tslint:disable:eofline */
var resourceBase = <Resource>{
  "name": "project_statuses",
  "comment": "",
  "properties":[],
  "actions": [
  {
    "name": "createProjectStatusForProject",
    "method": "POST",
    "path": "/projects/%s/project_statuses",
    "params": [
      {
      "name": "project_gid",
      "type": "string",
      "example_values": ["1331"],
      "comment": "Globally unique identifier for the project.",
      "required": true
      },
    ],
    "comment": "Create a project status"
  },
  {
    "name": "deleteProjectStatus",
    "method": "DELETE",
    "path": "/project_statuses/%s",
    "params": [
      {
      "name": "project_status_gid",
      "type": "string",
      "example_values": ["321654"],
      "comment": "The project status update to get.",
      "required": true
      },
    ],
    "comment": "Delete a project status"
  },
  {
    "name": "getProjectStatus",
    "method": "GET",
    "path": "/project_statuses/%s",
    "params": [
      {
      "name": "project_status_gid",
      "type": "string",
      "example_values": ["321654"],
      "comment": "The project status update to get.",
      "required": true
      },
    ],
    "comment": "Get a project status"
  },
  {
    "name": "getProjectStatusesForProject",
    "method": "GET",
    "path": "/projects/%s/project_statuses",
    "params": [
      {
      "name": "project_gid",
      "type": "string",
      "example_values": ["1331"],
      "comment": "Globally unique identifier for the project.",
      "required": true
      },
    ],
    "comment": "Get statuses from a project"
  },
  ]
}
export = resourceBase;
