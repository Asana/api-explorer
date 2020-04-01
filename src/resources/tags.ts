import resourceBase = require("./gen/tags_base");
resourceBase.comment = "A _tag_ is a label that can be attached to any task in Asana. It exists in a\nsingle workspace or organization.\n\nTags have some metadata associated with them, but it is possible that we will\nsimplify them in the future so it is not encouraged to rely too heavily on it.\nUnlike projects, tags do not provide any ordering on the tasks they\nare associated with.\n";
resourceBase.properties = [
  {
    "name": "id",
    "type": "Id",
    "example_values": [
      "1234"
    ],
    "comment": "Globally unique ID of the tag.\n**Note: This field is under active migration to the [`gid` field](#field-gid)--please see our [blog post](/developers/documentation/getting-started/deprecations) for more information.**\n"
  },
  {
    "name": "gid",
    "type": "Gid",
    "example_values": [
      "\"1234\""
    ],
    "comment": "Globally unique ID of the tag.\n"
  },
  {
    "name": "resource_type",
    "type": "Enum",
    "comment": "The resource type of this resource. The value for this resource is always `tag`.\n",
    "example_values": [
      "\"tag\""
    ],
    "values": [
      {
        "name": "tag",
        "comment": "A tag resource type."
      }
    ]
  },
  {
    "name": "created_at",
    "type": "String",
    "example_values": [
      "'2012-02-22T02:06:58.147Z'"
    ],
    "comment": "The time at which this tag was created.\n"
  },
  {
    "name": "followers",
    "type": "Array",
    "example_values": [
      "[ { id: 1123, gid: \"1123\", resource_type: \"user\", name: 'Mittens' }, ... ]"
    ],
    "comment": "Array of users following this tag.\n"
  },
  {
    "name": "name",
    "type": "String",
    "example_values": [
      "'Stuff to buy'"
    ],
    "comment": "Name of the tag. This is generally a short sentence fragment that fits\non a line in the UI for maximum readability. However, it can be longer.\n"
  },
  {
    "name": "color",
    "type": "Enum",
    "example_values": [
      "'dark-purple'"
    ],
    "comment": "Color of the tag. Must be either `null` or one of: `dark-pink`,\n`dark-green`, `dark-blue`, `dark-red`, `dark-teal`, `dark-brown`,\n`dark-orange`, `dark-purple`, `dark-warm-gray`, `light-pink`, `light-green`,\n`light-blue`, `light-red`, `light-teal`, `light-yellow`, `light-orange`,\n`light-purple`, `light-warm-gray`.\n"
  },
  {
    "name": "workspace",
    "type": "Workspace",
    "example_values": [
      "{ id: 14916, gid: \"14916\", name: 'My Workspace' }"
    ],
    "comment": "The workspace or organization this tag is associated with. Once created,\ntags cannot be moved to a different workspace. This attribute can only\nbe specified at creation time.\n"
  }
];

export = resourceBase;