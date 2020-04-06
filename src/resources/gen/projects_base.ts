/// <reference path="../interfaces.ts" />

/* tslint:disable:max-line-length */
/* tslint:disable:eofline */
var resourceBase = <Resource>{
  "name": "projects",
  "comment": "",
  "properties":[],
  "actions": [
  {
    "name": "addCustomFieldSettingForProject",
    "method": "POST",
    "path": "/projects/%s/addCustomFieldSetting",
    "params": [
      {
      "name": "project_gid",
      "type": "string",
      "example_values": ["1331"],
      "comment": "Globally unique identifier for the project.",
      "required": true
      },
    ],
    "comment": "Add a custom field to a project"
  },
  {
    "name": "addFollowersForProject",
    "method": "POST",
    "path": "/projects/%s/addFollowers",
    "params": [
      {
      "name": "project_gid",
      "type": "string",
      "example_values": ["1331"],
      "comment": "Globally unique identifier for the project.",
      "required": true
      },
    ],
    "comment": "Add followers to a project"
  },
  {
    "name": "addMembersForProject",
    "method": "POST",
    "path": "/projects/%s/addMembers",
    "params": [
      {
      "name": "project_gid",
      "type": "string",
      "example_values": ["1331"],
      "comment": "Globally unique identifier for the project.",
      "required": true
      },
    ],
    "comment": "Add users to a project"
  },
  {
    "name": "createProject",
    "method": "POST",
    "path": "/projects",
    "params": [
    ],
    "comment": "Create a project"
  },
  {
    "name": "createProjectForTeam",
    "method": "POST",
    "path": "/teams/%s/projects",
    "params": [
      {
      "name": "team_gid",
      "type": "string",
      "example_values": ["159874"],
      "comment": "Globally unique identifier for the team.",
      "required": true
      },
    ],
    "comment": "Create a project in a team"
  },
  {
    "name": "createProjectForWorkspace",
    "method": "POST",
    "path": "/workspaces/%s/projects",
    "params": [
      {
      "name": "workspace_gid",
      "type": "string",
      "example_values": ["12345"],
      "comment": "Globally unique identifier for the workspace or organization.",
      "required": true
      },
    ],
    "comment": "Create a project in a workspace"
  },
  {
    "name": "deleteProject",
    "method": "DELETE",
    "path": "/projects/%s",
    "params": [
      {
      "name": "project_gid",
      "type": "string",
      "example_values": ["1331"],
      "comment": "Globally unique identifier for the project.",
      "required": true
      },
    ],
    "comment": "Delete a project"
  },
  {
    "name": "duplicateProject",
    "method": "POST",
    "path": "/projects/%s/duplicate",
    "params": [
      {
      "name": "project_gid",
      "type": "string",
      "example_values": ["1331"],
      "comment": "Globally unique identifier for the project.",
      "required": true
      },
    ],
    "comment": "Duplicate a project"
  },
  {
    "name": "getProject",
    "method": "GET",
    "path": "/projects/%s",
    "params": [
      {
      "name": "project_gid",
      "type": "string",
      "example_values": ["1331"],
      "comment": "Globally unique identifier for the project.",
      "required": true
      },
    ],
    "comment": "Get a project"
  },
  {
    "name": "getProjects",
    "method": "GET",
    "path": "/projects",
    "params": [
      {
      "name": "archived",
      "type": "boolean",
      "example_values": [false],
      "comment": "Only return projects whose &#x60;archived&#x60; field takes on the value of this parameter.",
      "required": false
      },
      {
      "name": "team",
      "type": "string",
      "example_values": ["14916"],
      "comment": "The team to filter projects on.",
      "required": false
      },
      {
      "name": "workspace",
      "type": "string",
      "example_values": ["1331"],
      "comment": "The workspace or organization to filter projects on.",
      "required": false
      },
    ],
    "comment": "Get multiple projects"
  },
  {
    "name": "getProjectsForTask",
    "method": "GET",
    "path": "/tasks/%s/projects",
    "params": [
      {
      "name": "task_gid",
      "type": "string",
      "example_values": ["321654"],
      "comment": "The task to operate on.",
      "required": true
      },
    ],
    "comment": "Get projects a task is in"
  },
  {
    "name": "getProjectsForTeam",
    "method": "GET",
    "path": "/teams/%s/projects",
    "params": [
      {
      "name": "team_gid",
      "type": "string",
      "example_values": ["159874"],
      "comment": "Globally unique identifier for the team.",
      "required": true
      },
      {
      "name": "archived",
      "type": "boolean",
      "example_values": [false],
      "comment": "Only return projects whose &#x60;archived&#x60; field takes on the value of this parameter.",
      "required": false
      },
    ],
    "comment": "Get a team&#x27;s projects"
  },
  {
    "name": "getProjectsForWorkspace",
    "method": "GET",
    "path": "/workspaces/%s/projects",
    "params": [
      {
      "name": "workspace_gid",
      "type": "string",
      "example_values": ["12345"],
      "comment": "Globally unique identifier for the workspace or organization.",
      "required": true
      },
      {
      "name": "archived",
      "type": "boolean",
      "example_values": [false],
      "comment": "Only return projects whose &#x60;archived&#x60; field takes on the value of this parameter.",
      "required": false
      },
    ],
    "comment": "Get all projects in a workspace"
  },
  {
    "name": "getTaskCountsForProject",
    "method": "GET",
    "path": "/projects/%s/task_counts",
    "params": [
      {
      "name": "project_gid",
      "type": "string",
      "example_values": ["1331"],
      "comment": "Globally unique identifier for the project.",
      "required": true
      },
    ],
    "comment": "Get task count of a project"
  },
  {
    "name": "removeCustomFieldSettingForProject",
    "method": "POST",
    "path": "/projects/%s/removeCustomFieldSetting",
    "params": [
      {
      "name": "project_gid",
      "type": "string",
      "example_values": ["1331"],
      "comment": "Globally unique identifier for the project.",
      "required": true
      },
    ],
    "comment": "Remove a custom field from a project"
  },
  {
    "name": "removeFollowersForProject",
    "method": "POST",
    "path": "/projects/%s/removeFollowers",
    "params": [
      {
      "name": "project_gid",
      "type": "string",
      "example_values": ["1331"],
      "comment": "Globally unique identifier for the project.",
      "required": true
      },
    ],
    "comment": "Remove followers from a project"
  },
  {
    "name": "removeMembersForProject",
    "method": "POST",
    "path": "/projects/%s/removeMembers",
    "params": [
      {
      "name": "project_gid",
      "type": "string",
      "example_values": ["1331"],
      "comment": "Globally unique identifier for the project.",
      "required": true
      },
    ],
    "comment": "Remove users from a project"
  },
  {
    "name": "updateProject",
    "method": "PUT",
    "path": "/projects/%s",
    "params": [
      {
      "name": "project_gid",
      "type": "string",
      "example_values": ["1331"],
      "comment": "Globally unique identifier for the project.",
      "required": true
      },
    ],
    "comment": "Update a project"
  },
  ]
}
export = resourceBase;
