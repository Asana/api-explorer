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
    "path": "/tags",
    "params": [
    ],
    "comment": "Creates a new tag in a workspace or organization.  Every tag is required to be created in a specific workspace or organization, and this cannot be changed once set. Note that you can use the workspace parameter regardless of whether or not it is an organization.  Returns the full record of the newly created tag."
  },
  {
    "name": "createTagForWorkspace",
    "method": "POST",
    "path": "/workspaces/%s/tags",
    "params": [
      {
      "name": "workspace_gid",
      "type": "string",
      "example_values": ["12345"],
      "comment": "Globally unique identifier for the workspace or organization.",
      "required": true
      }
    ],
    "comment": "Creates a new tag in a workspace or organization.  Every tag is required to be created in a specific workspace or organization, and this cannot be changed once set. Note that you can use the workspace parameter regardless of whether or not it is an organization.  Returns the full record of the newly created tag."
  },
  {
    "name": "getTag",
    "method": "GET",
    "path": "/tags/%s",
    "params": [
      {
      "name": "tag_gid",
      "type": "string",
      "example_values": ["11235"],
      "comment": "Globally unique identifier for the tag.",
      "required": true
      }
    ],
    "comment": "Returns the complete tag record for a single tag."
  },
  {
    "name": "getTags",
    "method": "GET",
    "path": "/tags",
    "params": [
    ],
    "comment": "Returns the compact tag records for some filtered set of tags. Use one or more of the parameters provided to filter the tags returned."
  },
  {
    "name": "getTagsForTask",
    "method": "GET",
    "path": "/tasks/%s/tags",
    "params": [
      {
      "name": "task_gid",
      "type": "string",
      "example_values": ["321654"],
      "comment": "The task to operate on.",
      "required": true
      }
    ],
    "comment": "Get a compact representation of all of the tags the task has."
  },
  {
    "name": "getTagsForWorkspace",
    "method": "GET",
    "path": "/workspaces/%s/tags",
    "params": [
      {
      "name": "workspace_gid",
      "type": "string",
      "example_values": ["12345"],
      "comment": "Globally unique identifier for the workspace or organization.",
      "required": true
      }
    ],
    "comment": "Returns the compact tag records for some filtered set of tags. Use one or more of the parameters provided to filter the tags returned."
  },
  {
    "name": "updateTag",
    "method": "PUT",
    "path": "/tags/%s",
    "params": [
      {
      "name": "tag_gid",
      "type": "string",
      "example_values": ["11235"],
      "comment": "Globally unique identifier for the tag.",
      "required": true
      }
    ],
    "comment": "Updates the properties of a tag. Only the fields provided in the &#x60;data&#x60; block will be updated; any unspecified fields will remain unchanged.  When using this method, it is best to specify only those fields you wish to change, or else you may overwrite changes made by another user since you last retrieved the task.  Returns the complete updated tag record."
  },
  ]
}
export = resourceBase;