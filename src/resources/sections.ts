import resourceBase = require("./gen/sections_base");
resourceBase.comment = "A _section_ is a subdivision of a project that groups tasks together. It can\neither be a header above a list of tasks in a list view or a column in a\nboard view of a project.\n";
resourceBase.properties = [
  {
    "name": "gid",
    "type": "Gid",
    "example_values": [
      "\"1234\""
    ],
    "comment": "Globally unique ID of the section.\n"
  },
  {
    "name": "resource_type",
    "type": "Enum",
    "comment": "The resource type of this resource. The value for this resource is always `section`.\n",
    "example_values": [
      "\"section\""
    ],
    "values": [
      {
        "name": "section",
        "comment": "A section resource type."
      }
    ]
  },
  {
    "name": "name",
    "type": "String",
    "example_values": [
      "'Next Actions'"
    ],
    "comment": "The name of the section (i.e. the text displayed as the section header).\n"
  },
  {
    "name": "project",
    "type": "Project",
    "example_values": [
      "{ id: 1234, gid: \"1234\", name: 'Bugs' }"
    ],
    "comment": "The project which contains the section.\n"
  },
  {
    "name": "created_at",
    "type": "String",
    "example_values": [
      "'2012-02-22T02:06:58.147Z'"
    ],
    "comment": "The time at which the section was created.\n"
  }
]
export = resourceBase;
