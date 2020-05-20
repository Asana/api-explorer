import resourceBase = require("./gen/organization_exports_base");
resourceBase.comment = "An _organization_export_ object represents a request to export the complete data of an Organization\nin JSON format.\n\nTo export an Organization using this API:\n\n* Create an `organization_export` [request](#create) and store the id that is returned.\\\n* Request the `organization_export` every few minutes, until the `state` field contains 'finished'.\\\n* Download the file located at the URL in the `download_url` field.\n\nExports can take a long time, from several minutes to a few hours for large Organizations.\n\n**Note:** These endpoints are only available to [Service Accounts](/guide/help/premium/service-accounts)\nof an [Enterprise](/enterprise) Organization.\n";
resourceBase.properties = [
  {
    "name": "gid",
    "type": "Gid",
    "example_values": [
      "\"1234\""
    ],
    "comment": "Globally unique ID of the Organization export.\n"
  },
  {
    "name": "created_at",
    "type": "String",
    "example_values": [
      "'2012-02-22T02:06:58.147Z'"
    ],
    "comment": "The time at which this export was requested.\n"
  },
  {
    "name": "download_url",
    "type": "String",
    "example_values": [
      "null"
    ],
    "comment": "Download this URL to retreive the full export of the organization in JSON format. It will be\ncompressed in a gzip (.gz) container.\n",
  },
  {
    "name": "state",
    "type": "String",
    "example_values": [
      "'pending'",
      "'started'",
      "'finished'",
      "'error'"
    ],
    "comment": "The current state of the export.\n"
  },
  {
    "name": "organization",
    "type": "Workspace",
    "example_values": [
      "{ id: 14916, gid: \"14916\", name: 'My Workspace' }"
    ],
    "comment": "The Organization that is being exported. This can only be specified at create time.\n"
  }
]

export = resourceBase;