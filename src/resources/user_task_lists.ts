import resourceBase = require("./gen/user_task_lists_base");
resourceBase.comment = "A _user task list_ represents the tasks assigned to a particular user. It provides API access to a user's \"My Tasks\" view in Asana.\n\nA user's \"My Tasks\" represent all of the tasks assigned to that user. It is\nvisually divided into regions based on the task's\n[`assignee_status`](/developers/api-reference/tasks#field-assignee_status)\nfor Asana users to triage their tasks based on when they can address them.\nWhen building an integration it's worth noting that tasks with due dates will\nautomatically move through `assignee_status` states as their due dates\napproach; read up on [task\nauto-promotion](/guide/help/fundamentals/my-tasks#gl-auto-promote) for more\ninfomation.\n";
resourceBase.properties = [
  {
    "name": "gid",
    "type": "Gid",
    "example_values": [
      "\"1234\""
    ],
    "comment": "Globally unique ID of the user task list.\n"
  },
  {
    "name": "resource_type",
    "type": "Enum",
    "comment": "The resource type of this resource. The value for this resource is always `user_task_list`.\n",
    "example_values": [
      "\"user_task_list\""
    ],
    "values": [
      {
        "name": "user_task_list",
        "comment": "A user_task_list resource type."
      }
    ]
  },
  {
    "name": "name",
    "type": "String",
    "example_values": [
      "\"My Tasks\""
    ],
    "comment": "The name of the user task list.\n",
  },
  {
    "name": "owner",
    "type": "User",
    "example_values": [
      "{ id: 12345, gid: \"12345\", resource_type: \"user\", name: 'Tim Bizarro' }",
      "null"
    ],
    "comment": "The owner of the user task list, i.e. the person whose My Tasks is represented by this resource.\n",
  },
  {
    "name": "workspace",
    "type": "Workspace",
    "example_values": [
      "{ id: 14916, gid: \"14916\", name: 'My Workspace' }"
    ],
    "comment": "The workspace in which the user task list is located.\n"
  }
];
export = resourceBase;
