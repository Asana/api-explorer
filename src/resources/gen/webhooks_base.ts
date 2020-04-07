/// <reference path="../interfaces.ts" />

/* tslint:disable:max-line-length */
/* tslint:disable:eofline */
var resourceBase = <Resource>{
  "name": "webhooks",
  "comment": "",
  "properties":[],
  "actions": [
  {
    "name": "createWebhook",
    "method": "POST",
    "collection": false,
    "path": "/webhooks",
    "params": [
    ],
    "comment": "Establish a webhook"
  },
  {
    "name": "deleteWebhook",
    "method": "DELETE",
    "collection": false,
    "path": "/webhooks/%s",
    "params": [
      {
      "name": "webhook_gid",
      "type": "string",
      "example_values": ["12345"],
      "comment": "Globally unique identifier for the webhook.",
      "required": true
      },
    ],
    "comment": "Delete a webhook"
  },
  {
    "name": "getWebhook",
    "method": "GET",
    "collection": false,
    "path": "/webhooks/%s",
    "params": [
      {
      "name": "webhook_gid",
      "type": "string",
      "example_values": ["12345"],
      "comment": "Globally unique identifier for the webhook.",
      "required": true
      },
    ],
    "comment": "Get a webhook"
  },
  {
    "name": "getWebhooks",
    "method": "GET",
    "collection": true||false,
    "path": "/webhooks",
    "params": [
      {
      "name": "resource",
      "type": "string",
      "example_values": ["51648"],
      "comment": "Only return webhooks for the given resource.",
      "required": false
      },
      {
      "name": "workspace",
      "type": "string",
      "example_values": ["1331"],
      "comment": "The workspace to query for webhooks in.",
      "required": true
      },
    ],
    "comment": "Get multiple webhooks"
  },
  ]
}
export = resourceBase;
