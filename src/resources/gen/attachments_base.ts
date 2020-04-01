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
      "example_values": [""],
      "comment": "Globally unique identifier for the attachment.",
      "required": true
      }
    ],
    "comment": "Deletes a specific, existing attachment.  Returns an empty data record."
  },
  {
    "name": "getAttachment",
    "method": "GET",
    "path": "/attachments/%s",
    "params": [
      {
      "name": "attachment_gid",
      "type": "string",
      "example_values": [""],
      "comment": "Globally unique identifier for the attachment.",
      "required": true
      }
    ],
    "comment": "Get the full record for a single attachment."
  },
  {
    "name": "getAttachmentsForTask",
    "method": "GET",
    "path": "/tasks/%s/attachments",
    "params": [
      {
      "name": "task_gid",
      "type": "string",
      "example_values": [""],
      "comment": "The task to operate on.",
      "required": true
      }
    ],
    "comment": "Returns the compact records for all attachments on the task."
  },
  ]
}
export = resourceBase;