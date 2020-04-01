import resourceBase = require("./gen/webhooks_base");
resourceBase.comment = "Webhooks allow an application to be notified of changes. This is in addition\nto the ability to fetch those changes directly as\n[Events](/developers/api-reference/events) - in fact, Webhooks are just a way\nto receive Events via HTTP POST at the time they occur instead of polling for\nthem. For services accessible via HTTP this is often vastly more convenient,\nand if events are not too frequent can be significantly more efficient.\n\nIn both cases, however, changes are represented as Event objects - refer to\nthe [Events documentation](/developers/api-reference/events) for more\ninformation on what data these events contain.\n\n**NOTE:** While Webhooks send arrays of Event objects to their target, the\nEvent objects themselves contain *only IDs*, rather than the actual resource\nthey are referencing. So while a normal event you receive via GET /events\nwould look like this:\n\n    {\\\n      \"resource\": {\\\n        \"id\": 1337,\\\n        \"resource_type\": \"task\",\\\n        \"name\": \"My Task\"\\\n      },\\\n      \"parent\": null,\\\n      \"created_at\": \"2013-08-21T18:20:37.972Z\",\\\n      \"user\": {\\\n        \"id\": 1123,\\\n        \"resource_type\": \"user\",\\\n        \"name\": \"Tom Bizarro\"\\\n      },\\\n      \"action\": \"changed\",\\\n      \"type\": \"task\"\\\n    }\n\nIn a Webhook payload you would instead receive this:\n\n    {\\\n      \"resource\": 1337,\\\n      \"parent\": null,\\\n      \"created_at\": \"2013-08-21T18:20:37.972Z\",\\\n      \"user\": 1123,\\\n      \"action\": \"changed\",\\\n      \"type\": \"task\"\\\n    }\n\nWebhooks themselves contain only the information necessary to deliver the\nevents to the desired target as they are generated.\n";
resourceBase.properties = [
  {
    "name": "id",
    "type": "Id",
    "example_values": [
      "1234"
    ],
    "comment": "Globally unique ID of the webhook.\n**Note: This field is under active migration to the [`gid` field](#field-gid)--please see our [blog post](/developers/documentation/getting-started/deprecations) for more information.**\n"
  },
  {
    "name": "gid",
    "type": "Gid",
    "example_values": [
      "\"1234\""
    ],
    "comment": "Globally unique ID of the webhook.\n"
  },
  {
    "name": "resource_type",
    "type": "Enum",
    "comment": "The resource type of this resource. The value for this resource is always `webhook`.\n",
    "example_values": [
      "\"webhook\""
    ],
    "values": [
      {
        "name": "webhook",
        "comment": "A webhook resource type."
      }
    ]
  },
  {
    "name": "resource",
    "type": "Task",
    "example_values": [
      "{ id: 1234, gid: \"1234\", name: 'Bug task' }"
    ],
    "comment": "The resource the webhook is subscribed to.\n"
  },
  {
    "name": "target",
    "type": "String",
    "example_values": [
      "'https://example.com/receive-webhook/7654'"
    ],
    "comment": "The URL to receive the HTTP POST.\n"
  },
  {
    "name": "active",
    "type": "Boolean",
    "example_values": [
      "false"
    ],
    "comment": "If true, the webhook will send events - if false it is considered\ninactive and will not generate events.\n"
  },
  {
    "name": "created_at",
    "type": "String",
    "example_values": [
      "'2012-02-22T02:06:58.147Z'"
    ],
    "comment": "The timestamp when the webhook was created.\n"
  },
  {
    "name": "last_success_at",
    "type": "String",
    "example_values": [
      "'2012-02-22T02:06:58.147Z'"
    ],
    "comment": "The timestamp when the webhook last successfully sent an event to the\ntarget.\n"
  },
  {
    "name": "last_failure_at",
    "type": "String",
    "example_values": [
      "'2012-02-22T02:06:58.147Z'"
    ],
    "comment": "The timestamp when the webhook last received an error when sending an\nevent to the target.\n"
  },
  {
    "name": "last_failure_content",
    "type": "String",
    "example_values": [
      "'500 Server Error\\n\\nCould not complete the request'"
    ],
    "comment": "The contents of the last error response sent to the webhook when\nattempting to deliver events to the target.\n"
  }
]
export = resourceBase;