/// <reference path="../interfaces.ts" />

/* tslint:disable:max-line-length */
/* tslint:disable:eofline */
var resourceBase = <Resource>{
  "name": "audit_log_api",
  "comment": "",
  "properties":[],
  "actions": [
  {
    "name": "getAuditLogEvents",
    "method": "GET",
    "collection": true||false,
    "path": "/workspaces/%s/audit_log_events",
    "params": [
      {
      "name": "workspace_gid",
      "type": "string",
      "example_values": ["12345"],
      "comment": "Globally unique identifier for the workspace or organization.",
      "required": true
      },
      {
      "name": "resource_gid",
      "type": "string",
      "example_values": [],
      "comment": "Filter to events with this resource ID.",
      "required": false
      },
      {
      "name": "actor_gid",
      "type": "string",
      "example_values": [],
      "comment": "Filter to events triggered by the actor with this ID.",
      "required": false
      },
      {
      "name": "actor_type",
      "type": "string",
      "example_values": [],
      "comment": "Filter to events with an actor of this type. This only needs to be included if querying for actor types without an ID. If &#x60;actor_gid&#x60; is included, this should be excluded.",
      "required": false
      },
      {
      "name": "event_type",
      "type": "string",
      "example_values": [],
      "comment": "Filter to events of this type. Refer to the [Supported AuditLogEvents](/docs/supported-auditlogevents) for a full list of values.",
      "required": false
      },
      {
      "name": "end_at",
      "type": "Date",
      "example_values": [],
      "comment": "Filter to events created before this time (exclusive).",
      "required": false
      },
      {
      "name": "start_at",
      "type": "Date",
      "example_values": [],
      "comment": "Filter to events created after this time (inclusive).",
      "required": false
      },
    ],
    "comment": "Get audit log events"
  },
  ]
}
export = resourceBase;
