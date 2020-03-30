/// <reference path="../../src/resources/interfaces.ts" />

/* tslint:disable:max-line-length */
/* tslint:disable:eofline */
var resourceBase = <Resource>{
  "name": "project_statuses",
  "comment": "",
  "properties":[],
  "actions": [
  {
    "name": "createProjectStatusForProject",
    "method": "post",
    "path": "/projects/${encodeURIComponent(String(projectGid))}/project_statuses",
    "params": [
      {
      "name": "project_gid",
      "type": "string",
      "example_values": [""],
      "comment": "Globally unique identifier for the project.",
      "required": true
      }
    ],
    "comment": "Creates a new status update on the project. Returns the full record of the newly created project status update."
  },
  {
    "name": "deleteProjectStatus",
    "method": "delete",
    "path": "/project_statuses/${encodeURIComponent(String(projectStatusGid))}",
    "params": [
      {
      "name": "project_status_gid",
      "type": "string",
      "example_values": [""],
      "comment": "The project status update to get.",
      "required": true
      }
    ],
    "comment": "Deletes a specific, existing project status update.  Returns an empty data record."
  },
  {
    "name": "getProjectStatus",
    "method": "get",
    "path": "/project_statuses/${encodeURIComponent(String(projectStatusGid))}",
    "params": [
      {
      "name": "project_status_gid",
      "type": "string",
      "example_values": [""],
      "comment": "The project status update to get.",
      "required": true
      }
    ],
    "comment": "Returns the complete record for a single status update."
  },
  {
    "name": "getProjectStatusesForProject",
    "method": "get",
    "path": "/projects/${encodeURIComponent(String(projectGid))}/project_statuses",
    "params": [
      {
      "name": "project_gid",
      "type": "string",
      "example_values": [""],
      "comment": "Globally unique identifier for the project.",
      "required": true
      }
    ],
    "comment": "Returns the compact project status update records for all updates on the project."
  },
  ]
}
export = resourceBase;