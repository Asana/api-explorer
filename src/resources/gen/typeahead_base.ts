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
      "comment": "The type of values the typeahead should return. You can choose from one of the following: &#x60;custom_field&#x60;, &#x60;project&#x60;, &#x60;portfolio&#x60;, &#x60;tag&#x60;, &#x60;task&#x60;, and &#x60;user&#x60;. Note that unlike in the names of endpoints, the types listed here are in singular form (e.g. &#x60;task&#x60;). Using multiple types is not yet supported.",
      "required": true
      },
    ],
    "comment": "Retrieves objects in the workspace based via an auto-completion/typeahead search algorithm. This feature is meant to provide results quickly, so do not rely on this API to provide extremely accurate search results. The result set is limited to a single page of results with a maximum size, so you won’t be able to fetch large numbers of results.  The typeahead search API provides search for objects from a single workspace. This endpoint should be used to query for objects when creating an auto-completion/typeahead search feature. This API is meant to provide results quickly and should not be relied upon for accurate or exhaustive search results. The results sets are limited in size and cannot be paginated.  Queries return a compact representation of each object which is typically the gid and name fields. Interested in a specific set of fields or all of the fields?! Of course you are. Use field selectors to manipulate what data is included in a response."
  },
  ]
}
export = resourceBase;