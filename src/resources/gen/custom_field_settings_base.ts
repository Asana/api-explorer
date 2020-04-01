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
      "example_values": [""],
      "comment": "Globally unique identifier for the portfolio.",
      "required": true
      }
    ],
    "comment": "Returns a list of all of the custom fields settings on a portfolio, in compact form."
  },
  {
    "name": "getCustomFieldSettingsForProject",
    "method": "GET",
    "path": "/projects/%s/custom_field_settings",
    "params": [
      {
      "name": "project_gid",
      "type": "string",
      "example_values": [""],
      "comment": "Globally unique identifier for the project.",
      "required": true
      }
    ],
    "comment": "Returns a list of all of the custom fields settings on a project, in compact form. Note that, as in all queries to collections which return compact representation, &#x60;opt_fields&#x60; can be used to include more data than is returned in the compact representation. See the [getting started guide on input/output options](https://developers.asana.com/docs/#input-output-options) for more information."
  },
  ]
}
export = resourceBase;