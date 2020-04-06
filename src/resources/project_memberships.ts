import resourceBase = require("./gen/project_memberships_base");
resourceBase.comment = "With the introduction of \"comment-only\" projects in Asana, a user's membership\nin a project comes with associated permissions. These permissions (whether a\nuser has full access to the project or comment-only access) are accessible\nthrough the project memberships endpoints described here.\n";
resourceBase.properties = [
  {
    "name": "gid",
    "type": "Gid",
    "example_values": [
      "\"1234\""
    ],
    "comment": "Globally unique ID of the project membership.\n"
  },
  {
    "name": "resource_type",
    "type": "Enum",
    "comment": "The resource type of this resource. The value for this resource is always `project_membership`.\n",
    "example_values": [
      "\"project_membership\""
    ],
    "values": [
      {
        "name": "project_membership",
        "comment": "A project membership resource type."
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
    "name": "project",
    "type": "Project",
    "example_values": [
      "{ id: 1234, gid: \"1234\", name: 'Bugs' }"
    ],
    "comment": "[Opt In](https://asana.com/developers/documentation/getting-started/input-output-options). The project the user is a member of.\n"
  },
  {
    "name": "write_access",
    "type": "Enum",
    "example_values": [
      "'full_write'",
      "'comment_only'"
    ],
    "comment": "Whether the user has full access to the project or has comment-only access.\n"
  }
]

export = resourceBase;