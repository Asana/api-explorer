import resourceBase = require("./gen/custom_field_settings_base");
resourceBase.comment = "\nCustom fields are applied to a particular project or portfolio with the\nCustom Field Settings resource. This resource both represents the\nmany-to-many join of the Custom Field and Project or Portfolio as well as\nstores information that is relevant to that particular pairing; for instance,\nthe `is_important` property determines some possible application-specific\nhandling of that custom field and parent.\n";
resourceBase.properties = [
  {
    "name": "gid",
    "type": "Gid",
    "example_values": [
      "\"1234\""
    ],
    "comment": "Globally unique ID of the custom field settings object.\n"
  },
  {
    "name": "resource_type",
    "type": "Enum",
    "comment": "The resource type of this resource. The value for this resource is always `custom_field_setting`\n",
    "example_values": [
      "\"custom_field_setting\""
    ],
    "values": [
      {
        "name": "custom_field_setting",
        "comment": "A custom_field_setting resource type."
      }
    ]
  },
  {
    "name": "created_at",
    "type": "String",
    "example_values": [
      "'2012-02-22T02:06:58.147Z'"
    ],
    "comment": "The time at which this custom field setting was created.\n"
  },
  {
    "name": "is_important",
    "type": "Boolean",
    "example_values": [
      "false"
    ],
    "comment": "`is_important` is used in the Asana web application to determine if this\ncustom field is displayed in the task list (left pane) of a project. A\nproject can have a maximum of 5 custom field settings marked as\n`is_important`.\n"
  },
  {
    "name": "parent",
    "type": "String",
    "example_values": [
      "{id: 29485, gid: \"29485\", name: \"Marketing steps\", resource_type: \"project\"}",
      "{id: 36985, gid: \"36985\", name: \"Product launch\", resource_type: \"portfolio\"}"
    ],
    "comment": "The parent to which the custom field is applied. This can be a project\nor portfolio and indicates that the tasks or projects that the parent\ncontains may be given custom field values for this custom field.\n"
  },
  {
    "name": "custom_field",
    "type": "CustomField",
    "example_values": [
      "{ id: 1646, gid: \"1646\", name: 'Priority', type: 'enum' }"
    ],
    "comment": "The custom field that is applied to the `parent`.\n"
  }
];
export = resourceBase;