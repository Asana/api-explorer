/// <reference path="../interfaces.ts" />

/**
 * This file is auto-generated by the `asana-api-meta` NodeJS package.
 * We try to keep the generated code pretty clean but there will be lint
 * errors that are just not worth fixing.
 */
/* tslint:disable:max-line-length */
var resource = <Resource>{
  "name": "tag",
  "comment": "A _tag_ is a label that can be attached to any task in Asana. It exists in a\nsingle workspace or organization.\n\nTags have some metadata associated with them, but it is possible that we will\nsimplify them in the future so it is not encouraged to rely too heavily on it.\nUnlike projects, tags do not provide any ordering on the tasks they\nare associated with.\n",
  "properties": [
    {
      "name": "created_at",
      "type": "String",
      "example_values": [
        "'2012-02-22T02:06:58.147Z'"
      ],
      "access": "Read-only",
      "comment": "The time at which this tag was created.\n"
    },
    {
      "name": "followers",
      "type": "Array",
      "example_values": [
        "[ { id: 1123, name: 'Mittens' }, ... ]"
      ],
      "access": "Read-only",
      "comment": "Array of users following this tag.\n"
    },
    {
      "name": "name",
      "type": "String",
      "example_values": [
        "'Stuff to buy'"
      ],
      "comment": "Name of the tag. This is generally a short sentence fragment that fits\non a line in the UI for maximum readability. However, it can be longer.\n"
    },
    {
      "name": "color",
      "type": "Enum",
      "example_values": [
        "'2012-02-22T02:06:58.147Z'"
      ],
      "comment": "Color of the project. Must be either `null` or one of: `dark-pink`,\n`dark-green`, `dark-blue`, `dark-red`, `dark-teal`, `dark-brown`,\n`dark-orange`, `dark-purple`, `dark-warm-gray`, `light-pink`, `light-green`,\n`light-blue`, `light-red`, `light-teal`, `light-yellow`, `light-orange`,\n`light-purple`, `light-warm-gray`.\n"
    },
    {
      "name": "notes",
      "type": "String",
      "example_values": [
        "'These are things we need to purchase.'"
      ],
      "comment": "More detailed, free-form textual information associated with the tag.\n"
    },
    {
      "name": "workspace",
      "type": "Workspace",
      "example_values": [
        "{ id: 14916, name: 'My Workspace' }"
      ],
      "access": "Create-only",
      "comment": "The workspace or organization this tag is associated with. Once created,\ntags cannot be moved to a different workspace. This attribute can only\nbe specified at creation time.\n"
    }
  ],
  "action_classes": [
    {
      "name": "Create a tag",
      "url": "create"
    },
    {
      "name": "Get a single tag",
      "url": "get-single"
    },
    {
      "name": "Update a tag",
      "url": "update"
    },
    {
      "name": "Query for tags",
      "url": "query"
    },
    {
      "name": "Get tasks with tag",
      "url": "get-tasks"
    }
  ],
  "actions": [
    {
      "name": "create",
      "class": "create",
      "method": "POST",
      "path": "/tags",
      "params": [
        {
          "name": "workspace",
          "type": "Id",
          "example_values": [
            "1331"
          ],
          "comment": "The workspace or organization to create the tag in.",
          "required": true
        }
      ],
      "comment": "Creates a new tag in a workspace or organization.\n\nEvery tag is required to be created in a specific workspace or\norganization, and this cannot be changed once set. Note that you can use\nthe `workspace` parameter regardless of whether or not it is an\norganization.\n\nReturns the full record of the newly created tag.\n"
    },
    {
      "name": "createInWorkspace",
      "class": "create",
      "method": "POST",
      "path": "/workspaces/%d/tags",
      "params": [
        {
          "name": "workspace",
          "type": "Id",
          "example_values": [
            "1331"
          ],
          "comment": "The workspace or organization to create the tag in.",
          "required": true
        }
      ],
      "comment": "Creates a new tag in a workspace or organization.\n\nEvery tag is required to be created in a specific workspace or\norganization, and this cannot be changed once set. Note that you can use\nthe `workspace` parameter regardless of whether or not it is an\norganization.\n\nReturns the full record of the newly created tag.\n"
    },
    {
      "name": "findById",
      "class": "get-single",
      "method": "GET",
      "path": "/tags/%d",
      "params": [
        {
          "name": "tag",
          "type": "Id",
          "example_values": [
            "11235"
          ],
          "comment": "The tag to get.",
          "required": true
        }
      ],
      "comment": "Returns the complete tag record for a single tag.\n"
    },
    {
      "name": "update",
      "class": "update",
      "method": "PUT",
      "path": "/tags/%d",
      "params": [
        {
          "name": "tag",
          "type": "Id",
          "example_values": [
            "11235"
          ],
          "comment": "The tag to update.",
          "required": true
        }
      ],
      "comment": "Updates the properties of a tag. Only the fields provided in the `data`\nblock will be updated; any unspecified fields will remain unchanged.\n\nWhen using this method, it is best to specify only those fields you wish\nto change, or else you may overwrite changes made by another user since\nyou last retrieved the task.\n\nReturns the complete updated tag record.\n"
    },
    {
      "name": "delete",
      "class": "delete",
      "method": "DELETE",
      "path": "/tags/%d",
      "params": [
        {
          "name": "tag",
          "type": "Id",
          "example_values": [
            "11235"
          ],
          "comment": "The tag to delete.",
          "required": true
        }
      ],
      "comment": "A specific, existing tag can be deleted by making a DELETE request\non the URL for that tag.\n\nReturns an empty data record.\n"
    },
    {
      "name": "findAll",
      "class": "query",
      "method": "GET",
      "path": "/tags",
      "collection": true,
      "comment": "Returns the compact tag records for some filtered set of tags.\nUse one or more of the parameters provided to filter the tags returned.\n",
      "params": [
        {
          "name": "workspace",
          "type": "Id",
          "example_values": [
            "1331"
          ],
          "comment": "The workspace or organization to filter tags on."
        },
        {
          "name": "team",
          "type": "Id",
          "example_values": [
            "14916"
          ],
          "comment": "The team to filter tags on."
        },
        {
          "name": "archived",
          "type": "Boolean",
          "example_values": [
            "false"
          ],
          "comment": "Only return tags whose `archived` field takes on the value of\nthis parameter.\n"
        }
      ]
    },
    {
      "name": "findByWorkspace",
      "class": "query",
      "method": "GET",
      "path": "/workspaces/%d/tags",
      "params": [
        {
          "name": "workspace",
          "type": "Id",
          "example_values": [
            "1331"
          ],
          "comment": "The workspace or organization to find tags in.",
          "required": true
        }
      ],
      "collection": true,
      "comment": "Returns the compact tag records for all tags in the workspace.\n"
    },
    {
      "name": "getTasksWithTag",
      "class": "get-tasks",
      "method": "GET",
      "path": "/tags/%d/tasks",
      "params": [
        {
          "name": "tag",
          "type": "Id",
          "example_values": [
            "11235"
          ],
          "comment": "The tag to fetch tasks from.",
          "required": true
        }
      ],
      "collection": true,
      "comment": "Returns the compact task records for all tasks with the given tag.\nTasks can have more than one tag at a time.\n"
    }
  ]
};
export = resource;
