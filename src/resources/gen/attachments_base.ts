/// <reference path="../interfaces.ts" />

/* tslint:disable:max-line-length */
/* tslint:disable:eofline */
var resourceBase = <Resource>{
  "name": "attachments",
  "comment": "",
  "properties":[],
  "actions": [
  {
    "name": "deleteAttachment",
    "method": "DELETE",
    "path": "/attachments/%s",
    "params": [
      {
      "name": "attachment_gid",
      "type": "string",
      "example_values": ["12345"],
      "comment": "Globally unique identifier for the attachment.",
      "required": true
      },
    ],
    "comment": "Delete an attachment"
  },
  {
    "name": "getAttachment",
    "method": "GET",
    "path": "/attachments/%s",
    "params": [
      {
      "name": "attachment_gid",
      "type": "string",
      "example_values": ["12345"],
      "comment": "Globally unique identifier for the attachment.",
      "required": true
      },
    ],
    "comment": "Get an attachment"
  },
  {
    "name": "getAttachmentsForTask",
    "method": "GET",
    "path": "/tasks/%s/attachments",
    "params": [
      {
      "name": "task_gid",
      "type": "string",
      "example_values": ["321654"],
      "comment": "The task to operate on.",
      "required": true
      },
    ],
    "comment": "Get attachments for a task"
  },
  ]
}
export = resourceBase;