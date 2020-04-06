import resourceBase = require("./gen/project_statuses_base");
resourceBase.comment = "A _project status_ is an update on the progress of a particular project, and is sent out to all project\nfollowers when created. These updates include both text describing the update and a color code intended to\nrepresent the overall state of the project: \"green\" for projects that are on track, \"yellow\" for projects\nat risk, and \"red\" for projects that are behind.\n\nProject statuses can be created and deleted, but not modified.\n";
resourceBase.properties = [
  {
    "name": "gid",
    "type": "Gid",
    "example_values": [
      "\"1234\""
    ],
    "comment": "Globally unique ID of the project status update.\n"
  },
  {
    "name": "resource_type",
    "type": "Enum",
    "comment": "The resource type of this resource. The value for this resource is always `project_status`.\n",
    "example_values": [
      "\"project_status\""
    ],
    "values": [
      {
        "name": "project_status",
        "comment": "A project status resource type."
      }
    ]
  },
  {
    "name": "title",
    "type": "String",
    "comment": "The title of the project status update.\n",
    "example_values": [
      "'Status Update - Jun 15'"
    ]
  },
  {
    "name": "text",
    "type": "String",
    "comment": "The text content of the status update.\n",
    "example_values": [
      "'The project is moving forward according to plan...'"
    ]
  },
  {
    "name": "color",
    "type": "Enum",
    "comment": "The color associated with the status update.\n",
    "example_values": [
      "'green'",
      "'yellow'",
      "'red'"
    ]
  },
  {
    "name": "created_by",
    "type": "User",
    "example_values": [
      "{ id: 12345, name: 'Tim Bizarro' }"
    ],
    "comment": "The creator of the status update.\n"
  },
  {
    "name": "created_at",
    "type": "String",
    "example_values": [
      "'2012-02-22T02:06:58.147Z'"
    ],
    "comment": "The time at which the status update was created.\n"
  }
]

export = resourceBase;