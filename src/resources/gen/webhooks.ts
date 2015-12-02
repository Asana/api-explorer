/// <reference path="../interfaces.ts" />

/**
 * This file is auto-generated by the `asana-api-meta` NodeJS package.
 * We try to keep the generated code pretty clean but there will be lint
 * errors that are just not worth fixing.
 */
/* tslint:disable:max-line-length */
/* tslint:disable:eofline */
var resource = <Resource>{
  "name": "webhook",
  "comment": "**Webhooks are currently in BETA - The information here may change.**\n\nWebhooks allow an application to be notified of changes. This is in addition\nto the ability to fetch those changes directly as\n[Events](/developers/api-reference/events) - in fact, Webhooks are just a way\nto receive Events via HTTP POST at the time they occur instead of polling for\nthem. For services accessible via HTTP this is often vastly more convenient,\nand if events are not too frequent can be significantly more efficient.\n\nIn both cases, however, changes are represented as Event objects - refer to\nthe [Events documentation](/developers/api-reference/events) for more\ninformation on what data these events contain.\n\n**NOTE:** While Webhooks send arrays of Event objects to their target, the\nEvent objects themselves contain *only IDs*, rather than the actual resource\nthey are referencing. So while a normal event you receive via GET /events\nwould look like this:\n\n    {\\\n      \"resource\": {\\\n        \"id\": 1337,\\\n        \"name\": \"My Task\"\\\n      },\\\n      \"parent\": null,\\\n      \"created_at\": \"2013-08-21T18:20:37.972Z\",\\\n      \"user\": {\\\n        \"id\": 1123,\\\n        \"name\": \"Tom Bizarro\"\\\n      },\\\n      \"action\": \"changed\",\\\n      \"type\": \"task\"\\\n    }\n\nIn a Webhook payload you would instead receive this:\n\n    {\\\n      \"resource\": 1337,\\\n      \"parent\": null,\\\n      \"created_at\": \"2013-08-21T18:20:37.972Z\",\\\n      \"user\": 1123,\\\n      \"action\": \"changed\",\\\n      \"type\": \"task\"\\\n    }\n\nWebhooks themselves contain only the information necessary to deliver the\nevents to the desired target as they are generated.\n",
  "properties": [
    {
      "name": "id",
      "type": "Id",
      "example_values": [
        "1234"
      ],
      "access": "Read-only",
      "comment": "Globally unique ID of the webhook.\n"
    },
    {
      "name": "resource",
      "type": "Task",
      "example_values": [
        "{ id: 1234, name: 'Bug task' }"
      ],
      "access": "Read-only",
      "comment": "The resource the webhook is subscribed to.\n"
    },
    {
      "name": "target",
      "type": "String",
      "example_values": [
        "'https://example.com/receive-webhook/7654'"
      ],
      "access": "Read-only",
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
      "access": "Read-only",
      "comment": "The timestamp when the webhook was created.\n"
    },
    {
      "name": "last_success_at",
      "type": "String",
      "example_values": [
        "'2012-02-22T02:06:58.147Z'"
      ],
      "access": "Read-only",
      "comment": "The timestamp when the webhook last successfully sent an event to the\ntarget.\n"
    },
    {
      "name": "last_failure_at",
      "type": "String",
      "example_values": [
        "'2012-02-22T02:06:58.147Z'"
      ],
      "access": "Read-only",
      "comment": "The timestamp when the webhook last received an error when sending an\nevent to the target.\n"
    },
    {
      "name": "last_failure_content",
      "type": "String",
      "example_values": [
        "'500 Server Error\\n\\nCould not complete the request'"
      ],
      "access": "Read-only",
      "comment": "The contents of the last error response sent to the webhook when\nattempting to deliver events to the target.\n"
    }
  ],
  "action_classes": [
    {
      "name": "Create a webhook",
      "url": "create"
    },
    {
      "name": "Get webhooks",
      "url": "get"
    },
    {
      "name": "Get webhook",
      "url": "get-single"
    },
    {
      "name": "Receiving webhook events",
      "url": "receive",
      "comment": "Because multiple events often happen in short succession, a webhook\npayload is designed to be able to transmit multiple events at once. The\nexact model of events is described in the\n[Events documentation](/developers/api-reference/events).\n\nThe HTTP POST that the target receives contains:\n\n * An `X-Hook-Signature` header, which allows verifying that the payload\nis genuine.  The signature is a SHA256 HMAC using the shared secret\n(transmitted during the handshake) of the request body. Verification is\n**strongly recommended**, as it would otherwise be possible for an\nattacker to POST a malicious payload to the same endpoint. If the target\nendpoint can be kept secret this risk is mitigated somewhat, of course.\\\n * A JSON body with a single key, `events`, containing an array of the\nevents that have occurred since the last webhook delivery. Note that this\nlist may be empty, as periodically we may send a \"heartbeat\" webhook to\nverify that the endpoint is available.\n\nNote that events are \"skinny\" - we expect consumers who desire syncing\ndata to make additional calls to the API to retrieve the latest state.\nBecause the data may have already changed by the time we send the event,\nit would be misleading to send a snapshot of the data along with the\nevent.\n\n**Example**\n\n    # Request to your server\\\n    POST /receive-webhook/7654\\\n    X-Hook-Signature: 1d6207f8818f063890758a32d3833914754ba788cb8993e644701bac7257f59e\n\n    {\\\n      \"events\": [\\\n        {\\\n          \"action\": \"changed\",\\\n          \"created_at\": \"2013-08-21T18:20:37.972Z\",\\\n          \"parent\": null,\\\n          \"resource\": 1337,\\\n          \"type\": \"task\",\\\n          \"user\": 1123,\\\n        },\\\n        {\\\n          \"action\": \"changed\",\\\n          \"created_at\": \"2013-08-21T18:22:45.421Z\",\\\n          \"parent\": null,\\\n          \"resource\": 1338,\\\n          \"type\": \"task\",\\\n          \"user\": 1428\\\n        }\\\n      ]\\\n    }\n"
    },
    {
      "name": "Error handling and retry",
      "url": "retry",
      "comment": "If we attempt to send a webhook payload and we receive an error status\ncode, or the request times out, we will retry delivery with exponential\nbackoff. In general, if your servers are not available for an hour, you\ncan expect it to take no longer than approximately an hour after they\ncome back before the paused delivery resumes. However, if we are unable\nto deliver a message for 24 hours the webhook will be deactivated.\n"
    },
    {
      "name": "Delete a webhook",
      "url": "delete"
    }
  ],
  "actions": [
    {
      "name": "create",
      "class": "create",
      "method": "POST",
      "path": "/webhooks",
      "params": [
        {
          "name": "resource",
          "type": "Id",
          "example_values": [
            "12345"
          ],
          "required": true,
          "explicit": true,
          "comment": "A resource ID to subscribe to. The resource can be a task or project.\n"
        },
        {
          "name": "target",
          "type": "String",
          "example_values": [
            "'https://example.com/receive-webhook/7654'"
          ],
          "required": true,
          "explicit": true,
          "comment": "The URL to receive the HTTP POST.\n"
        }
      ],
      "comment": "Establishing a webhook is a two-part process. First, a simple HTTP POST\nsimilar to any other resource creation. Since you could have multiple\nwebhooks we recommend specifying a unique local id for each target.\n\nNext comes the confirmation handshake. When a webhook is created, we will\nsend a test POST to the `target` with an `X-Hook-Secret` header as\ndescribed in the\n[Resthooks Security documentation](http://resthooks.org/docs/security/).\nThe target must respond with a `200 OK` and a matching `X-Hook-Secret`\nheader to confirm that this webhook subscription is indeed expected.\n\nIf you do not acknowledge the webhook's confirmation handshake it will\nfail to setup, and you will receive an error in response to your attempt\nto create it. This means you need to be able to receive and complete the\nwebhook *while* the POST request is in-flight.\n",
      "footer": "**Example**\n\n    # Request\\\n    curl -H \"Authorization: Bearer <personal_access_token>\" \\\\\n    -X POST https://app.asana.com/api/1.0/webhooks \\\\\n    -d \"resource=8675309\" \\\\\n    -d \"target=https://example.com/receive-webhook/7654\"\n\n    # Handshake sent to https://example.com/\\\n    POST /receive-webhook/7654\\\n    X-Hook-Secret: b537207f20cbfa02357cf448134da559e8bd39d61597dcd5631b8012eae53e81\n\n    # Handshake response sent by example.com\\\n    HTTP/1.1 200\\\n    X-Hook-Secret: b537207f20cbfa02357cf448134da559e8bd39d61597dcd5631b8012eae53e81\n\n    # Response\\\n    HTTP/1.1 201\\\n    {\\\n      \"data\": {\\\n        \"id\": 43214,\\\n        \"resource\": {\\\n          \"id\": 8675309,\\\n          \"name\": \"Bugs\"\\\n        },\\\n        \"target\": \"https://example.com/receive-webhook/7654\",\\\n        \"active\": false,\\\n        \"last_success_at\": null,\\\n        \"last_failure_at\": null,\\\n        \"last_failure_content\": null\\\n      }\\\n    }\n"
    },
    {
      "name": "getAll",
      "class": "get",
      "method": "GET",
      "path": "/webhooks",
      "collection": true,
      "params": [
        {
          "name": "workspace",
          "type": "Id",
          "example_values": [
            "1331"
          ],
          "comment": "The workspace to query for webhooks in.\n",
          "required": true,
          "explicit": true
        },
        {
          "name": "resource",
          "type": "Id",
          "example_values": [
            "12345"
          ],
          "comment": "Only return webhooks for the given resource.\n"
        }
      ],
      "comment": "Returns the compact representation of all webhooks your app has\nregistered for the authenticated user in the given workspace.\n"
    },
    {
      "name": "getById",
      "class": "get-single",
      "method": "GET",
      "path": "/webhooks/%s",
      "params": [
        {
          "name": "webhook",
          "type": "Id",
          "example_values": [
            "12345"
          ],
          "required": true,
          "explicit": true,
          "comment": "The webhook to get.\n"
        }
      ],
      "comment": "Returns the full record for the given webhook.\n"
    },
    {
      "name": "deleteById",
      "class": "delete",
      "method": "DELETE",
      "path": "/webhooks/%s",
      "params": [
        {
          "name": "webhook",
          "type": "Id",
          "example_values": [
            "12345"
          ],
          "required": true,
          "explicit": true,
          "comment": "The webhook to delete.\n"
        }
      ],
      "comment": "This method permanently removes a webhook. Note that it may be possible\nto receive a request that was already in flight after deleting the\nwebhook, but no further requests will be issued.\n"
    }
  ]
};
export = resource;