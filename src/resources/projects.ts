import resourceBase = require("./gen/projects_base");
resourceBase.comment = "A _project_ represents a prioritized list of tasks in Asana or a board with\ncolumns of tasks represented as cards. It exists in a single workspace or\norganization and is accessible to a subset of users in that workspace or\norganization, depending on its permissions.\n\nProjects in organizations are shared with a single team. You cannot currently\nchange the team of a project via the API. Non-organization workspaces do not\nhave teams and so you should not specify the team of project in a regular\nworkspace.\n";
resourceBase.properties = [
  {
    "name": "gid",
    "type": "Gid",
    "example_values": [
      "\"1234\""
    ],
    "comment": "Globally unique ID of the project.\n"
  },
  {
    "name": "resource_type",
    "type": "Enum",
    "comment": "The resource type of this resource. The value for this resource is always `project`. To distinguish between board and list projects see the `layout` property.\n",
    "example_values": [
      "\"project\""
    ],
    "values": [
      {
        "name": "project",
        "comment": "A project resource type."
      }
    ]
  },
  {
    "name": "name",
    "type": "String",
    "example_values": [
      "'Stuff to buy'"
    ],
    "comment": "Name of the project. This is generally a short sentence fragment that fits\non a line in the UI for maximum readability. However, it can be longer.\n"
  },
  {
    "name": "owner",
    "type": "User",
    "example_values": [
      "{ id: 12345, gid: \"12345\", resource_type: \"user\", name: 'Tim Bizarro' }",
      "null"
    ],
    "comment": "The current owner of the project, may be null.\n"
  },
  {
    "name": "current_status",
    "type": "Struct",
    "example_values": [
      "{ 'color': 'green', 'title': 'Status Update - Jun 15', ... } "
    ],
    "comment": "The most recently created status update for the project, or `null` if no update exists. See also the\ndocumentation for [project status updates](/developers/api-reference/project_statuses).\n"
  },
  {
    "name": "due_on",
    "type": "String",
    "example_values": [
      "'2012-03-26'"
    ],
    "comment": "The day on which this project is due. This takes a date with format YYYY-MM-DD.\n"
  },
  {
    "name": "start_on",
    "type": "String",
    "example_values": [
      "'2012-03-26'"
    ],
    "comment": "The day on which this project starts. This takes a date with format YYYY-MM-DD.\n"
  },
  {
    "name": "created_at",
    "type": "String",
    "example_values": [
      "'2012-02-22T02:06:58.147Z'"
    ],
    "comment": "The time at which this project was created.\n"
  },
  {
    "name": "modified_at",
    "type": "String",
    "example_values": [
      "'2012-02-22T02:06:58.147Z'"
    ],
    "comment": "The time at which this project was last modified.\n",
  },
  {
    "name": "archived",
    "type": "Boolean",
    "example_values": [
      "false"
    ],
    "comment": "True if the project is archived, false if not. Archived projects do not\nshow in the UI by default and may be treated differently for queries.\n"
  },
  {
    "name": "public",
    "type": "Boolean",
    "example_values": [
      "false"
    ],
    "comment": "True if the project is public to the organization. If false, do not share this project with other users in this organization without explicitly checking to see if they have access."
  },
  {
    "name": "members",
    "type": "Array",
    "example_values": [
      "[ { id: 1123, gid: \"1123\", resource_type: \"user\", name: 'Mittens' }, ... ]"
    ],
    "comment": "Array of users who are members of this project.\n"
  },
  {
    "name": "followers",
    "type": "Array",
    "example_values": [
      "[ { id: 1123, gid: \"1123\", resource_type: \"user\", name: 'Mittens' }, ... ]"
    ],
    "comment": "Array of users following this project. Followers are a subset of members who receive all notifications for a\nproject, the default notification setting when adding members to a project in-product.\n"
  },
  {
    "name": "custom_fields",
    "type": "Array",
    "example_values": [
      "[ { id: 1646, gid: \"1646\", name: 'Priority', type: 'enum', enum_value: { id: 126, gid: \"126\", name: 'P1' } }, ...]"
    ],
    "comment": "Array of custom field values set on the project for a custom field applied to a parent portfolio. Take care to avoid confusing these custom field values with the custom field settings in the [custom_field_settings](#field-custom_field_settings) property. Please note that the `gid` returned on each custom field value is identical to the `gid` of the custom field, which allows referencing the custom field through the [/custom_fields/{custom_field_gid}](/developers/api-reference/custom_fields#get-single) endpoint.\n"
  },
  {
    "name": "custom_field_settings",
    "type": "Array",
    "example_values": [
      "[ { id: 258147, gid: \"258147\", custom_field: {id: 1646, gid: \"1646\", name: 'Priority', type: 'enum'}, project: {id: 13309, gid: \"13309\", name: 'Bugs'} }, ...]"
    ],
    "comment": "Array of custom field settings in compact form. These represent the association of custom fields with this project. Take care to avoid confusing these custom field settings with the custom field values in the [custom_fields](#field-custom_fields) property.\n"
  },
  {
    "name": "color",
    "type": "Enum",
    "example_values": [
      "'dark-purple'"
    ],
    "comment": "Color of the project. Must be either `null` or one of: `dark-pink`,\n`dark-green`, `dark-blue`, `dark-red`, `dark-teal`, `dark-brown`,\n`dark-orange`, `dark-purple`, `dark-warm-gray`, `light-pink`, `light-green`,\n`light-blue`, `light-red`, `light-teal`, `light-yellow`, `light-orange`,\n`light-purple`, `light-warm-gray`.\n"
  },
  {
    "name": "notes",
    "type": "String",
    "example_values": [
      "'These are things we need to purchase.'"
    ],
    "comment": "More detailed, free-form textual information associated with the project.\n"
  },
  {
    "name": "html_notes",
    "type": "String",
    "example_values": [
      "'&lt;body&gt;Get whatever &lt;a href='https://app.asana.com/0/1123/list'&gt;Sashimi&lt;/a&gt; has.&lt;/body&gt;'"
    ],
    "comment": "[Opt In](https://asana.com/developers/documentation/getting-started/input-output-options). The notes of the project with formatting as HTML.\n"
  },
  {
    "name": "workspace",
    "type": "Workspace",
    "example_values": [
      "{ id: 14916, gid: \"14916\", name: 'My Workspace' }"
    ],
    "comment": "The workspace or organization this project is associated with. Once created,\nprojects cannot be moved to a different workspace. This attribute can only\nbe specified at creation time.\n"
  },
  {
    "name": "team",
    "type": "Team",
    "example_values": [
      "{ id: 692353, gid: \"692353\", name: 'organization.com Marketing' }"
    ],
    "comment": "The team that this project is shared with. This field only exists for\nprojects in organizations.\n"
  },
  {
    "name": "layout",
    "type": "Enum",
    "example_values": [
      "'board'",
      "'list'"
    ],
    "comment": "The layout (board or list view) of the project.\n"
  }
]

export = resourceBase;