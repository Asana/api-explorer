/// <reference path="../../src/resources/interfaces.ts" />

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
    ],
    "comment": "Returns the full record for all events that have occurred since the sync token was created.  A GET request to the endpoint /[path_to_resource]/events can be made in lieu of including the resource ID in the data for the request.  *Note: The resource returned will be the resource that triggered the event. This may be different from the one that the events were requested for. For example, a subscription to a project will contain events for tasks contained within the project.*"
  },
  ]
}
export = resourceBase;