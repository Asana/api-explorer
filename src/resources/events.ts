import resourceBase = require("./gen/events_base");
resourceBase.comment = "An _event_ is an object representing a change to a resource that was observed\nby an event subscription.\n\nIn general, requesting events on a resource is faster and subject to higher\nrate limits than requesting the resource itself. Additionally, change events\nbubble up - listening to events on a project would include when stories are\nadded to tasks in the project, even on subtasks.\n\nEstablish an initial sync token by making a request with no sync token.\nThe response will be a `412` error - the same as if the sync token had\nexpired.\n\nSubsequent requests should always provide the sync token from the immediately\npreceding call.\n\nSync tokens may not be valid if you attempt to go 'backward' in the history\nby requesting previous tokens, though re-requesting the current sync token\nis generally safe, and will always return the same results.\n\nWhen you receive a `412 Precondition Failed` error, it means that the\nsync token is either invalid or expired. If you are attempting to keep a set\nof data in sync, this signals you may need to re-crawl the data.\n\nSync tokens always expire after 24 hours, but may expire sooner, depending on\nload on the service.\n"
resourceBase.properties = [
  {
    "name": "user",
    "type": "User",
    "example_values": [
      "{ id: 12345, gid: \"12345\", resource_type: \"user\", name: 'Tim Bizarro' }",
      "null"
    ],
    "comment": "The user who triggered the event.\n",
  },
  {
    "name": "resource",
    "type": "Task",
    "example_values": [
      "{ id: 1234, gid: \"1234\", name: 'Bug task' }"
    ],
    "comment": "The resource the event occurred on.\n",
  },
  {
    "name": "action",
    "type": "Enum",
    "example_values": [
      "'changed'"
    ],
    "values": [
      {
        "name": "changed",
        "comment": "A resource was changed."
      },
      {
        "name": "added",
        "comment": "A resource was added."
      },
      {
        "name": "removed",
        "comment": "A resource was removed."
      },
      {
        "name": "deleted",
        "comment": "A resource was deleted."
      },
      {
        "name": "undeleted",
        "comment": "A resource was undeleted."
      }
    ],
    "comment": "The type of action taken that triggered the event.\n"
  },
  {
    "name": "parent",
    "type": "Project",
    "example_values": [
      "{ id: 1234, gid: \"1234\", name: 'Bugs' }"
    ],
    "comment": "For added/removed events, the parent that resource was added to or\nremoved from. `null` for other event types.\n"
  },
  {
    "name": "created_at",
    "type": "String",
    "example_values": [
      "'2012-02-22T02:06:58.147Z'"
    ],
    "comment": "The timestamp when the event occurred.\n"
  }
];
export = resourceBase;