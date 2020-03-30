import resourceBase = require("../../../resources/gen/workspaces_base");
let resource = resourceBase;
resource.comment = "A _workspace_ is the highest-level organizational unit in Asana. All projects\nand tasks have an associated workspace.\n\nAn _organization_ is a special kind of workspace that represents a company.\nIn an organization, you can group your projects into teams. You can read\nmore about how organizations work on the Asana Guide.\nTo tell if your workspace is an organization or not, check its\n`is_organization` property.\n\nOver time, we intend to migrate most workspaces into organizations and to\nrelease more organization-specific functionality. We may eventually deprecate\nusing workspace-based APIs for organizations. Currently, and until after\nsome reasonable grace period following any further announcements, you can\nstill reference organizations in any `workspace` parameter.\n";
resource.properties = [
  {
    "name": "id",
    "type": "Id",
    "example_values": [
      "1234"
    ],
    "comment": "Globally unique ID of the workspace.\n**Note: This field is under active migration to the [`gid` field](#field-gid)--please see our [blog post](/developers/documentation/getting-started/deprecations) for more information.**\n"
  },
  {
    "name": "gid",
    "type": "Gid",
    "example_values": [
      "\"1234\""
    ],
    "comment": "Globally unique ID of the workspace.\n"
  },
  {
    "name": "resource_type",
    "type": "Enum",
    "comment": "The resource type of this resource. The value for this resource is always `workspace`.\n",
    "example_values": [
      "\"workspace\""
    ],
    "values": [
      {
        "name": "workspace",
        "comment": "A workspace resource type."
      }
    ]
  },
  {
    "name": "name",
    "type": "String",
    "example_values": [
      "'My Favorite Workspace'"
    ],
    "comment": "The name of the workspace.\n"
  },
  {
    "name": "is_organization",
    "type": "Boolean",
    "example_values": [
      "false"
    ],
    "comment": "Whether the workspace is an _organization_.\n"
  }
];

export = resource;