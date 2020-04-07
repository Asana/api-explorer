/// <reference path="../interfaces.ts" />

/* tslint:disable:max-line-length */
/* tslint:disable:eofline */
var resourceBase = <Resource>{
  "name": "custom_fields",
  "comment": "",
  "properties":[],
  "actions": [
  {
    "name": "createCustomField",
    "method": "POST",
    "collection": true||false,
    "path": "/custom_fields",
    "params": [
    ],
    "comment": "Create a custom field"
  },
  {
    "name": "createEnumOptionForCustomField",
    "method": "POST",
    "collection": true||false,
    "path": "/custom_fields/%s/enum_options",
    "params": [
      {
      "name": "custom_field_gid",
      "type": "string",
      "example_values": ["12345"],
      "comment": "Globally unique identifier for the custom field.",
      "required": true
      },
    ],
    "comment": "Create an enum option"
  },
  {
    "name": "deleteCustomField",
    "method": "DELETE",
    "collection": false,
    "path": "/custom_fields/%s",
    "params": [
      {
      "name": "custom_field_gid",
      "type": "string",
      "example_values": ["12345"],
      "comment": "Globally unique identifier for the custom field.",
      "required": true
      },
    ],
    "comment": "Delete a custom field"
  },
  {
    "name": "getCustomField",
    "method": "GET",
    "collection": false,
    "path": "/custom_fields/%s",
    "params": [
      {
      "name": "custom_field_gid",
      "type": "string",
      "example_values": ["12345"],
      "comment": "Globally unique identifier for the custom field.",
      "required": true
      },
    ],
    "comment": "Get a custom field"
  },
  {
    "name": "getCustomFieldsForWorkspace",
    "method": "GET",
    "collection": true||false,
    "path": "/workspaces/%s/custom_fields",
    "params": [
      {
      "name": "workspace_gid",
      "type": "string",
      "example_values": ["12345"],
      "comment": "Globally unique identifier for the workspace or organization.",
      "required": true
      },
    ],
    "comment": "Get a workspace&#x27;s custom fields"
  },
  {
    "name": "insertEnumOptionForCustomField",
    "method": "POST",
    "collection": false,
    "path": "/custom_fields/%s/enum_options/insert",
    "params": [
      {
      "name": "custom_field_gid",
      "type": "string",
      "example_values": ["12345"],
      "comment": "Globally unique identifier for the custom field.",
      "required": true
      },
    ],
    "comment": "Reorder a custom field&#x27;s enum"
  },
  {
    "name": "updateCustomField",
    "method": "PUT",
    "collection": false,
    "path": "/custom_fields/%s",
    "params": [
      {
      "name": "custom_field_gid",
      "type": "string",
      "example_values": ["12345"],
      "comment": "Globally unique identifier for the custom field.",
      "required": true
      },
    ],
    "comment": "Update a custom field"
  },
  {
    "name": "updateEnumOption",
    "method": "PUT",
    "collection": false,
    "path": "/enum_options/%s",
    "params": [
      {
      "name": "enum_option_gid",
      "type": "string",
      "example_values": ["124578"],
      "comment": "Globally unique identifier for the enum option.",
      "required": true
      },
    ],
    "comment": "Update an enum option"
  },
  ]
}
export = resourceBase;
