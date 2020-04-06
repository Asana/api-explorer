import resourceBase = require("./gen/users_base");
resourceBase.comment = "A _user_ object represents an account in Asana that can be given access to\nvarious workspaces, projects, and tasks.\n\nLike other objects in the system, users are referred to by numerical IDs.\nHowever, the special string identifier `me` can be used anywhere\na user ID is accepted, to refer to the current authenticated user.\n";
resourceBase.properties = [
  {
    "name": "gid",
    "type": "Gid",
    "example_values": [
      "\"1234\""
    ],
    "comment": "Globally unique ID of the user.\n"
  },
  {
    "name": "resource_type",
    "type": "Enum",
    "comment": "The resource type of this resource. The value for this resource is always `user`.\n",
    "example_values": [
      "\"user\""
    ],
    "values": [
      {
        "name": "user",
        "comment": "A user resource type."
      }
    ]
  },
  {
    "name": "name",
    "type": "String",
    "example_values": [
      "'Greg Sanchez'"
    ],
    "comment": "The user's name.\n"
  },
  {
    "name": "email",
    "type": "String",
    "example_values": [
      "'gsanchez@example.com'"
    ],
    "comment": "The user's email address.\n"
  },
  {
    "name": "photo",
    "type": "Struct",
    "example_values": [
      "{ 'image_21x21': 'https://...', ... }"
    ],
    "comment": "A map of the user's profile photo in various sizes, or `null` if no photo\nis set. Sizes provided are 21, 27, 36, 60, and 128. Images are in\nPNG format.\n"
  },
  {
    "name": "workspaces",
    "type": "Array",
    "example_values": [
      "[ { id: 14916, gid:\"14916\" name: 'My Workspace' }, ... ]"
    ],
    "comment": "Workspaces and organizations this user may access.\n",
  }
];

export = resourceBase;