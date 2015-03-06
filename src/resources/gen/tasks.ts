/* tslint:disable */

// TODO: Add type information from asana_json.d.ts
var json = {
  "templates": [
    {
      "template": {
        "value": 200,
        "comment": "Success.\n"
      }
    },
    {
      "template": {
        "type": "String",
        "example_values": [
          "'2012-02-22T02:06:58.158Z'",
          "now"
        ]
      }
    },
    {
      "template": [
        {
          "type": "Boolean",
          "example_values": [
            "false"
          ]
        }
      ]
    },
    {
      "template": {
        "type": "Id",
        "example_values": [
          "12345"
        ]
      }
    },
    {
      "template": {
        "type": "Array",
        "example_values": [
          "[133713, 184253]"
        ]
      }
    },
    {
      "template": {
        "type": "Id",
        "example_values": [
          "13579"
        ],
        "comment": "Globally unique identifier for the project.\n"
      }
    },
    {
      "template": {
        "type": "Id",
        "example_values": [
          "11235"
        ],
        "comment": "Globally unique identifier for the tag.\n"
      }
    },
    {
      "template": {
        "type": "Id",
        "example_values": [
          "124816"
        ],
        "comment": "Globally unique identifier for the task.\n"
      }
    },
    {
      "template": {
        "type": "Id",
        "example_values": [
          "14641"
        ],
        "comment": "Globally unique identifier for the user.\n"
      }
    },
    {
      "template": {
        "type": "Id",
        "example_values": [
          "1331"
        ],
        "comment": "Globally unique identifier for the workspace or organization.\n"
      }
    },
    {
      "template": {
        "type": "Id",
        "example_values": [
          "12357"
        ],
        "comment": "Globally unique identifier for the attachment.\n"
      }
    },
    {
      "template": {
        "type": "Id",
        "example_values": [
          "14916"
        ],
        "comment": "Globally unique identifier for the team.\n"
      }
    },
    {
      "template": {
        "type": "Id",
        "example_values": [
          "182764"
        ],
        "comment": "Globally unique identifier for the team.\n"
      }
    },
    {
      "template": [
        {
          "type": "Id",
          "example_values": [
            "1234"
          ],
          "read_only": true,
          "comment": "Globally unique identifier for this object.\n"
        }
      ]
    },
    {
      "template": [
        {
          "type": "String",
          "example_values": [
            "'gsanchez@example.com'"
          ]
        }
      ]
    },
    {
      "template": [
        {
          "type": "Boolean",
          "example_values": [
            "false"
          ]
        }
      ]
    },
    {
      "template": [
        {
          "type": "User",
          "example_values": [
            "{ id: 1234, name: 'Tim Bizarro' }",
            "null"
          ]
        }
      ]
    },
    {
      "template": {
        "type": "Enum",
        "example_values": [
          "'upcoming'"
        ],
        "values": [
          {
            "name": "inbox",
            "comment": "In the inbox."
          },
          {
            "name": "later",
            "comment": "Scheduled for _later_."
          },
          {
            "name": "upcoming",
            "comment": "Scheduled for _upcoming_."
          },
          {
            "name": "today",
            "comment": "Scheduled for _today_."
          }
        ]
      }
    },
    {
      "template": {
        "method": "POST",
        "path": "/tasks/%d/stories",
        "params": [
          {
            "name": "task",
            "type": "Id",
            "example_values": [
              "124816"
            ],
            "comment": "Globally unique identifier for the task.\n",
            "required": true
          },
          {
            "name": "text",
            "type": "String",
            "required": true,
            "comment": "The plain text of the comment to add."
          }
        ],
        "comment": "Adds a comment to a task. The comment will be authored by the\ncurrently authenticated user, and timestamped when the server receives\nthe request.\n\nReturns the full record for the new story added to the task.\n"
      }
    }
  ],
  "name": "task",
  "comment": "The _task_ is the basic object around which many operations in Asana are\ncentered. In the Asana application, multiple tasks populate the middle pane\naccording to some view parameters, and the set of selected tasks determines\nthe more detailed information presented in the details pane.\n",
  "properties": [
    {
      "name": "assignee",
      "type": "User",
      "example_values": [
        "{ id: 1234, name: 'Tim Bizarro' }",
        "null"
      ],
      "comment": "User to which this task is assigned, or `null` if the task is\nunassigned.\n"
    },
    {
      "name": "assignee_status",
      "type": "Enum",
      "example_values": [
        "'upcoming'"
      ],
      "values": [
        {
          "name": "inbox",
          "comment": "In the inbox."
        },
        {
          "name": "later",
          "comment": "Scheduled for _later_."
        },
        {
          "name": "upcoming",
          "comment": "Scheduled for _upcoming_."
        },
        {
          "name": "today",
          "comment": "Scheduled for _today_."
        }
      ],
      "comment": "Scheduling status of this task for the user it is assigned to.\nThis field can only be set if the `assignee` is non-null.\n"
    }
  ],
  "actions": [
    {
      "name": "create",
      "method": "POST",
      "path": "/tasks",
      "comment": "Creating a new task is as easy as POSTing to the `/tasks` endpoint\nwith a data block containing the fields you'd like to set on the task.\nAny unspecified fields will take on default values.\n\nEvery task is required to be created in a specific workspace, and this\nworkspace cannot be changed once set. The workspace need not be set\nexplicitly if you specify a `project` or a `parent` task instead.\n"
    },
    {
      "name": "createInWorkspace",
      "method": "POST",
      "path": "/workspaces/%d/tasks",
      "params": [
        {
          "name": "workspace",
          "type": "Id",
          "example_values": [
            "1331"
          ],
          "comment": "The workspace to create a task in.",
          "required": true
        }
      ],
      "comment": "Creating a new task is as easy as POSTing to the `/tasks` endpoint\nwith a data block containing the fields you'd like to set on the task.\nAny unspecified fields will take on default values.\n\nEvery task is required to be created in a specific workspace, and this\nworkspace cannot be changed once set. The workspace need not be set\nexplicitly if you specify a project or a parent task instead.\n"
    },
    {
      "name": "findById",
      "method": "GET",
      "path": "/tasks/%d",
      "params": [
        {
          "name": "task",
          "type": "Id",
          "example_values": [
            "124816"
          ],
          "comment": "The task to get.",
          "required": true
        }
      ],
      "comment": "Returns the complete task record for a single task.\n"
    },
    {
      "name": "update",
      "method": "PUT",
      "path": "/tasks/%d",
      "params": [
        {
          "name": "task",
          "type": "Id",
          "example_values": [
            "124816"
          ],
          "comment": "The task to update.",
          "required": true
        }
      ],
      "comment": "A specific, existing task can be updated by making a PUT request on the\nURL for that task. Only the fields provided in the `data` block will be\nupdated; any unspecified fields will remain unchanged.\n\nWhen using this method, it is best to specify only those fields you wish\nto change, or else you may overwrite changes made by another user since\nyou last retrieved the task.\n\nReturns the complete updated task record.\n"
    },
    {
      "name": "delete",
      "method": "DELETE",
      "path": "/tasks/%d",
      "params": [
        {
          "name": "task",
          "type": "Id",
          "example_values": [
            "124816"
          ],
          "comment": "The task to delete.",
          "required": true
        }
      ],
      "comment": "A specific, existing task can be deleted by making a DELETE request on the\nURL for that task. Deleted tasks go into the \"trash\" of the user making\nthe delete request. Tasks can be recovered from the trash within a period\nof 30 days; afterward they are completely removed from the system.\n\nReturns an empty data record.\n"
    },
    {
      "name": "findByProject",
      "method": "GET",
      "path": "/projects/%d/tasks",
      "params": [
        {
          "name": "projectId",
          "type": "Id",
          "example_values": [
            "13579"
          ],
          "comment": "The project in which to search for tasks.",
          "required": true
        }
      ],
      "collection": true,
      "comment": "Returns the compact task records for all tasks within the given project,\nordered by their priority within the project.\n"
    },
    {
      "name": "findByTag",
      "method": "GET",
      "path": "/tags/%d/tasks",
      "params": [
        {
          "name": "tag",
          "type": "Id",
          "example_values": [
            "11235"
          ],
          "comment": "The tag in which to search for tasks.",
          "required": true
        }
      ],
      "collection": true,
      "comment": "Returns the compact task records for all tasks with the given tag.\n"
    },
    {
      "name": "findAll",
      "method": "GET",
      "path": "/tasks",
      "collection": true,
      "comment": "Returns the compact task records for some filtered set of tasks. Use one\nor more of the parameters provided to filter the tasks returned.\n",
      "params": [
        {
          "name": "assignee",
          "type": "Id",
          "example_values": [
            "14641"
          ],
          "comment": "The assignee to filter tasks on.",
          "notes": [
            "If you specify `assignee`, you must also specify the `workspace` to filter on."
          ]
        },
        {
          "name": "workspace",
          "type": "Id",
          "example_values": [
            "1331"
          ],
          "comment": "The workspace or organization to filter tasks on.",
          "notes": [
            "If you specify `workspace`, you must also specify the `assignee` to filter on."
          ]
        },
        {
          "name": "completed_since",
          "type": "String",
          "example_values": [
            "'2012-02-22T02:06:58.158Z'",
            "now"
          ],
          "comment": "Only return tasks that are either incomplete or that have been\ncompleted since this time.\n"
        },
        {
          "name": "modified_since",
          "type": "String",
          "example_values": [
            "'2012-02-22T02:06:58.158Z'",
            "now"
          ],
          "comment": "Only return tasks that have been modified since the given time.\n",
          "notes": [
            "A task is considered \"modified\" if any of its properties change,\nor associations between it and other objects are modified (e.g.\na task being added to a project). A task is not considered modified\njust because another object it is associated with (e.g. a subtask)\nis modified. Actions that count as modifying the task include\nassigning, renaming, completing, and adding stories.\n"
          ]
        }
      ]
    },
    {
      "name": "addFollowers",
      "method": "POST",
      "path": "/tasks/%d/addFollowers",
      "params": [
        {
          "name": "task",
          "type": "Id",
          "example_values": [
            "124816"
          ],
          "comment": "The task to add followers to.",
          "required": true
        },
        {
          "name": "followers",
          "type": "Array",
          "example_values": [
            "[133713, 184253]"
          ],
          "required": true,
          "comment": "An array of followers to add to the task."
        }
      ],
      "comment": "Adds each of the specified followers to the task, if they are not already\nfollowing. Returns the complete, updated record for the affected task.\n"
    },
    {
      "name": "removeFollowers",
      "method": "POST",
      "path": "/tasks/%d/removeFollowers",
      "params": [
        {
          "name": "task",
          "type": "Id",
          "example_values": [
            "124816"
          ],
          "comment": "The task to remove followers from.",
          "required": true
        },
        {
          "name": "followers",
          "type": "Array",
          "example_values": [
            "[133713, 184253]"
          ],
          "required": true,
          "comment": "An array of followers to remove from the task."
        }
      ],
      "comment": "Removes each of the specified followers from the task if they are\nfollowing. Returns the complete, updated record for the affected task.\n"
    },
    {
      "name": "projects",
      "method": "GET",
      "path": "/tasks/%d/projects",
      "collection": true,
      "params": [
        {
          "name": "task",
          "type": "Id",
          "example_values": [
            "124816"
          ],
          "comment": "The task to get projects on.",
          "required": true
        }
      ],
      "comment": "Returns a compact representation of all of the projects the task is in.\n"
    },
    {
      "name": "addProject",
      "method": "POST",
      "path": "/tasks/%d/addProject",
      "params": [
        {
          "name": "task",
          "type": "Id",
          "example_values": [
            "124816"
          ],
          "comment": "The task to add to a project.",
          "required": true
        },
        {
          "name": "project",
          "type": "Id",
          "example_values": [
            "13579"
          ],
          "comment": "The project to add the task to.",
          "required": true
        },
        {
          "name": "insertAfter",
          "type": "Id",
          "example_values": [
            "124816",
            "null"
          ],
          "comment": "A task in the project to insert the task after, or `null` to\ninsert at the beginning of the list.\n"
        },
        {
          "name": "insertBefore",
          "type": "Id",
          "example_values": [
            "124816",
            "null"
          ],
          "comment": "A task in the project to insert the task before, or `null` to\ninsert at the end of the list.\n"
        },
        {
          "name": "section",
          "type": "Id",
          "example_values": [
            "124816"
          ],
          "comment": "A section in the project to insert the task into. The task will be\ninserted at the top of the section.\n"
        }
      ],
      "comment": "Adds the task to the specified project, in the optional location\nspecified. If no location arguments are given, the task will be added to\nthe beginning of the project.\n\n`addProject` can also be used to reorder a task within a project that\nalready contains it.\n\nReturns an empty data block.\n"
    },
    {
      "name": "removeProject",
      "method": "POST",
      "path": "/tasks/%d/removeProject",
      "params": [
        {
          "name": "task",
          "type": "Id",
          "example_values": [
            "124816"
          ],
          "comment": "The task to remove from a project.",
          "required": true
        },
        {
          "name": "project",
          "type": "Id",
          "example_values": [
            "13579"
          ],
          "comment": "The project to remove the task from.",
          "required": true
        }
      ],
      "comment": "Removes the task from the specified project. The task will still exist\nin the system, but it will not be in the project anymore.\n\nReturns an empty data block.\n"
    },
    {
      "name": "tags",
      "method": "GET",
      "path": "/tasks/%d/tags",
      "collection": true,
      "params": [
        {
          "name": "task",
          "type": "Id",
          "example_values": [
            "124816"
          ],
          "comment": "The task to get tags on.",
          "required": true
        }
      ],
      "comment": "Returns a compact representation of all of the tags the task has.\n"
    },
    {
      "name": "addTag",
      "method": "POST",
      "path": "/tasks/%d/addTag",
      "params": [
        {
          "name": "task",
          "type": "Id",
          "example_values": [
            "124816"
          ],
          "comment": "The task to add a tag to.",
          "required": true
        },
        {
          "name": "tag",
          "type": "Id",
          "example_values": [
            "11235"
          ],
          "comment": "The tag to add to the task.",
          "required": true
        }
      ],
      "comment": "Adds a tag to a task. Returns an empty data block.\n"
    },
    {
      "name": "removeTag",
      "method": "POST",
      "path": "/tasks/%d/removeTag",
      "params": [
        {
          "name": "task",
          "type": "Id",
          "example_values": [
            "124816"
          ],
          "comment": "The task to remove a tag from.",
          "required": true
        },
        {
          "name": "tag",
          "type": "Id",
          "example_values": [
            "11235"
          ],
          "comment": "The tag to remove from the task.",
          "required": true
        }
      ],
      "comment": "Removes a tag from the task. Returns an empty data block.\n"
    },
    {
      "name": "subtasks",
      "method": "GET",
      "path": "/tasks/%d/subtasks",
      "collection": true,
      "params": [
        {
          "name": "task",
          "type": "Id",
          "example_values": [
            "124816"
          ],
          "comment": "The task to get the subtasks of.",
          "required": true
        }
      ],
      "comment": "Returns a compact representation of all of the subtasks of a task.\n"
    },
    {
      "name": "addSubtask",
      "method": "POST",
      "path": "/tasks/%d/subtasks",
      "params": [
        {
          "name": "task",
          "type": "Id",
          "example_values": [
            "124816"
          ],
          "comment": "The task to add a subtask to.",
          "required": true
        },
        {
          "name": "subtask",
          "type": "Id",
          "example_values": [
            "124816"
          ],
          "comment": "The subtask to add to the task.",
          "required": true
        }
      ],
      "comment": "Makes an existing task a subtask of another. Returns an empty data block.\n"
    },
    {
      "name": "setParent",
      "method": "POST",
      "path": "/tasks/%d/setParent",
      "no_code": true,
      "params": [
        {
          "name": "task",
          "type": "Id",
          "example_values": [
            "124816"
          ],
          "comment": "The task to change the parent of.",
          "required": true
        },
        {
          "name": "parent",
          "type": "Id",
          "example_values": [
            "124816"
          ],
          "comment": "The new parent of the task, or `null` for no parent.",
          "required": true,
          "explicit": true
        }
      ],
      "comment": "Changes the parent of a task. Each task may only be a subtask of a single\nparent, or no parent task at all. Returns an empty data block.\n"
    },
    {
      "name": "stories",
      "method": "GET",
      "path": "/tasks/%d/stories",
      "collection": true,
      "params": [
        {
          "name": "task",
          "type": "Id",
          "example_values": [
            "124816"
          ],
          "comment": "The task containing the stories to get.",
          "required": true
        }
      ],
      "comment": "Returns a compact representation of all of the stories on the task.\n"
    },
    {
      "name": "addComment",
      "method": "POST",
      "path": "/tasks/%d/stories",
      "params": [
        {
          "name": "task",
          "type": "Id",
          "example_values": [
            "124816"
          ],
          "comment": "Globally unique identifier for the task.\n",
          "required": true
        },
        {
          "name": "text",
          "type": "String",
          "required": true,
          "comment": "The plain text of the comment to add."
        }
      ],
      "comment": "Adds a comment to a task. The comment will be authored by the\ncurrently authenticated user, and timestamped when the server receives\nthe request.\n\nReturns the full record for the new story added to the task.\n"
    }
  ]
};
export = json;

