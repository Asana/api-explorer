import resourceBase = require("./gen/tasks_base");
resourceBase.comment = "The _task_ is the basic object around which many operations in Asana are\ncentered. In the Asana application, multiple tasks populate the middle pane\naccording to some view parameters, and the set of selected tasks determines\nthe more detailed information presented in the details pane.\n";
resourceBase.properties = [
  {
    "name": "gid",
    "type": "Gid",
    "example_values": [
      "\"1234\""
    ],
    "comment": "Globally unique ID of the task.\n"
  },
  {
    "name": "resource_type",
    "type": "Enum",
    "comment": "The resource type of this resource. The value for this resource is always `task`.\n",
    "example_values": [
      "\"task\""
    ],
    "values": [
      {
        "name": "task",
        "comment": "A task resource type."
      }
    ]
  },
  {
    "name": "resource_subtype",
    "type": "Enum",
    "comment": "The type of task. Different subtypes of tasks retain many of the same fields and behavior, but may render differently in Asana or represent tasks with different semantic meaning.\n",
    "example_values": [
      "\"default_task\"",
      "\"milestone\"",
      "\"section\""
    ],
    "values": [
      {
        "name": "default_task",
        "comment": "A normal task."
      },
      {
        "name": "milestone",
        "comment": "A task that represents a milestone. A milestone marks a specific point in time and cannot have a start_date.\n"
      },
      {
        "name": "section",
        "comment": "\"**This value is under active migration—please see our [forum post](https://forum.asana.com/t/sections-are-dead-long-live-sections) for more information.**\"\n\nA task which represents a section in list projects - a task that ends in a colon and renders with a different style to visually group tasks together.\n"
      }
    ]
  },
  {
    "name": "assignee",
    "type": "User",
    "example_values": [
      "{ id: 12345, gid: \"12345\", resource_type: \"user\", name: 'Tim Bizarro' }",
      "null"
    ],
    "comment": "User to which this task is assigned, or `null` if the task is\nunassigned.\n"
  },
  {
    "name": "assignee_status",
    "type": "Enum",
    "example_values": [
      "\"inbox\"",
      "\"today\"",
      "\"upcoming\"",
      "\"later\""
    ],
    "values": [
      {
        "name": "inbox",
        "comment": "In the inbox."
      },
      {
        "name": "later",
        "comment": "Scheduled for _later_."
      },
      {
        "name": "upcoming",
        "comment": "Scheduled for _upcoming_."
      },
      {
        "name": "today",
        "comment": "Scheduled for _today_."
      }
    ],
    "comment": "Scheduling status of this task for the user it is assigned to. This field\ncan only be set if `assignee` is non-null. If the task has an assignee\nand `assignee_status` is null or not present, Asana will set\n`assignee_status` to `inbox`.\n"
  },
  {
    "name": "created_at",
    "type": "String",
    "example_values": [
      "'2012-02-22T02:06:58.147Z'"
    ],
    "comment": "The time at which this task was created.\n"
  },
  {
    "name": "completed",
    "type": "Boolean",
    "example_values": [
      "false"
    ],
    "comment": "True if the task is currently marked complete, false if not.\n"
  },
  {
    "name": "completed_at",
    "type": "String",
    "example_values": [
      "'2012-02-22T02:06:58.147Z'"
    ],
    "comment": "The time at which this task was completed, or null if the task is incomplete.\n"
  },
  {
    "name": "custom_fields",
    "type": "Array",
    "example_values": [
      "[ { id: 1646, gid: \"1646\", name: 'Priority', type: 'enum', enum_value: { id: 126, gid: \"126\", name: 'P1' } }, ...]"
    ],
    "comment": "Array of custom fields applied to the task. These custom fields represent\nthe values recorded on this task for a particular custom field. For\nexample, these fields will contain an `enum_value` property for custom\nfields of type `enum`, a `string_value` property for custom fields of\ntype `string`, and so on. Please note that the id returned on each custom\nfield value *is identical* to the id of the custom field, which allows\nreferencing the custom field metadata through the\n`/custom_fields/custom_field-id` endpoint.\n"
  },
  {
    "name": "dependencies",
    "type": "Resource",
    "example_values": [
      "[ { id: 1234, gid: \"1234\" }, ... ]"
    ],
    "comment": "[Opt In](/developers/documentation/getting-started/input-output-options). Array of resources referencing tasks that this task depends on. The objects contain only the ID of the dependency.\n"
  },
  {
    "name": "dependents",
    "type": "Resource",
    "example_values": [
      "[ { id: 1234, gid: \"1234\" }, ... ]"
    ],
    "comment": "[Opt In](/developers/documentation/getting-started/input-output-options).\nArray of resources referencing tasks that depend on this task. The objects\ncontain only the ID of the dependent.\n"
  },
  {
    "name": "due_on",
    "type": "String",
    "example_values": [
      "'2012-03-26'"
    ],
    "comment": "Date on which this task is due, or null if the task has no due date. This\ntakes a date with YYYY-MM-DD format and should not be used together with\n`due_at`.\n"
  },
  {
    "name": "due_at",
    "type": "String",
    "example_values": [
      "'2012-02-22T02:06:58.147Z'"
    ],
    "comment": "Date and time on which this task is due, or null if the task has no due\ntime. This takes a UTC timestamp and should not be used together with\n`due_on`.\n"
  },
  {
    "name": "external",
    "type": "Map",
    "example_values": [
      "{ id: 'my_id', data: 'A blob of information.' }"
    ],
    "comment": "*OAuth Required*. *Conditional*. This field is returned only if external values are set or included by using [Opt In] (#input-output-options). The external field allows you to store app-specific metadata on tasks, including a gid that can be used to retrieve tasks and a data blob that can store app-specific character strings. Note that you will need to authenticate with Oauth to access or modify this data. Once an external gid is set, you can use the notation `external:custom_gid` to reference your object anywhere in the API where you may use the original object gid. See the page on Custom External Data for more details."
  },
  {
    "name": "followers",
    "type": "Array",
    "example_values": [
      "[ { id: 1123, gid: \"1123\", resource_type: \"user\", name: 'Mittens' }, ... ]"
    ],
    "comment": "Array of users following this task.\n"
  },
  {
    "name": "is_rendered_as_separator",
    "type": "Boolean",
    "example_values": [
      "false"
    ],
    "comment": "[Opt In](/developers/documentation/getting-started/input-output-options). In some contexts tasks can be rendered as a visual separator; for instance, subtasks can appear similar to [sections](/developers/api-reference/sections) without being true `section` objects. If a `task` object is rendered this way in any context it will have the property `is_rendered_as_separator` set to `true`.<br /><br />**Note:** Until the default behavior for our API changes integrations must [opt in to the `new_sections` change](https://forum.asana.com/t/sections-are-dead-long-live-sections/33951) to modify the `is_rendered_as_separator` property.\n"
  },
  {
    "name": "liked",
    "type": "Boolean",
    "example_values": [
      "false"
    ],
    "comment": "True if the task is liked by the authorized user, false if not.\n"
  },
  {
    "name": "likes",
    "type": "Array",
    "example_values": [
      "[ { id: 1123, gid: \"1123\", resource_type: \"user\", name: 'Mittens' }, ... ]"
    ],
    "comment": "Array of users who have liked this task.\n"
  },
  {	
    "name": "memberships",	
    "type": "Array",	
    "example_values": [	
      "[ { project: { id: 1331, gid: \"1331\", name: 'Bugs' }, section: { id: 1123, gid: \"1123\", name: 'P1:' } }, ... ]"	
    ],	
    "comment": "Array of projects this task is associated with and the section it is in.\nAt task creation time, this array can be used to add the task to specific\nsections. After task creation, these associations can be modified using\nthe `addProject` and `removeProject` endpoints. Note that over time, more\ntypes of memberships may be added to this property.\n"	
  },
  {
    "name": "modified_at",
    "type": "String",
    "example_values": [
      "'2012-02-22T02:06:58.147Z'"
    ],
    "comment": "The time at which this task was last modified.\n",
  },
  {
    "name": "name",
    "type": "String",
    "example_values": [
      "'Buy catnip'"
    ],
    "comment": "Name of the task. This is generally a short sentence fragment that fits\non a line in the UI for maximum readability. However, it can be longer.\n"
  },
  {
    "name": "notes",
    "type": "String",
    "example_values": [
      "'Mittens really likes the stuff from Humboldt.'"
    ],
    "comment": "More detailed, free-form textual information associated with the task.\n"
  },
  {
    "name": "html_notes",
    "type": "String",
    "example_values": [
      "'&lt;body&gt;Mittens &lt;em&gt;really&lt;/em&gt; likes the stuff from Humboldt.&lt;/body&gt;'"
    ],
    "comment": "[Opt In](/developers/documentation/getting-started/input-output-options). The notes of the text with formatting as HTML.\n"
  },
  {
    "name": "num_likes",
    "type": "Integer",
    "example_values": [
      "5"
    ],
    "comment": "The number of users who have liked this task.\n"
  },
  {
    "name": "num_subtasks",
    "type": "Integer",
    "example_values": [
      "5"
    ],
    "comment": "[Opt In](/developers/documentation/getting-started/input-output-options). The number of subtasks on this task.\n"
  },
  {
    "name": "parent",
    "type": "Task",
    "example_values": [
      "{ id: 1234, gid: \"1234\", name: 'Bug task' }"
    ],
    "comment": "The parent of this task, or `null` if this is not a subtask. This property\ncannot be modified using a PUT request but you can change it with the\n`setParent` endpoint. You can create subtasks by using the subtasks endpoint.\n"
  },
  {
    "name": "projects",
    "type": "Array",
    "example_values": [
      "[ { id: 1331, gid: \"1331\", name: 'Stuff to Buy' }, ... ]"
    ],
    "comment": "Array of projects this task is associated with. At task creation time,\nthis array can be used to add the task to many projects at once. After\ntask creation, these associations can be modified using the `addProject`\nand `removeProject` endpoints.\n"
  },
  {
    "name": "start_on",
    "type": "String",
    "example_values": [
      "'2012-03-26'"
    ],
    "comment": "Date on which this task is due, or null if the task has no start date. This\nfield takes a date with YYYY-MM-DD format.<br><br>**Note:** `due_on` or\n`due_at` must be present in the request when setting or unsetting the\n`start_on` parameter.\n"
  },
  {
    "name": "workspace",
    "type": "Workspace",
    "example_values": [
      "{ id: 14916, gid: \"14916\", name: 'My Workspace' }"
    ],
    "comment": "The workspace this task is associated with. Once created, task cannot be\nmoved to a different workspace. This attribute can only be specified at\ncreation time.\n"
  },
  {
    "name": "tags",
    "type": "Array",
    "example_values": [
      "[ { id: 59746, gid:\"59746\", name: 'Grade A' }, ... ]"
    ],
    "comment": "Array of tags associated with this task. This property may be specified on\ncreation using just an array of tag IDs. In order to change tags on an\nexisting task use `addTag` and `removeTag`.\n"
  }
]

export = resourceBase;