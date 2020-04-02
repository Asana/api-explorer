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
    "path": "/custom_fields",
    "params": [
    ],
    "comment": "Create a custom field"
  },
  {
    "name": "createEnumOptionForCustomField",
    "method": "POST",
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