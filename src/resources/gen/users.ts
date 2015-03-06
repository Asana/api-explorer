/* tslint:disable */

// TODO: Add type information from asana_json.d.ts
var json = {
  "templates": [
    {
      "template": {
        "value": 200,
        "comment": "Success.\n"
      }
    },
    {
      "template": {
        "type": "String",
        "example_values": [
          "'2012-02-22T02:06:58.158Z'",
          "now"
        ]
      }
    },
    {
      "template": [
        {
          "type": "Boolean",
          "example_values": [
            "false"
          ]
        }
      ]
    },
    {
      "template": {
        "type": "Id",
        "example_values": [
          "12345"
        ]
      }
    },
    {
      "template": {
        "type": "Array",
        "example_values": [
          "[133713, 184253]"
        ]
      }
    },
    {
      "template": {
        "type": "Id",
        "example_values": [
          "13579"
        ],
        "comment": "Globally unique identifier for the project.\n"
      }
    },
    {
      "template": {
        "type": "Id",
        "example_values": [
          "11235"
        ],
        "comment": "Globally unique identifier for the tag.\n"
      }
    },
    {
      "template": {
        "type": "Id",
        "example_values": [
          "124816"
        ],
        "comment": "Globally unique identifier for the task.\n"
      }
    },
    {
      "template": {
        "type": "Id",
        "example_values": [
          "14641"
        ],
        "comment": "Globally unique identifier for the user.\n"
      }
    },
    {
      "template": {
        "type": "Id",
        "example_values": [
          "1331"
        ],
        "comment": "Globally unique identifier for the workspace or organization.\n"
      }
    },
    {
      "template": {
        "type": "Id",
        "example_values": [
          "12357"
        ],
        "comment": "Globally unique identifier for the attachment.\n"
      }
    },
    {
      "template": {
        "type": "Id",
        "example_values": [
          "14916"
        ],
        "comment": "Globally unique identifier for the team.\n"
      }
    },
    {
      "template": {
        "type": "Id",
        "example_values": [
          "182764"
        ],
        "comment": "Globally unique identifier for the team.\n"
      }
    },
    {
      "template": [
        {
          "type": "Id",
          "example_values": [
            "1234"
          ],
          "read_only": true,
          "comment": "Globally unique identifier for this object.\n"
        }
      ]
    },
    {
      "template": [
        {
          "type": "String",
          "example_values": [
            "'gsanchez@example.com'"
          ]
        }
      ]
    },
    {
      "template": [
        {
          "type": "Boolean",
          "example_values": [
            "false"
          ]
        }
      ]
    },
    {
      "template": [
        {
          "type": "User",
          "example_values": [
            "{ id: 1234, name: 'Tim Bizarro' }",
            "null"
          ]
        }
      ]
    },
    {
      "template": {
        "type": "Enum",
        "example_values": [
          "'upcoming'"
        ],
        "values": [
          {
            "name": "inbox",
            "comment": "In the inbox."
          },
          {
            "name": "later",
            "comment": "Scheduled for _later_."
          },
          {
            "name": "upcoming",
            "comment": "Scheduled for _upcoming_."
          },
          {
            "name": "today",
            "comment": "Scheduled for _today_."
          }
        ]
      }
    },
    {
      "template": {
        "method": "POST",
        "path": "/tasks/%d/stories",
        "params": [
          {
            "name": "task",
            "type": "Id",
            "example_values": [
              "124816"
            ],
            "comment": "Globally unique identifier for the task.\n",
            "required": true
          },
          {
            "name": "text",
            "type": "String",
            "required": true,
            "comment": "The plain text of the comment to add."
          }
        ],
        "comment": "Adds a comment to a task. The comment will be authored by the\ncurrently authenticated user, and timestamped when the server receives\nthe request.\n\nReturns the full record for the new story added to the task.\n"
      }
    }
  ],
  "name": "user",
  "comment": "A _user_ object represents an account in Asana that can be given access to\nvarious workspaces, projects, and tasks.\n\nLike other objects in the system, users are referred to by numerical IDs.\nHowever, the special string identifier `me` can be used anywhere\na user ID is accepted, to refer to the current authenticated user.\n",
  "properties": [
    {
      "name": "id",
      "type": "Id",
      "example_values": [
        "1234"
      ],
      "read_only": true,
      "comment": "Globally unique identifier for this object.\n"
    },
    {
      "name": "email",
      "type": "String",
      "example_values": [
        "'gsanchez@example.com'"
      ],
      "read_only": true,
      "comment": "The user's email address.\n"
    },
    {
      "name": "photo",
      "type": "Struct",
      "example_values": [
        "{ \"image_21x21\": \"https://...\", ... }"
      ],
      "read_only": true,
      "comment": "A map of the user's profile photo in various sizes, or null if no photo\nis set. Sizes provided are 21, 27, 36, 60, and 128. Images are in\nPNG format.\n"
    },
    {
      "name": "workspaces",
      "type": "Array",
      "example_values": [
        "[ { id: 14916, name: \"My Workspace\"} ... ]"
      ],
      "read_only": true,
      "comment": "Workspaces and organizations this user may access.\n",
      "notes": [
        "The API will only return workspaces and organizations that also contain the authenticated user."
      ]
    }
  ],
  "actions": [
    {
      "name": "me",
      "method": "GET",
      "path": "/users/me",
      "comment": "Returns the full user record for the currently authenticated user.\n"
    },
    {
      "name": "findById",
      "method": "GET",
      "path": "/users/%d",
      "params": [
        {
          "name": "user",
          "type": "Id",
          "example_values": [
            "14641"
          ],
          "comment": "Globally unique identifier for the user.\n",
          "required": true
        }
      ],
      "comment": "Returns the full user record for a single user.\n"
    },
    {
      "name": "findByWorkspace",
      "method": "GET",
      "path": "/workspaces/%d/users",
      "collection": true,
      "params": [
        {
          "name": "workspace",
          "type": "Id",
          "example_values": [
            "1331"
          ],
          "comment": "The workspace in which to get users.",
          "required": true
        }
      ],
      "comment": "Returns the user records for all users in all workspaces and organizations\naccessible to the authenticated user.\n"
    },
    {
      "name": "findAll",
      "method": "GET",
      "path": "/users",
      "collection": true,
      "comment": "Returns the user records for all users in the specified workspace or\norganization.\n"
    }
  ]
};
export = json;

