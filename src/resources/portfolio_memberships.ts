import resourceBase = require("./gen/portfolio_memberships_base");
resourceBase.comment = "This object determines if a user is a member of a portfolio.\n"
resourceBase.properties = [
  {
    "name": "id",
    "type": "Id",
    "example_values": [
      "1234"
    ],
    "comment": "Globally unique ID of the portfolio membership.\n**Note: This field is under active migration to the [`gid` field](#field-gid)--please see our [blog post](/developers/documentation/getting-started/deprecations) for more information.**\n"
  },
  {
    "name": "gid",
    "type": "Gid",
    "example_values": [
      "\"1234\""
    ],
    "comment": "Globally unique ID of the portfolio membership.\n"
  },
  {
    "name": "resource_type",
    "type": "Enum",
    "comment": "The resource type of this resource. The value for this resource is always `portfolio_membership`.\n",
    "example_values": [
      "\"portfolio_membership\""
    ],
    "values": [
      {
        "name": "portfolio_membership",
        "comment": "A portfolio membership resource type."
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
    "name": "portfolio",
    "type": "Project",
    "example_values": [
      "{ id: 1234, gid: \"1234\", name: 'Progress Tracking' }"
    ],
    "comment": "[Opt In](https://asana.com/developers/documentation/getting-started/input-output-options). The portfolio the user is a member of.\n"
  }
] 

export = resourceBase;