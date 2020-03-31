/// <reference path="../../src/resources/interfaces.ts" />

/* tslint:disable:max-line-length */
/* tslint:disable:eofline */
var resourceBase = <Resource>{
  "name": "stories",
  "comment": "",
  "properties":[],
  "actions": [
  {
    "name": "createStoryForTask",
    "method": "POST",
    "path": "/tasks/%s/stories",
    "params": [
      {
      "name": "task_gid",
      "type": "string",
      "example_values": [""],
      "comment": "The task to operate on.",
      "required": true
      }
    ],
    "comment": "Adds a story to a task. This endpoint currently only allows for comment stories to be created. The comment will be authored by the currently authenticated user, and timestamped when the server receives the request.  Returns the full record for the new story added to the task."
  },
  {
    "name": "deleteStory",
    "method": "DELETE",
    "path": "/stories/%s",
    "params": [
      {
      "name": "story_gid",
      "type": "string",
      "example_values": [""],
      "comment": "Globally unique identifier for the story.",
      "required": true
      }
    ],
    "comment": "Deletes a story. A user can only delete stories they have created.  Returns an empty data record."
  },
  {
    "name": "getStoriesForTask",
    "method": "GET",
    "path": "/tasks/%s/stories",
    "params": [
      {
      "name": "task_gid",
      "type": "string",
      "example_values": [""],
      "comment": "The task to operate on.",
      "required": true
      }
    ],
    "comment": "Returns the compact records for all stories on the task."
  },
  {
    "name": "getStory",
    "method": "GET",
    "path": "/stories/%s",
    "params": [
      {
      "name": "story_gid",
      "type": "string",
      "example_values": [""],
      "comment": "Globally unique identifier for the story.",
      "required": true
      }
    ],
    "comment": "Returns the full record for a single story."
  },
  {
    "name": "updateStory",
    "method": "PUT",
    "path": "/stories/%s",
    "params": [
      {
      "name": "story_gid",
      "type": "string",
      "example_values": [""],
      "comment": "Globally unique identifier for the story.",
      "required": true
      }
    ],
    "comment": "Updates the story and returns the full record for the updated story. Only comment stories can have their text updated, and only comment stories and attachment stories can be pinned. Only one of &#x60;text&#x60; and &#x60;html_text&#x60; can be specified."
  },
  ]
}
export = resourceBase;