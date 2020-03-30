/// <reference path="../../src/resources/interfaces.ts" />

/* tslint:disable:max-line-length */
/* tslint:disable:eofline */
var resourceBase = <Resource>{
  "name": "custom_fields",
  "comment": "",
  "properties":[],
  "actions": [
  {
    "name": "createCustomField",
    "method": "post",
    "path": "/custom_fields",
    "params": [
    ],
    "comment": "Creates a new custom field in a workspace. Every custom field is required to be created in a specific workspace, and this workspace cannot be changed once set.  A custom field’s name must be unique within a workspace and not conflict with names of existing task properties such as ‘Due Date’ or ‘Assignee’. A custom field’s type must be one of ‘text’, ‘enum’, or ‘number’.  Returns the full record of the newly created custom field."
  },
  {
    "name": "createEnumOptionForCustomField",
    "method": "post",
    "path": "/custom_fields/${encodeURIComponent(String(customFieldGid))}/enum_options",
    "params": [
      {
      "name": "custom_field_gid",
      "type": "string",
      "example_values": [""],
      "comment": "Globally unique identifier for the custom field.",
      "required": true
      }
    ],
    "comment": "Creates an enum option and adds it to this custom field’s list of enum options. A custom field can have at most 50 enum options (including disabled options). By default new enum options are inserted at the end of a custom field’s list. Locked custom fields can only have enum options added by the user who locked the field. Returns the full record of the newly created enum option."
  },
  {
    "name": "deleteCustomField",
    "method": "delete",
    "path": "/custom_fields/${encodeURIComponent(String(customFieldGid))}",
    "params": [
      {
      "name": "custom_field_gid",
      "type": "string",
      "example_values": [""],
      "comment": "Globally unique identifier for the custom field.",
      "required": true
      }
    ],
    "comment": "A specific, existing custom field can be deleted by making a DELETE request on the URL for that custom field. Locked custom fields can only be deleted by the user who locked the field. Returns an empty data record."
  },
  {
    "name": "getCustomField",
    "method": "get",
    "path": "/custom_fields/${encodeURIComponent(String(customFieldGid))}",
    "params": [
      {
      "name": "custom_field_gid",
      "type": "string",
      "example_values": [""],
      "comment": "Globally unique identifier for the custom field.",
      "required": true
      }
    ],
    "comment": "Get the complete definition of a custom field’s metadata.  Since custom fields can be defined for one of a number of types, and these types have different data and behaviors, there are fields that are relevant to a particular type. For instance, as noted above, enum_options is only relevant for the enum type and defines the set of choices that the enum could represent. The examples below show some of these type-specific custom field definitions."
  },
  {
    "name": "getCustomFieldsForWorkspace",
    "method": "get",
    "path": "/workspaces/${encodeURIComponent(String(workspaceGid))}/custom_fields",
    "params": [
      {
      "name": "workspace_gid",
      "type": "string",
      "example_values": [""],
      "comment": "Globally unique identifier for the workspace or organization.",
      "required": true
      }
    ],
    "comment": "Returns a list of the compact representation of all of the custom fields in a workspace."
  },
  {
    "name": "insertEnumOptionForCustomField",
    "method": "post",
    "path": "/custom_fields/${encodeURIComponent(String(customFieldGid))}/enum_options/insert",
    "params": [
      {
      "name": "custom_field_gid",
      "type": "string",
      "example_values": [""],
      "comment": "Globally unique identifier for the custom field.",
      "required": true
      }
    ],
    "comment": "Moves a particular enum option to be either before or after another specified enum option in the custom field. Locked custom fields can only be reordered by the user who locked the field."
  },
  {
    "name": "updateCustomField",
    "method": "put",
    "path": "/custom_fields/${encodeURIComponent(String(customFieldGid))}",
    "params": [
      {
      "name": "custom_field_gid",
      "type": "string",
      "example_values": [""],
      "comment": "Globally unique identifier for the custom field.",
      "required": true
      }
    ],
    "comment": "A specific, existing custom field can be updated by making a PUT request on the URL for that custom field. Only the fields provided in the &#x60;data&#x60; block will be updated; any unspecified fields will remain unchanged When using this method, it is best to specify only those fields you wish to change, or else you may overwrite changes made by another user since you last retrieved the custom field. A custom field’s &#x60;type&#x60; cannot be updated. An enum custom field’s &#x60;enum_options&#x60; cannot be updated with this endpoint. Instead see “Work With Enum Options” for information on how to update &#x60;enum_options&#x60;. Locked custom fields can only be updated by the user who locked the field. Returns the complete updated custom field record."
  },
  {
    "name": "updateEnumOption",
    "method": "put",
    "path": "/enum_options/${encodeURIComponent(String(enumOptionGid))}",
    "params": [
      {
      "name": "enum_option_gid",
      "type": "string",
      "example_values": [""],
      "comment": "Globally unique identifier for the enum option.",
      "required": true
      }
    ],
    "comment": "Updates an existing enum option. Enum custom fields require at least one enabled enum option. Locked custom fields can only be updated by the user who locked the field. Returns the full record of the updated enum option."
  },
  ]
}
export = resourceBase;