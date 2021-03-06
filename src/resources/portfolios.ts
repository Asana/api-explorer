import resourceBase = require("./gen/portfolios_base");
resourceBase.comment = "A _portfolio_ gives a high-level overview of the status of multiple\ninitiatives in Asana.  Portfolios provide a dashboard overview of the state\nof multiple items, including a progress report and the most recent\n[project status](/developers/api-reference/project_statuses) update.\n\nPortfolios have some restrictions on size. Each portfolio has a maximum of 250\nitems and, like projects, a maximum of 20 custom fields.\n";
resourceBase.properties = [
  {
    "name": "gid",
    "type": "Gid",
    "example_values": [
      "\"1234\""
    ],
    "comment": "Globally unique ID of the portfolio.\n"
  },
  {
    "name": "resource_type",
    "type": "Enum",
    "comment": "The resource type of this resource. The value for this resource is always `portfolio`.\n",
    "example_values": [
      "\"portfolio\""
    ],
    "values": [
      {
        "name": "portfolio",
        "comment": "A portfolio resource type."
      }
    ]
  },
  {
    "name": "name",
    "type": "String",
    "example_values": [
      "\"Product launch\""
    ],
    "comment": "Name of the portfolio.\n"
  },
  {
    "name": "owner",
    "type": "Struct",
    "example_values": [
      "{ id: 12345, gid: \"12345\", resource_type: \"user\", name: 'Tim Bizarro' }"
    ],
    "comment": "The current owner of the portfolio. Cannot be null.\n"
  },
  {
    "name": "created_at",
    "type": "String",
    "example_values": [
      "'2012-02-22T02:06:58.147Z'"
    ],
    "comment": "The time at which this portfolio was created.\n"
  },
  {
    "name": "created_by",
    "type": "User",
    "example_values": [
      "{ id: 12345, gid: \"12345\", resource_type: \"user\", name: 'Tim Bizarro' }",
      "null"
    ],
    "comment": "The user that created the portfolio.\n"
  },
  {
    "name": "custom_field_settings",
    "type": "Array",
    "example_values": [
      "[ { id: 258147, gid: \"258147\", custom_field: {id: 1646, gid: \"1646\", name: \"Priority\", type: \"enum\"}, parent: {id: 36985, gid: \"36985\", name: \"Product launch\"} }, ...]"
    ],
    "comment": "Array of custom field settings applied to the portfolio.\n"
  },
  {
    "name": "color",
    "type": "String",
    "example_values": [
      "\"dark-red\"",
      "\"light-blue\"",
      "\"none\""
    ],
    "comment": "Must be either `none` or one of: `dark-pink`, `dark-green`, `dark-blue`,\n`dark-red`, `dark-teal`, `dark-brown`, `dark-orange`, `dark-purple`,\n`dark-warm-gray`, `light-pink`, `light-green`, `light-blue`, `light-red`,\n`light-teal`, `light-yellow`, `light-orange`, `light-purple`,\n`light-warm-gray`.\n"
  },
  {
    "name": "workspace",
    "type": "Workspace",
    "example_values": [
      "{ id: 14916, gid: \"14916\", name: 'My Workspace' }"
    ],
    "comment": "The workspace or organization that the portfolio belongs to.\n"
  },
  {
    "name": "members",
    "type": "Array",
    "example_values": [
      "[ { id: 1123, gid: \"1123\", resource_type: \"user\", name: 'Mittens' }, ... ]"
    ],
    "comment": "Members of the portfolio.\n"
  }
];
export = resourceBase;