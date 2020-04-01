import resourceBase = require("./gen/attachments_base");
resourceBase.comment = "An _attachment_ object represents any file attached to a task in Asana,\nwhether it's an uploaded file or one associated via a third-party service\nsuch as Dropbox or Google Drive.\n";
resourceBase.properties = [
  {
    "name": "id",
    "type": "Id",
    "example_values": [
      "1234"
    ],
    "comment": "Globally unique ID of the attachment.\n**Note: This field is under active migration to the [`gid` field](#field-gid)--please see our [blog post](/developers/documentation/getting-started/deprecations) for more information.**\n"
  },
  {
    "name": "gid",
    "type": "Gid",
    "example_values": [
      "\"1234\""
    ],
    "comment": "Globally unique ID of the attachment.\n"
  },
  {
    "name": "resource_type",
    "type": "Enum",
    "comment": "The resource type of this resource. The value for this resource is always `attachment`.\n",
    "example_values": [
      "\"attachment\""
    ],
    "values": [
      {
        "name": "attachment",
        "comment": "An attachment resource type."
      }
    ]
  },
  {
    "name": "created_at",
    "type": "String",
    "example_values": [
      "'2012-02-22T02:06:58.147Z'"
    ],
    "comment": "The time at which this attachment was uploaded.\n"
  },
  {
    "name": "download_url",
    "type": "String",
    "example_values": [
      "'https://www.dropbox.com/s/123/Screenshot.png?dl=1'",
      "null"
    ],
    "comment": "The URL containing the content of the attachment.\n",
  },
  {
    "name": "host",
    "type": "String",
    "example_values": [
      "'dropbox'"
    ],
    "comment": "The service hosting the attachment. Valid values are `asana`, `dropbox`,\n`gdrive` and `box`.\n"
  },
  {
    "name": "name",
    "type": "String",
    "example_values": [
      "'Screenshot.png'"
    ],
    "comment": "The name of the file.\n"
  },
  {
    "name": "parent",
    "type": "Task",
    "example_values": [
      "{ id: 1234, gid: \"1234\", name: 'Bug task' }"
    ],
    "comment": "The task this attachment is attached to.\n"
  },
  {
    "name": "view_url",
    "type": "String",
    "example_values": [
      "'https://www.dropbox.com/s/123/Screenshot.png'",
      "null"
    ],
    "comment": "The URL where the attachment can be viewed, which may be friendlier to\nusers in a browser than just directing them to a raw file.\n"
  }
];

export = resourceBase;