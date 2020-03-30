/// <reference path="../../src/resources/interfaces.ts" />

/* tslint:disable:max-line-length */
/* tslint:disable:eofline */
var resourceBase = <Resource>{
  "name": "project_memberships",
  "comment": "",
  "properties":[],
  "actions": [
  {
    "name": "getProjectMembership",
    "method": "get",
    "path": "/project_memberships/${encodeURIComponent(String(projectMembershipGid))}",
    "params": [
      {
      "name": "project_membership_gid",
      "type": "string",
      "example_values": [""],
      "comment": "",
      "required": true
      }
    ],
    "comment": "Returns the complete project record for a single project membership."
  },
  {
    "name": "getProjectMembershipsForProject",
    "method": "get",
    "path": "/projects/${encodeURIComponent(String(projectGid))}/project_memberships",
    "params": [
      {
      "name": "project_gid",
      "type": "string",
      "example_values": [""],
      "comment": "Globally unique identifier for the project.",
      "required": true
      }
    ],
    "comment": "Returns the compact project membership records for the project."
  },
  ]
}
export = resourceBase;