/// <reference path="../../src/resources/interfaces.ts" />

/* tslint:disable:max-line-length */
/* tslint:disable:eofline */
var resourceBase = <Resource>{
  "name": "user_task_lists",
  "comment": "",
  "properties":[],
  "actions": [
  {
    "name": "getUserTaskList",
    "method": "GET",
    "path": "/user_task_lists/%s",
    "params": [
      {
      "name": "user_task_list_gid",
      "type": "string",
      "example_values": [""],
      "comment": "Globally unique identifier for the user task list.",
      "required": true
      }
    ],
    "comment": "Returns the full record for a user task list."
  },
  {
    "name": "getUserTaskListForUser",
    "method": "GET",
    "path": "/users/%s/user_task_list",
    "params": [
      {
      "name": "user_gid",
      "type": "string",
      "example_values": [""],
      "comment": "A string identifying a user. This can either be the string \&quot;me\&quot;, an email, or the gid of a user.",
      "required": true
      }
    ],
    "comment": "Returns the full record for a user&#x27;s task list."
  },
  ]
}
export = resourceBase;