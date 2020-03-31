/// <reference path="../../src/resources/interfaces.ts" />

/* tslint:disable:max-line-length */
/* tslint:disable:eofline */
var resourceBase = <Resource>{
  "name": "jobs",
  "comment": "",
  "properties":[],
  "actions": [
  {
    "name": "getJob",
    "method": "GET",
    "path": "/jobs/%s",
    "params": [
      {
      "name": "job_gid",
      "type": "string",
      "example_values": [""],
      "comment": "Globally unique identifier for the job.",
      "required": true
      }
    ],
    "comment": "Returns the full record for a job."
  },
  ]
}
export = resourceBase;