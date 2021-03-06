/// <reference path="../interfaces.ts" />

/* tslint:disable:max-line-length */
/* tslint:disable:eofline */
var resourceBase = <Resource>{
  "name": "tags",
  "comment": "",
  "properties":[],
  "actions": [
  {
    "name": "createTag",
    "method": "POST",
    "collection": false,
    "path": "/tags",
    "params": [
    ],
    "comment": "Create a tag"
  },
  {
    "name": "createTagForWorkspace",
    "method": "POST",
    "collection": false,
    "path": "/workspaces/%s/tags",
    "params": [
      {
      "name": "workspace_gid",
      "type": "string",
      "example_values": ["12345"],
      "comment": "Globally unique identifier for the workspace or organization.",
      "required": true
      },
    ],
    "comment": "Create a tag in a workspace"
  },
  {
    "name": "deleteTag",
    "method": "DELETE",
    "collection": true||false,
    "path": "/tags/%s",
    "params": [
      {
      "name": "tag_gid",
      "type": "string",
      "example_values": ["11235"],
      "comment": "Globally unique identifier for the tag.",
      "required": true
      },
    ],
    "comment": "Delete a tag"
  },
  {
    "name": "getTag",
    "method": "GET",
    "collection": true||false,
    "path": "/tags/%s",
    "params": [
      {
      "name": "tag_gid",
      "type": "string",
      "example_values": ["11235"],
      "comment": "Globally unique identifier for the tag.",
      "required": true
      },
    ],
    "comment": "Get a tag"
  },
  {
    "name": "getTags",
    "method": "GET",
    "collection": true||false,
    "path": "/tags",
    "params": [
      {
      "name": "workspace",
      "type": "string",
      "example_values": ["1331"],
      "comment": "The workspace to filter tags on.",
      "required": false
      },
    ],
    "comment": "Get multiple tags"
  },
  {
    "name": "getTagsForTask",
    "method": "GET",
    "collection": true||false,
    "path": "/tasks/%s/tags",
    "params": [
      {
      "name": "task_gid",
      "type": "string",
      "example_values": ["321654"],
      "comment": "The task to operate on.",
      "required": true
      },
    ],
    "comment": "Get a task&#x27;s tags"
  },
  {
    "name": "getTagsForWorkspace",
    "method": "GET",
    "collection": true||false,
    "path": "/workspaces/%s/tags",
    "params": [
      {
      "name": "workspace_gid",
      "type": "string",
      "example_values": ["12345"],
      "comment": "Globally unique identifier for the workspace or organization.",
      "required": true
      },
    ],
    "comment": "Get tags in a workspace"
  },
  {
    "name": "updateTag",
    "method": "PUT",
    "collection": true||false,
    "path": "/tags/%s",
    "params": [
      {
      "name": "tag_gid",
      "type": "string",
      "example_values": ["11235"],
      "comment": "Globally unique identifier for the tag.",
      "required": true
      },
    ],
    "comment": "Update a tag"
  },
  ]
}
export = resourceBase;
