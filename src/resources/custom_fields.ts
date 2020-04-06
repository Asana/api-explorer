import resourceBase = require("./gen/custom_fields_base");
resourceBase.comment = "\nCustom Fields store the metadata that is used in order to add user-specified\ninformation to tasks in Asana. Be sure to reference the [Custom\nFields](/developers/documentation/getting-started/custom-fields) developer\ndocumentation for more information about how custom fields relate to various\nresources in Asana.\n\nUsers in Asana can [lock custom\nfields](/guide/help/premium/custom-fields#gl-lock-fields), which will make\nthem read-only when accessed by other users. Attempting to edit a locked\ncustom field will return HTTP error code `403 Forbidden`.\n";
resourceBase.properties = [
  {
    "name": "gid",
    "type": "Gid",
    "example_values": [
      "\"1234\""
    ],
    "comment": "Globally unique ID of the custom field.\n"
  },
  {
    "name": "resource_type",
    "type": "Enum",
    "comment": "The resource type of this resource. The value for this resource is always `custom_field`.\n",
    "example_values": [
      "\"custom_field\""
    ],
    "values": [
      {
        "name": "custom_field",
        "comment": "A custom field resource type."
      }
    ]
  },
  {
    "name": "resource_subtype",
    "type": "Enum",
    "comment": "The type of custom field. Must be one of the given values.\n",
    "example_values": [
      "\"text\"",
      "\"number\"",
      "\"enum\""
    ],
    "values": [
      {
        "name": "text",
        "comment": "A custom field of subtype `text`. Text custom fields store strings of text in Asana and have very few restrictions on content."
      },
      {
        "name": "number",
        "comment": "A custom field of subtype `number`. Number custom fields must contain only valid numbers and are constrained to a predefined precision."
      },
      {
        "name": "enum",
        "comment": "A custom field of subtype `enum`. Enum custom fields are constrained to one of a set of predefined values."
      }
    ]
  },
  {
    "name": "name",
    "type": "String",
    "example_values": [
      "'Priority'"
    ],
    "comment": "The name of the custom field.\n"
  },
  {
    "name": "description",
    "type": "String",
    "example_values": [
      "'Development team priority'"
    ],
    "comment": "[Opt In](/developers/documentation/getting-started/input-output-options). The description of the custom field.\n"
  },
  {
    "name": "type",
    "type": "String",
    "example_values": [
      "'text'",
      "'enum'",
      "'number'"
    ],
    "comment": "**Deprecated: new integrations should prefer the `resource_subtype` field.**\nThe type of the custom field. Must be one of the given values.\n"
  },
  {
    "name": "enum_options",
    "type": "String",
    "example_values": [
      "[ { id: 789, gid: \"789\", name: 'Low', enabled: 'true', color: 'blue' }, ... ]"
    ],
    "comment": "Only relevant for custom fields of type 'enum'. This array specifies the possible values which an `enum` custom field can adopt. To modify the enum options, refer to [working with enum options](#enum-options).\n"
  },
  {
    "name": "precision",
    "type": "Integer",
    "example_values": [
      "2"
    ],
    "comment": "Only relevant for custom fields of type 'Number'. This field dictates the number of places after the decimal to round to, i.e. 0 is integer values, 1 rounds to the nearest tenth, and so on. Must be between 0 and 6, inclusive.\n"
  }
]
export = resourceBase;