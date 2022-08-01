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
    "collection": false,
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
    "collection": false,
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
    "name": "getAttachmentsForObject",
    "method": "GET",
    "collection": true||false,
    "path": "/attachments",
    "params": [
      {
      "name": "parent",
      "type": "string",
      "example_values": ["159874"],
      "comment": "Globally unique identifier for object to fetch statuses from. Must be a GID for a task or project_brief.",
      "required": true
      },
    ],
    "comment": "Get attachments from an object"
  },
  ]
}
export = resourceBase;
