/// <reference path="../interfaces.ts" />

/* tslint:disable:max-line-length */
/* tslint:disable:eofline */
var resourceBase = <Resource>{
  "name": "status_updates",
  "comment": "",
  "properties":[],
  "actions": [
  {
    "name": "createStatusForObject",
    "method": "POST",
    "collection": true||false,
    "path": "/status_updates",
    "params": [
    ],
    "comment": "Create a status update"
  },
  {
    "name": "deleteStatus",
    "method": "DELETE",
    "collection": false,
    "path": "/status_updates/%s",
    "params": [
      {
      "name": "status_gid",
      "type": "string",
      "example_values": ["321654"],
      "comment": "The status update to get.",
      "required": true
      },
    ],
    "comment": "Delete a status update"
  },
  {
    "name": "getStatus",
    "method": "GET",
    "collection": false,
    "path": "/status_updates/%s",
    "params": [
      {
      "name": "status_gid",
      "type": "string",
      "example_values": ["321654"],
      "comment": "The status update to get.",
      "required": true
      },
    ],
    "comment": "Get a status update"
  },
  {
    "name": "getStatusesForObject",
    "method": "GET",
    "collection": true||false,
    "path": "/status_updates",
    "params": [
      {
      "name": "created_since",
      "type": "Date",
      "example_values": ["2012-02-22T02:06:58.158Z"],
      "comment": "Only return statuses that have been created since the given time.",
      "required": false
      },
      {
      "name": "parent",
      "type": "string",
      "example_values": ["159874"],
      "comment": "Globally unique identifier for object to fetch statuses from.",
      "required": true
      },
    ],
    "comment": "Get status updates from an object"
  },
  ]
}
export = resourceBase;
