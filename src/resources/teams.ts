import resourceBase = require("./gen/teams_base");
resourceBase.comment = "A _team_ is used to group related projects and people together within an\norganization. Each project in an organization is associated with a team.\n";
resourceBase.properties = [
  {
    "name": "id",
    "type": "Id",
    "example_values": [
      "1234"
    ],
    "comment": "Globally unique ID of the team.\n**Note: This field is under active migration to the [`gid` field](#field-gid)--please see our [blog post](/developers/documentation/getting-started/deprecations) for more information.**\n"
  },
  {
    "name": "gid",
    "type": "Gid",
    "example_values": [
      "\"1234\""
    ],
    "comment": "Globally unique ID of the team.\n"
  },
  {
    "name": "resource_type",
    "type": "Enum",
    "comment": "The resource type of this resource. The value for this resource is always `team`.\n",
    "example_values": [
      "\"team\""
    ],
    "values": [
      {
        "name": "team",
        "comment": "A team resource type."
      }
    ]
  },
  {
    "name": "name",
    "type": "String",
    "example_values": [
      "'Engineering'"
    ],
    "comment": "The name of the team.\n"
  },
  {
    "name": "description",
    "type": "String",
    "example_values": [
      "'All developers should be members of this team.'"
    ],
    "comment": "[Opt In](/developers/documentation/getting-started/input-output-options). The description of the team.\n"
  },
  {
    "name": "html_description",
    "type": "String",
    "example_values": [
      "'&lt;body&gt;&lt;em&gt;All&lt;/em&gt; developers should be members of this team.&lt;/body&gt;'"
    ],
    "comment": "[Opt In](/developers/documentation/getting-started/input-output-options). The description of the team with formatting as HTML.\n"
  },
  {
    "name": "organization",
    "type": "Workspace",
    "example_values": [
      "{ id: 14916, gid: \"14916\", name: 'My Workspace' }"
    ],
    "comment": "The organization the team belongs to.\n"
  }
]

export = resourceBase;