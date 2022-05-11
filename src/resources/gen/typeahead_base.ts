/// <reference path="../interfaces.ts" />

/* tslint:disable:max-line-length */
/* tslint:disable:eofline */
var resourceBase = <Resource>{
  "name": "typeahead",
  "comment": "",
  "properties":[],
  "actions": [
  {
    "name": "typeaheadForWorkspace",
    "method": "GET",
    "collection": false,
    "path": "/workspaces/%s/typeahead",
    "params": [
      {
      "name": "workspace_gid",
      "type": "string",
      "example_values": ["12345"],
      "comment": "Globally unique identifier for the workspace or organization.",
      "required": true
      },
      {
      "name": "count",
      "type": "number",
      "example_values": [20],
      "comment": "The number of results to return. The default is 20 if this parameter is omitted, with a minimum of 1 and a maximum of 100. If there are fewer results found than requested, all will be returned.",
      "required": false
      },
      {
      "name": "query",
      "type": "string",
      "example_values": ["Greg"],
      "comment": "The string that will be used to search for relevant objects. If an empty string is passed in, the API will currently return an empty result set.",
      "required": false
      },
      {
      "name": "type",
      "type": "string",
      "example_values": [],
      "comment": "*Deprecated: new integrations should prefer the resource_type field.*",
      "required": false
      },
      {
      "name": "resource_type",
      "type": "string",
      "example_values": [],
      "comment": "The type of values the typeahead should return. You can choose from one of the following: &#x60;custom_field&#x60;, &#x60;project&#x60;, &#x60;project_template&#x60;, &#x60;portfolio&#x60;, &#x60;tag&#x60;, &#x60;task&#x60;, and &#x60;user&#x60;. Note that unlike in the names of endpoints, the types listed here are in singular form (e.g. &#x60;task&#x60;). Using multiple types is not yet supported.",
      "required": true
      },
    ],
    "comment": "Get objects via typeahead"
  },
  ]
}
export = resourceBase;
