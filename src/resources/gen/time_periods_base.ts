/// <reference path="../interfaces.ts" />

/* tslint:disable:max-line-length */
/* tslint:disable:eofline */
var resourceBase = <Resource>{
  "name": "time_periods",
  "comment": "",
  "properties":[],
  "actions": [
  {
    "name": "getTimePeriod",
    "method": "GET",
    "collection": false,
    "path": "/time_periods/%s",
    "params": [
      {
      "name": "time_period_gid",
      "type": "string",
      "example_values": ["917392"],
      "comment": "Globally unique identifier for the time period.",
      "required": true
      },
    ],
    "comment": "Get a time period"
  },
  {
    "name": "getTimePeriods",
    "method": "GET",
    "collection": true||false,
    "path": "/time_periods",
    "params": [
      {
      "name": "workspace",
      "type": "string",
      "example_values": ["31326"],
      "comment": "Globally unique identifier for the workspace.",
      "required": true
      },
      {
      "name": "end_on",
      "type": "string",
      "example_values": ["2019-09-15"],
      "comment": "ISO 8601 date string",
      "required": false
      },
      {
      "name": "start_on",
      "type": "string",
      "example_values": ["2019-09-15"],
      "comment": "ISO 8601 date string",
      "required": false
      },
    ],
    "comment": "Get time periods"
  },
  ]
}
export = resourceBase;
