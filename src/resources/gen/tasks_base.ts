/// <reference path="../interfaces.ts" />

/* tslint:disable:max-line-length */
/* tslint:disable:eofline */
var resourceBase = <Resource>{
  "name": "tasks",
  "comment": "",
  "properties":[],
  "actions": [
  {
    "name": "addDependenciesForTask",
    "method": "POST",
    "collection": false,
    "path": "/tasks/%s/addDependencies",
    "params": [
      {
      "name": "task_gid",
      "type": "string",
      "example_values": ["321654"],
      "comment": "The task to operate on.",
      "required": true
      },
    ],
    "comment": "Set dependencies for a task"
  },
  {
    "name": "addDependentsForTask",
    "method": "POST",
    "collection": false,
    "path": "/tasks/%s/addDependents",
    "params": [
      {
      "name": "task_gid",
      "type": "string",
      "example_values": ["321654"],
      "comment": "The task to operate on.",
      "required": true
      },
    ],
    "comment": "Set dependents for a task"
  },
  {
    "name": "addFollowersForTask",
    "method": "POST",
    "collection": false,
    "path": "/tasks/%s/addFollowers",
    "params": [
      {
      "name": "task_gid",
      "type": "string",
      "example_values": ["321654"],
      "comment": "The task to operate on.",
      "required": true
      },
    ],
    "comment": "Add followers to a task"
  },
  {
    "name": "addProjectForTask",
    "method": "POST",
    "collection": false,
    "path": "/tasks/%s/addProject",
    "params": [
      {
      "name": "task_gid",
      "type": "string",
      "example_values": ["321654"],
      "comment": "The task to operate on.",
      "required": true
      },
    ],
    "comment": "Add a project to a task"
  },
  {
    "name": "addTagForTask",
    "method": "POST",
    "collection": false,
    "path": "/tasks/%s/addTag",
    "params": [
      {
      "name": "task_gid",
      "type": "string",
      "example_values": ["321654"],
      "comment": "The task to operate on.",
      "required": true
      },
    ],
    "comment": "Add a tag to a task"
  },
  {
    "name": "createSubtaskForTask",
    "method": "POST",
    "collection": false,
    "path": "/tasks/%s/subtasks",
    "params": [
      {
      "name": "task_gid",
      "type": "string",
      "example_values": ["321654"],
      "comment": "The task to operate on.",
      "required": true
      },
    ],
    "comment": "Create a subtask"
  },
  {
    "name": "createTask",
    "method": "POST",
    "collection": false,
    "path": "/tasks",
    "params": [
    ],
    "comment": "Create a task"
  },
  {
    "name": "deleteTask",
    "method": "DELETE",
    "collection": false,
    "path": "/tasks/%s",
    "params": [
      {
      "name": "task_gid",
      "type": "string",
      "example_values": ["321654"],
      "comment": "The task to operate on.",
      "required": true
      },
    ],
    "comment": "Delete a task"
  },
  {
    "name": "duplicateTask",
    "method": "POST",
    "collection": false,
    "path": "/tasks/%s/duplicate",
    "params": [
      {
      "name": "task_gid",
      "type": "string",
      "example_values": ["321654"],
      "comment": "The task to operate on.",
      "required": true
      },
    ],
    "comment": "Duplicate a task"
  },
  {
    "name": "getDependenciesForTask",
    "method": "GET",
    "collection": true||false,
    "path": "/tasks/%s/dependencies",
    "params": [
      {
      "name": "task_gid",
      "type": "string",
      "example_values": ["321654"],
      "comment": "The task to operate on.",
      "required": true
      },
    ],
    "comment": "Get dependencies from a task"
  },
  {
    "name": "getDependentsForTask",
    "method": "GET",
    "collection": true||false,
    "path": "/tasks/%s/dependents",
    "params": [
      {
      "name": "task_gid",
      "type": "string",
      "example_values": ["321654"],
      "comment": "The task to operate on.",
      "required": true
      },
    ],
    "comment": "Get dependents from a task"
  },
  {
    "name": "getSubtasksForTask",
    "method": "GET",
    "collection": true||false,
    "path": "/tasks/%s/subtasks",
    "params": [
      {
      "name": "task_gid",
      "type": "string",
      "example_values": ["321654"],
      "comment": "The task to operate on.",
      "required": true
      },
    ],
    "comment": "Get subtasks from a task"
  },
  {
    "name": "getTask",
    "method": "GET",
    "collection": false,
    "path": "/tasks/%s",
    "params": [
      {
      "name": "task_gid",
      "type": "string",
      "example_values": ["321654"],
      "comment": "The task to operate on.",
      "required": true
      },
    ],
    "comment": "Get a task"
  },
  {
    "name": "getTasks",
    "method": "GET",
    "collection": true||false,
    "path": "/tasks",
    "params": [
      {
      "name": "modified_since",
      "type": "Date",
      "example_values": ["2012-02-22T02:06:58.158Z"],
      "comment": "Only return tasks that have been modified since the given time.  *Note: A task is considered “modified” if any of its properties change, or associations between it and other objects are modified (e.g.  a task being added to a project). A task is not considered modified just because another object it is associated with (e.g. a subtask) is modified. Actions that count as modifying the task include assigning, renaming, completing, and adding stories.*",
      "required": false
      },
      {
      "name": "completed_since",
      "type": "Date",
      "example_values": [],
      "comment": "Only return tasks that are either incomplete or that have been completed since this time.",
      "required": false
      },
      {
      "name": "workspace",
      "type": "string",
      "example_values": ["321654"],
      "comment": "The workspace to filter tasks on. *Note: If you specify &#x60;workspace&#x60;, you must also specify the &#x60;assignee&#x60; to filter on.*",
      "required": false
      },
      {
      "name": "section",
      "type": "string",
      "example_values": ["321654"],
      "comment": "The section to filter tasks on. *Note: Currently, this is only supported in board views.*",
      "required": false
      },
      {
      "name": "project",
      "type": "string",
      "example_values": ["321654"],
      "comment": "The project to filter tasks on.",
      "required": false
      },
      {
      "name": "assignee",
      "type": "string",
      "example_values": ["14641"],
      "comment": "The assignee to filter tasks on. *Note: If you specify &#x60;assignee&#x60;, you must also specify the &#x60;workspace&#x60; to filter on.*",
      "required": false
      },
    ],
    "comment": "Get multiple tasks"
  },
  {
    "name": "getTasksForProject",
    "method": "GET",
    "collection": true||false,
    "path": "/projects/%s/tasks",
    "params": [
      {
      "name": "project_gid",
      "type": "string",
      "example_values": ["1331"],
      "comment": "Globally unique identifier for the project.",
      "required": true
      },
    ],
    "comment": "Get tasks from a project"
  },
  {
    "name": "getTasksForSection",
    "method": "GET",
    "collection": true||false,
    "path": "/sections/%s/tasks",
    "params": [
      {
      "name": "section_gid",
      "type": "string",
      "example_values": ["321654"],
      "comment": "The globally unique identifier for the section.",
      "required": true
      },
    ],
    "comment": "Get tasks from a section"
  },
  {
    "name": "getTasksForTag",
    "method": "GET",
    "collection": true||false,
    "path": "/tags/%s/tasks",
    "params": [
      {
      "name": "tag_gid",
      "type": "string",
      "example_values": ["11235"],
      "comment": "Globally unique identifier for the tag.",
      "required": true
      },
    ],
    "comment": "Get tasks from a tag"
  },
  {
    "name": "getTasksForUserTaskList",
    "method": "GET",
    "collection": true||false,
    "path": "/user_task_lists/%s/tasks",
    "params": [
      {
      "name": "user_task_list_gid",
      "type": "string",
      "example_values": ["12345"],
      "comment": "Globally unique identifier for the user task list.",
      "required": true
      },
      {
      "name": "completed_since",
      "type": "string",
      "example_values": ["2012-02-22T02:06:58.158Z"],
      "comment": "Only return tasks that are either incomplete or that have been completed since this time. Accepts a date-time string or the keyword *now*. ",
      "required": false
      },
    ],
    "comment": "Get tasks from a user task list"
  },
  {
    "name": "removeDependenciesForTask",
    "method": "POST",
    "collection": false,
    "path": "/tasks/%s/removeDependencies",
    "params": [
      {
      "name": "task_gid",
      "type": "string",
      "example_values": ["321654"],
      "comment": "The task to operate on.",
      "required": true
      },
    ],
    "comment": "Unlink dependencies from a task"
  },
  {
    "name": "removeDependentsForTask",
    "method": "POST",
    "collection": false,
    "path": "/tasks/%s/removeDependents",
    "params": [
      {
      "name": "task_gid",
      "type": "string",
      "example_values": ["321654"],
      "comment": "The task to operate on.",
      "required": true
      },
    ],
    "comment": "Unlink dependents from a task"
  },
  {
    "name": "removeFollowerForTask",
    "method": "POST",
    "collection": false,
    "path": "/tasks/%s/removeFollowers",
    "params": [
      {
      "name": "task_gid",
      "type": "string",
      "example_values": ["321654"],
      "comment": "The task to operate on.",
      "required": true
      },
    ],
    "comment": "Remove followers from a task"
  },
  {
    "name": "removeProjectForTask",
    "method": "POST",
    "collection": false,
    "path": "/tasks/%s/removeProject",
    "params": [
      {
      "name": "task_gid",
      "type": "string",
      "example_values": ["321654"],
      "comment": "The task to operate on.",
      "required": true
      },
    ],
    "comment": "Remove a project from a task"
  },
  {
    "name": "removeTagForTask",
    "method": "POST",
    "collection": false,
    "path": "/tasks/%s/removeTag",
    "params": [
      {
      "name": "task_gid",
      "type": "string",
      "example_values": ["321654"],
      "comment": "The task to operate on.",
      "required": true
      },
    ],
    "comment": "Remove a tag from a task"
  },
  {
    "name": "searchTasksForWorkspace",
    "method": "GET",
    "collection": false,
    "path": "/workspaces/%s/tasks/search",
    "params": [
      {
      "name": "workspace_gid",
      "type": "string",
      "example_values": ["12345"],
      "comment": "Globally unique identifier for the workspace or organization.",
      "required": true
      },
      {
      "name": "sort_ascending",
      "type": "boolean",
      "example_values": [true],
      "comment": "Default &#x60;false&#x60;",
      "required": false
      },
      {
      "name": "sort_by",
      "type": "string",
      "example_values": ["likes"],
      "comment": "One of &#x60;due_date&#x60;, &#x60;created_at&#x60;, &#x60;completed_at&#x60;, &#x60;likes&#x60;, or &#x60;modified_at&#x60;, defaults to &#x60;modified_at&#x60;",
      "required": false
      },
      {
      "name": "is_subtask",
      "type": "boolean",
      "example_values": [false],
      "comment": "Filter to subtasks",
      "required": false
      },
      {
      "name": "completed",
      "type": "boolean",
      "example_values": [false],
      "comment": "Filter to completed tasks",
      "required": false
      },
      {
      "name": "has_attachment",
      "type": "boolean",
      "example_values": [false],
      "comment": "Filter to tasks with attachments",
      "required": false
      },
      {
      "name": "is_blocked",
      "type": "boolean",
      "example_values": [false],
      "comment": "Filter to tasks with incomplete dependencies",
      "required": false
      },
      {
      "name": "is_blocking",
      "type": "boolean",
      "example_values": [false],
      "comment": "Filter to incomplete tasks with dependents",
      "required": false
      },
      {
      "name": "modified_at.after",
      "type": "Date",
      "example_values": ["2019-04-15T01:01:46.055Z"],
      "comment": "ISO 8601 datetime string",
      "required": false
      },
      {
      "name": "modified_at.before",
      "type": "Date",
      "example_values": ["2019-04-15T01:01:46.055Z"],
      "comment": "ISO 8601 datetime string",
      "required": false
      },
      {
      "name": "modified_on",
      "type": "string",
      "example_values": ["2019-09-15"],
      "comment": "ISO 8601 date string or &#x60;null&#x60;",
      "required": false
      },
      {
      "name": "modified_on.after",
      "type": "string",
      "example_values": ["2019-09-15"],
      "comment": "ISO 8601 date string",
      "required": false
      },
      {
      "name": "modified_on.before",
      "type": "string",
      "example_values": ["2019-09-15"],
      "comment": "ISO 8601 date string",
      "required": false
      },
      {
      "name": "completed_at.after",
      "type": "Date",
      "example_values": ["2019-04-15T01:01:46.055Z"],
      "comment": "ISO 8601 datetime string",
      "required": false
      },
      {
      "name": "completed_at.before",
      "type": "Date",
      "example_values": ["2019-04-15T01:01:46.055Z"],
      "comment": "ISO 8601 datetime string",
      "required": false
      },
      {
      "name": "completed_on",
      "type": "string",
      "example_values": ["2019-09-15"],
      "comment": "ISO 8601 date string or &#x60;null&#x60;",
      "required": false
      },
      {
      "name": "completed_on.after",
      "type": "string",
      "example_values": ["2019-09-15"],
      "comment": "ISO 8601 date string",
      "required": false
      },
      {
      "name": "completed_on.before",
      "type": "string",
      "example_values": ["2019-09-15"],
      "comment": "ISO 8601 date string",
      "required": false
      },
      {
      "name": "created_at.after",
      "type": "Date",
      "example_values": ["2019-04-15T01:01:46.055Z"],
      "comment": "ISO 8601 datetime string",
      "required": false
      },
      {
      "name": "created_at.before",
      "type": "Date",
      "example_values": ["2019-04-15T01:01:46.055Z"],
      "comment": "ISO 8601 datetime string",
      "required": false
      },
      {
      "name": "created_on",
      "type": "string",
      "example_values": ["2019-09-15"],
      "comment": "ISO 8601 date string or &#x60;null&#x60;",
      "required": false
      },
      {
      "name": "created_on.after",
      "type": "string",
      "example_values": ["2019-09-15"],
      "comment": "ISO 8601 date string",
      "required": false
      },
      {
      "name": "created_on.before",
      "type": "string",
      "example_values": ["2019-09-15"],
      "comment": "ISO 8601 date string",
      "required": false
      },
      {
      "name": "start_on",
      "type": "string",
      "example_values": ["2019-09-15"],
      "comment": "ISO 8601 date string or &#x60;null&#x60;",
      "required": false
      },
      {
      "name": "start_on.after",
      "type": "string",
      "example_values": ["2019-09-15"],
      "comment": "ISO 8601 date string",
      "required": false
      },
      {
      "name": "start_on.before",
      "type": "string",
      "example_values": ["2019-09-15"],
      "comment": "ISO 8601 date string",
      "required": false
      },
      {
      "name": "due_at.after",
      "type": "Date",
      "example_values": ["2019-04-15T01:01:46.055Z"],
      "comment": "ISO 8601 datetime string",
      "required": false
      },
      {
      "name": "due_at.before",
      "type": "Date",
      "example_values": ["2019-04-15T01:01:46.055Z"],
      "comment": "ISO 8601 datetime string",
      "required": false
      },
      {
      "name": "due_on",
      "type": "string",
      "example_values": ["2019-09-15"],
      "comment": "ISO 8601 date string or &#x60;null&#x60;",
      "required": false
      },
      {
      "name": "due_on.after",
      "type": "string",
      "example_values": ["2019-09-15"],
      "comment": "ISO 8601 date string",
      "required": false
      },
      {
      "name": "due_on.before",
      "type": "string",
      "example_values": ["2019-09-15"],
      "comment": "ISO 8601 date string",
      "required": false
      },
      {
      "name": "commented_on_by.not",
      "type": "string",
      "example_values": ["12345,23456,34567"],
      "comment": "Comma-separated list of user identifiers",
      "required": false
      },
      {
      "name": "liked_by.not",
      "type": "string",
      "example_values": ["12345,23456,34567"],
      "comment": "Comma-separated list of user identifiers",
      "required": false
      },
      {
      "name": "assigned_by.not",
      "type": "string",
      "example_values": ["12345,23456,34567"],
      "comment": "Comma-separated list of user identifiers",
      "required": false
      },
      {
      "name": "assigned_by.any",
      "type": "string",
      "example_values": ["12345,23456,34567"],
      "comment": "Comma-separated list of user identifiers",
      "required": false
      },
      {
      "name": "created_by.not",
      "type": "string",
      "example_values": ["12345,23456,34567"],
      "comment": "Comma-separated list of user identifiers",
      "required": false
      },
      {
      "name": "created_by.any",
      "type": "string",
      "example_values": ["12345,23456,34567"],
      "comment": "Comma-separated list of user identifiers",
      "required": false
      },
      {
      "name": "followers.not",
      "type": "string",
      "example_values": ["12345,23456,34567"],
      "comment": "Comma-separated list of user identifiers",
      "required": false
      },
      {
      "name": "teams.any",
      "type": "string",
      "example_values": ["12345,23456,34567"],
      "comment": "Comma-separated list of team IDs",
      "required": false
      },
      {
      "name": "tags.all",
      "type": "string",
      "example_values": ["12345,23456,34567"],
      "comment": "Comma-separated list of tag IDs",
      "required": false
      },
      {
      "name": "tags.not",
      "type": "string",
      "example_values": ["12345,23456,34567"],
      "comment": "Comma-separated list of tag IDs",
      "required": false
      },
      {
      "name": "tags.any",
      "type": "string",
      "example_values": ["12345,23456,34567"],
      "comment": "Comma-separated list of tag IDs",
      "required": false
      },
      {
      "name": "sections.all",
      "type": "string",
      "example_values": ["12345,23456,34567"],
      "comment": "Comma-separated list of section or column IDs",
      "required": false
      },
      {
      "name": "sections.not",
      "type": "string",
      "example_values": ["12345,23456,34567"],
      "comment": "Comma-separated list of section or column IDs",
      "required": false
      },
      {
      "name": "sections.any",
      "type": "string",
      "example_values": ["12345,23456,34567"],
      "comment": "Comma-separated list of section or column IDs",
      "required": false
      },
      {
      "name": "projects.all",
      "type": "string",
      "example_values": ["12345,23456,34567"],
      "comment": "Comma-separated list of project IDs",
      "required": false
      },
      {
      "name": "projects.not",
      "type": "string",
      "example_values": ["12345,23456,34567"],
      "comment": "Comma-separated list of project IDs",
      "required": false
      },
      {
      "name": "projects.any",
      "type": "string",
      "example_values": ["12345,23456,34567"],
      "comment": "Comma-separated list of project IDs",
      "required": false
      },
      {
      "name": "portfolios.any",
      "type": "string",
      "example_values": ["12345,23456,34567"],
      "comment": "Comma-separated list of portfolio IDs",
      "required": false
      },
      {
      "name": "assignee.not",
      "type": "string",
      "example_values": ["12345,23456,34567"],
      "comment": "Comma-separated list of user identifiers",
      "required": false
      },
      {
      "name": "assignee.any",
      "type": "string",
      "example_values": ["12345,23456,34567"],
      "comment": "Comma-separated list of user identifiers",
      "required": false
      },
      {
      "name": "resource_subtype",
      "type": "string",
      "example_values": [],
      "comment": "Filters results by the task&#x27;s resource_subtype",
      "required": false
      },
      {
      "name": "text",
      "type": "string",
      "example_values": ["Bug"],
      "comment": "Performs full-text search on both task name and description",
      "required": false
      },
    ],
    "comment": "Search tasks in a workspace"
  },
  {
    "name": "setParentForTask",
    "method": "POST",
    "collection": false,
    "path": "/tasks/%s/setParent",
    "params": [
      {
      "name": "task_gid",
      "type": "string",
      "example_values": ["321654"],
      "comment": "The task to operate on.",
      "required": true
      },
    ],
    "comment": "Set the parent of a task"
  },
  {
    "name": "updateTask",
    "method": "PUT",
    "collection": false,
    "path": "/tasks/%s",
    "params": [
      {
      "name": "task_gid",
      "type": "string",
      "example_values": ["321654"],
      "comment": "The task to operate on.",
      "required": true
      },
    ],
    "comment": "Update a task"
  },
  ]
}
export = resourceBase;
