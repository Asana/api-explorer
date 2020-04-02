/// <reference path="../interfaces.ts" />

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
      "example_values": ["12345"],
      "comment": "Globally unique identifier for the job.",
      "required": true
      },
    ],
    "comment": "Get a job by id"
  },
  ]
}
export = resourceBase;