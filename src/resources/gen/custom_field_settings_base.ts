/// <reference path="../interfaces.ts" />

/* tslint:disable:max-line-length */
/* tslint:disable:eofline */
var resourceBase = <Resource>{
  "name": "custom_field_settings",
  "comment": "",
  "properties":[],
  "actions": [
  {
    "name": "getCustomFieldSettingsForPortfolio",
    "method": "GET",
    "path": "/portfolios/%s/custom_field_settings",
    "params": [
      {
      "name": "portfolio_gid",
      "type": "string",
      "example_values": ["12345"],
      "comment": "Globally unique identifier for the portfolio.",
      "required": true
      },
    ],
    "comment": "Get a portfolio&#x27;s custom fields"
  },
  {
    "name": "getCustomFieldSettingsForProject",
    "method": "GET",
    "path": "/projects/%s/custom_field_settings",
    "params": [
      {
      "name": "project_gid",
      "type": "string",
      "example_values": ["1331"],
      "comment": "Globally unique identifier for the project.",
      "required": true
      },
    ],
    "comment": "Get a project&#x27;s custom fields"
  },
  ]
}
export = resourceBase;
