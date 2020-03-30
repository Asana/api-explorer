/// <reference path="../../src/resources/interfaces.ts" />

/* tslint:disable:max-line-length */
/* tslint:disable:eofline */
var resourceBase = <Resource>{
  "name": "projects",
  "comment": "",
  "properties":[],
  "actions": [
  {
    "name": "addCustomFieldSettingForProject",
    "method": "post",
    "path": "/projects/${encodeURIComponent(String(projectGid))}/addCustomFieldSetting",
    "params": [
      {
      "name": "project_gid",
      "type": "string",
      "example_values": [""],
      "comment": "Globally unique identifier for the project.",
      "required": true
      }
    ],
    "comment": "Custom fields are associated with projects by way of custom field settings.  This method creates a setting for the project."
  },
  {
    "name": "addFollowersForProject",
    "method": "post",
    "path": "/projects/${encodeURIComponent(String(projectGid))}/addFollowers",
    "params": [
      {
      "name": "project_gid",
      "type": "string",
      "example_values": [""],
      "comment": "Globally unique identifier for the project.",
      "required": true
      }
    ],
    "comment": "Adds the specified list of users as followers to the project. Followers are a subset of members, therefore if the users are not already members of the project they will also become members as a result of this operation. Returns the updated project record."
  },
  {
    "name": "addMembersForProject",
    "method": "post",
    "path": "/projects/${encodeURIComponent(String(projectGid))}/addMembers",
    "params": [
      {
      "name": "project_gid",
      "type": "string",
      "example_values": [""],
      "comment": "Globally unique identifier for the project.",
      "required": true
      }
    ],
    "comment": "Adds the specified list of users as members of the project. Returns the updated project record."
  },
  {
    "name": "createProject",
    "method": "post",
    "path": "/projects",
    "params": [
    ],
    "comment": "Create a new project in a workspace or team.  Every project is required to be created in a specific workspace or organization, and this cannot be changed once set. Note that you can use the &#x60;workspace&#x60; parameter regardless of whether or not it is an organization.  If the workspace for your project is an organization, you must also supply a &#x60;team&#x60; to share the project with.  Returns the full record of the newly created project."
  },
  {
    "name": "createProjectForTeam",
    "method": "post",
    "path": "/teams/${encodeURIComponent(String(teamGid))}/projects",
    "params": [
      {
      "name": "team_gid",
      "type": "string",
      "example_values": [""],
      "comment": "Globally unique identifier for the team.",
      "required": true
      }
    ],
    "comment": "Creates a project shared with the given team.  Returns the full record of the newly created project."
  },
  {
    "name": "createProjectForWorkspace",
    "method": "post",
    "path": "/workspaces/${encodeURIComponent(String(workspaceGid))}/projects",
    "params": [
      {
      "name": "workspace_gid",
      "type": "string",
      "example_values": [""],
      "comment": "Globally unique identifier for the workspace or organization.",
      "required": true
      }
    ],
    "comment": "Returns the compact project records for all projects in the workspace.  If the workspace for your project is an organization, you must also supply a team to share the project with.  Returns the full record of the newly created project."
  },
  {
    "name": "deleteProject",
    "method": "delete",
    "path": "/projects/${encodeURIComponent(String(projectGid))}",
    "params": [
      {
      "name": "project_gid",
      "type": "string",
      "example_values": [""],
      "comment": "Globally unique identifier for the project.",
      "required": true
      }
    ],
    "comment": "A specific, existing project can be deleted by making a DELETE request on the URL for that project.  Returns an empty data record."
  },
  {
    "name": "duplicateProject",
    "method": "post",
    "path": "/projects/${encodeURIComponent(String(projectGid))}/duplicate",
    "params": [
      {
      "name": "project_gid",
      "type": "string",
      "example_values": [""],
      "comment": "Globally unique identifier for the project.",
      "required": true
      }
    ],
    "comment": "Creates and returns a job that will asynchronously handle the duplication."
  },
  {
    "name": "getProject",
    "method": "get",
    "path": "/projects/${encodeURIComponent(String(projectGid))}",
    "params": [
      {
      "name": "project_gid",
      "type": "string",
      "example_values": [""],
      "comment": "Globally unique identifier for the project.",
      "required": true
      }
    ],
    "comment": "Returns the complete project record for a single project."
  },
  {
    "name": "getProjects",
    "method": "get",
    "path": "/projects",
    "params": [
    ],
    "comment": "Returns the compact project records for some filtered set of projects. Use one or more of the parameters provided to filter the projects returned."
  },
  {
    "name": "getProjectsForTask",
    "method": "get",
    "path": "/tasks/${encodeURIComponent(String(taskGid))}/projects",
    "params": [
      {
      "name": "task_gid",
      "type": "string",
      "example_values": [""],
      "comment": "The task to operate on.",
      "required": true
      }
    ],
    "comment": "Returns a compact representation of all of the projects the task is in."
  },
  {
    "name": "getProjectsForTeam",
    "method": "get",
    "path": "/teams/${encodeURIComponent(String(teamGid))}/projects",
    "params": [
      {
      "name": "team_gid",
      "type": "string",
      "example_values": [""],
      "comment": "Globally unique identifier for the team.",
      "required": true
      }
    ],
    "comment": "Returns the compact project records for all projects in the team."
  },
  {
    "name": "getProjectsForWorkspace",
    "method": "get",
    "path": "/workspaces/${encodeURIComponent(String(workspaceGid))}/projects",
    "params": [
      {
      "name": "workspace_gid",
      "type": "string",
      "example_values": [""],
      "comment": "Globally unique identifier for the workspace or organization.",
      "required": true
      }
    ],
    "comment": "Returns the compact project records for all projects in the workspace."
  },
  {
    "name": "getTaskCountsForProject",
    "method": "get",
    "path": "/projects/${encodeURIComponent(String(projectGid))}/task_counts",
    "params": [
      {
      "name": "project_gid",
      "type": "string",
      "example_values": [""],
      "comment": "Globally unique identifier for the project.",
      "required": true
      }
    ],
    "comment": "Get an object that holds task count fields. **All fields are excluded by default**. You must [opt in](#input-output-options) using &#x60;opt_fields&#x60; to get any information from this endpoint.  This endpoint has an additional [rate limit](#standard-rate-limits) and each field counts especially high against our [cost limits](#cost-limits).  Milestones are just tasks, so they are included in the &#x60;num_tasks&#x60;, &#x60;num_incomplete_tasks&#x60;, and &#x60;num_completed_tasks&#x60; counts."
  },
  {
    "name": "removeCustomFieldSettingForProject",
    "method": "post",
    "path": "/projects/${encodeURIComponent(String(projectGid))}/removeCustomFieldSetting",
    "params": [
      {
      "name": "project_gid",
      "type": "string",
      "example_values": [""],
      "comment": "Globally unique identifier for the project.",
      "required": true
      }
    ],
    "comment": "Removes a custom field setting from a project."
  },
  {
    "name": "removeFollowersForProject",
    "method": "post",
    "path": "/projects/${encodeURIComponent(String(projectGid))}/removeFollowers",
    "params": [
      {
      "name": "project_gid",
      "type": "string",
      "example_values": [""],
      "comment": "Globally unique identifier for the project.",
      "required": true
      }
    ],
    "comment": "Removes the specified list of users from following the project, this will not affect project membership status. Returns the updated project record."
  },
  {
    "name": "removeMembersForProject",
    "method": "post",
    "path": "/projects/${encodeURIComponent(String(projectGid))}/removeMembers",
    "params": [
      {
      "name": "project_gid",
      "type": "string",
      "example_values": [""],
      "comment": "Globally unique identifier for the project.",
      "required": true
      }
    ],
    "comment": "Removes the specified list of users from members of the project. Returns the updated project record."
  },
  {
    "name": "updateProject",
    "method": "put",
    "path": "/projects/${encodeURIComponent(String(projectGid))}",
    "params": [
      {
      "name": "project_gid",
      "type": "string",
      "example_values": [""],
      "comment": "Globally unique identifier for the project.",
      "required": true
      }
    ],
    "comment": "A specific, existing project can be updated by making a PUT request on the URL for that project. Only the fields provided in the &#x60;data&#x60; block will be updated; any unspecified fields will remain unchanged.  When using this method, it is best to specify only those fields you wish to change, or else you may overwrite changes made by another user since you last retrieved the task.  Returns the complete updated project record."
  },
  ]
}
export = resourceBase;