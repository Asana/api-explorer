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
    "path": "/organization_exports",
    "params": [
    ],
    "comment": "This method creates a request to export an Organization. Asana will complete the export at some point after you create the request."
  },
  {
    "name": "getOrganizationExport",
    "method": "GET",
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
    "comment": "Returns details of a previously-requested Organization export."
  },
  ]
}
export = resourceBase;