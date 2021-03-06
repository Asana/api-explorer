/// <reference path="../interfaces.ts" />

/* tslint:disable:max-line-length */
/* tslint:disable:eofline */
var resourceBase = <Resource>{
  "name": "organization_exports",
  "comment": "",
  "properties":[],
  "actions": [
  {
    "name": "createOrganizationExport",
    "method": "POST",
    "collection": true||false,
    "path": "/organization_exports",
    "params": [
    ],
    "comment": "Create an organization export request"
  },
  {
    "name": "getOrganizationExport",
    "method": "GET",
    "collection": false,
    "path": "/organization_exports/%s",
    "params": [
      {
      "name": "organization_export_gid",
      "type": "string",
      "example_values": ["12345"],
      "comment": "Globally unique identifier for the organization export.",
      "required": true
      },
    ],
    "comment": "Get details on an org export request"
  },
  ]
}
export = resourceBase;
