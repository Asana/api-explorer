/// <reference path="../interfaces.ts" />

/* tslint:disable:max-line-length */
/* tslint:disable:eofline */
var resourceBase = <Resource>{
  "name": "events",
  "comment": "",
  "properties":[],
  "actions": [
  {
    "name": "getEvents",
    "method": "GET",
    "path": "/events",
    "params": [
      {
      "name": "sync",
      "type": "string",
      "example_values": ["de4774f6915eae04714ca93bb2f5ee81"],
      "comment": "A sync token received from the last request, or none on first sync. Events will be returned from the point in time that the sync token was generated. *Note: On your first request, omit the sync token. The response will be the same as for an expired sync token, and will include a new valid sync token.If the sync token is too old (which may happen from time to time) the API will return a &#x60;412 Precondition Failed&#x60; error, and include a fresh sync token in the response.*",
      "required": false
      },
      {
      "name": "resource",
      "type": "string",
      "example_values": ["12345"],
      "comment": "A resource ID to subscribe to. The resource can be a task or project.",
      "required": true
      },
    ],
    "comment": "Get events on a resource"
  },
  ]
}
export = resourceBase;
