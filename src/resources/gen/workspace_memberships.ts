import resourceBase = require("../../../resources/gen/workspace_memberships_base");
let resource = resourceBase
resource.comment = "This object determines if a user is a member of a workspace.\n";
resource.properties = [
  {
    "name": "gid",
    "type": "Gid",
    "example_values": [
      "\"1234\""
    ],
    "comment": "Globally unique ID of the workspace membership.\n"
  },
  {
    "name": "resource_type",
    "type": "Enum",
    "comment": "The resource type of this resource. The value for this resource is always `workspace_membership`.\n",
    "example_values": [
      "\"workspace_membership\""
    ],
    "values": [
      {
        "name": "workspace_membership",
        "comment": "A workspace membership resource type."
      }
    ]
  },
  {
    "name": "user",
    "type": "User",
    "example_values": [
      "{ id: 12345, gid: \"12345\", name: \"Tim Bizarro\" }"
    ],
    "comment": "The user in the membership.\n"
  },
  {
    "name": "workspace",
    "type": "Workspace",
    "example_values": [
      "{ id: 14916, gid: \"14916\", name: 'My Workspace' }"
    ],
    "comment": "The workspace the user is a member of.\n"
  },
  {
    "name": "user_task_list",
    "type": "UserTaskList",
    "example_values": [
      "{ gid: \"12345\", resource_type: \"user_task_list\", name: 'My Tasks' }"
    ],
    "comment": "The user's \"My Tasks\" in the workspace.\n"
  },
  {
    "name": "is_active",
    "type": "Boolean",
    "example_values": [
      "false"
    ],
    "comment": "Reflects if this user still a member of the workspace.\n"
  },
  {
    "name": "is_admin",
    "type": "Boolean",
    "example_values": [
      "false"
    ],
    "comment": "Reflects if this user is an admin of the workspace.\n"
  },
  {
    "name": "is_guest",
    "type": "Boolean",
    "example_values": [
      "false"
    ],
    "comment": "Reflects if this user is a guest of the workspace.\n"
  }
]

export = resource;