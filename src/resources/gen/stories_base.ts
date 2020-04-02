/// <reference path="../interfaces.ts" />

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
      "example_values": ["321654"],
      "comment": "The task to operate on.",
      "required": true
      },
    ],
    "comment": "Create a story on a task"
  },
  {
    "name": "deleteStory",
    "method": "DELETE",
    "path": "/stories/%s",
    "params": [
      {
      "name": "story_gid",
      "type": "string",
      "example_values": ["35678"],
      "comment": "Globally unique identifier for the story.",
      "required": true
      },
    ],
    "comment": "Delete a story"
  },
  {
    "name": "getStoriesForTask",
    "method": "GET",
    "path": "/tasks/%s/stories",
    "params": [
      {
      "name": "task_gid",
      "type": "string",
      "example_values": ["321654"],
      "comment": "The task to operate on.",
      "required": true
      },
    ],
    "comment": "Get stories from a task"
  },
  {
    "name": "getStory",
    "method": "GET",
    "path": "/stories/%s",
    "params": [
      {
      "name": "story_gid",
      "type": "string",
      "example_values": ["35678"],
      "comment": "Globally unique identifier for the story.",
      "required": true
      },
    ],
    "comment": "Get a story"
  },
  {
    "name": "updateStory",
    "method": "PUT",
    "path": "/stories/%s",
    "params": [
      {
      "name": "story_gid",
      "type": "string",
      "example_values": ["35678"],
      "comment": "Globally unique identifier for the story.",
      "required": true
      },
    ],
    "comment": "Update a story"
  },
  ]
}
export = resourceBase;