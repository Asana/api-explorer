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
    "path": "/tasks/%s/addDependencies",
    "params": [
      {
      "name": "task_gid",
      "type": "string",
      "example_values": ["321654"],
      "comment": "The task to operate on.",
      "required": true
      }
    ],
    "comment": "Marks a set of tasks as dependencies of this task, if they are not already dependencies. *A task can have at most 15 dependencies*."
  },
  {
    "name": "addDependentsForTask",
    "method": "POST",
    "path": "/tasks/%s/addDependents",
    "params": [
      {
      "name": "task_gid",
      "type": "string",
      "example_values": ["321654"],
      "comment": "The task to operate on.",
      "required": true
      }
    ],
    "comment": "Marks a set of tasks as dependents of this task, if they are not already dependents. *A task can have at most 30 dependents*."
  },
  {
    "name": "addFollowersForTask",
    "method": "POST",
    "path": "/tasks/%s/addFollowers",
    "params": [
      {
      "name": "task_gid",
      "type": "string",
      "example_values": ["321654"],
      "comment": "The task to operate on.",
      "required": true
      }
    ],
    "comment": "Adds followers to a task. Returns an empty data block. Each task can be associated with zero or more followers in the system. Requests to add/remove followers, if successful, will return the complete updated task record, described above."
  },
  {
    "name": "addProjectForTask",
    "method": "POST",
    "path": "/tasks/%s/addProject",
    "params": [
      {
      "name": "task_gid",
      "type": "string",
      "example_values": ["321654"],
      "comment": "The task to operate on.",
      "required": true
      }
    ],
    "comment": "Adds the task to the specified project, in the optional location specified. If no location arguments are given, the task will be added to the end of the project.  &#x60;addProject&#x60; can also be used to reorder a task within a project or section that already contains it.  At most one of &#x60;insert_before&#x60;, &#x60;insert_after&#x60;, or &#x60;section&#x60; should be specified. Inserting into a section in an non-order-dependent way can be done by specifying section, otherwise, to insert within a section in a particular place, specify &#x60;insert_before&#x60; or &#x60;insert_after&#x60; and a task within the section to anchor the position of this task.  Returns an empty data block."
  },
  {
    "name": "addTagForTask",
    "method": "POST",
    "path": "/tasks/%s/addTag",
    "params": [
      {
      "name": "task_gid",
      "type": "string",
      "example_values": ["321654"],
      "comment": "The task to operate on.",
      "required": true
      }
    ],
    "comment": "Adds a tag to a task. Returns an empty data block."
  },
  {
    "name": "createSubtaskForTask",
    "method": "POST",
    "path": "/tasks/%s/subtasks",
    "params": [
      {
      "name": "task_gid",
      "type": "string",
      "example_values": ["321654"],
      "comment": "The task to operate on.",
      "required": true
      }
    ],
    "comment": "Creates a new subtask and adds it to the parent task. Returns the full record for the newly created subtask."
  },
  {
    "name": "createTask",
    "method": "POST",
    "path": "/tasks",
    "params": [
    ],
    "comment": "Creating a new task is as easy as POSTing to the &#x60;/tasks&#x60; endpoint with a data block containing the fields you’d like to set on the task. Any unspecified fields will take on default values.  Every task is required to be created in a specific workspace, and this workspace cannot be changed once set. The workspace need not be set explicitly if you specify &#x60;projects&#x60; or a &#x60;parent&#x60; task instead."
  },
  {
    "name": "deleteTask",
    "method": "DELETE",
    "path": "/tasks/%s",
    "params": [
      {
      "name": "task_gid",
      "type": "string",
      "example_values": ["321654"],
      "comment": "The task to operate on.",
      "required": true
      }
    ],
    "comment": "A specific, existing task can be deleted by making a DELETE request on the URL for that task. Deleted tasks go into the “trash” of the user making the delete request. Tasks can be recovered from the trash within a period of 30 days; afterward they are completely removed from the system.  Returns an empty data record."
  },
  {
    "name": "duplicateTask",
    "method": "POST",
    "path": "/tasks/%s/duplicate",
    "params": [
      {
      "name": "task_gid",
      "type": "string",
      "example_values": ["321654"],
      "comment": "The task to operate on.",
      "required": true
      }
    ],
    "comment": "Creates and returns a job that will asynchronously handle the duplication."
  },
  {
    "name": "getDependenciesForTask",
    "method": "GET",
    "path": "/tasks/%s/dependencies",
    "params": [
      {
      "name": "task_gid",
      "type": "string",
      "example_values": ["321654"],
      "comment": "The task to operate on.",
      "required": true
      }
    ],
    "comment": "Returns the compact representations of all of the dependencies of a task."
  },
  {
    "name": "getDependentsForTask",
    "method": "GET",
    "path": "/tasks/%s/dependents",
    "params": [
      {
      "name": "task_gid",
      "type": "string",
      "example_values": ["321654"],
      "comment": "The task to operate on.",
      "required": true
      }
    ],
    "comment": "Returns the compact representations of all of the dependents of a task."
  },
  {
    "name": "getSubtasksForTask",
    "method": "GET",
    "path": "/tasks/%s/subtasks",
    "params": [
      {
      "name": "task_gid",
      "type": "string",
      "example_values": ["321654"],
      "comment": "The task to operate on.",
      "required": true
      }
    ],
    "comment": "Returns a compact representation of all of the subtasks of a task."
  },
  {
    "name": "getTask",
    "method": "GET",
    "path": "/tasks/%s",
    "params": [
      {
      "name": "task_gid",
      "type": "string",
      "example_values": ["321654"],
      "comment": "The task to operate on.",
      "required": true
      }
    ],
    "comment": "Returns the complete task record for a single task."
  },
  {
    "name": "getTasks",
    "method": "GET",
    "path": "/tasks",
    "params": [
    ],
    "comment": "Returns the compact task records for some filtered set of tasks. Use one or more of the parameters provided to filter the tasks returned. You must specify a &#x60;project&#x60; or &#x60;tag&#x60; if you do not specify &#x60;assignee&#x60; and &#x60;workspace&#x60;.  For more complex task retrieval, use [workspaces/{workspace_gid}/tasks/search](#search-tasks-in-a-workspace)."
  },
  {
    "name": "getTasksForProject",
    "method": "GET",
    "path": "/projects/%s/tasks",
    "params": [
      {
      "name": "project_gid",
      "type": "string",
      "example_values": ["1331"],
      "comment": "Globally unique identifier for the project.",
      "required": true
      }
    ],
    "comment": "Returns the compact task records for all tasks within the given project, ordered by their priority within the project. Tasks can exist in more than one project at a time."
  },
  {
    "name": "getTasksForSection",
    "method": "GET",
    "path": "/sections/%s/tasks",
    "params": [
      {
      "name": "section_gid",
      "type": "string",
      "example_values": ["321654"],
      "comment": "The globally unique identifier for the section.",
      "required": true
      }
    ],
    "comment": "*Board view only*: Returns the compact section records for all tasks within the given section."
  },
  {
    "name": "getTasksForTag",
    "method": "GET",
    "path": "/tags/%s/tasks",
    "params": [
      {
      "name": "tag_gid",
      "type": "string",
      "example_values": ["11235"],
      "comment": "Globally unique identifier for the tag.",
      "required": true
      }
    ],
    "comment": "Returns the compact task records for all tasks with the given tag. Tasks can have more than one tag at a time."
  },
  {
    "name": "getTasksForUserTaskList",
    "method": "GET",
    "path": "/user_task_lists/%s/tasks",
    "params": [
      {
      "name": "user_task_list_gid",
      "type": "string",
      "example_values": ["12345"],
      "comment": "Globally unique identifier for the user task list.",
      "required": true
      }
    ],
    "comment": "Returns the compact list of tasks in a user’s My Tasks list. The returned tasks will be in order within each assignee status group of &#x60;Inbox&#x60;, &#x60;Today&#x60;, and &#x60;Upcoming&#x60;. *Note: tasks in &#x60;Later&#x60; have a different ordering in the Asana web app than the other assignee status groups; this endpoint will still return them in list order in &#x60;Later&#x60; (differently than they show up in Asana, but the same order as in Asana’s mobile apps).* *Note: Access control is enforced for this endpoint as with all Asana API endpoints, meaning a user’s private tasks will be filtered out if the API-authenticated user does not have access to them.* *Note: Both complete and incomplete tasks are returned by default unless they are filtered out (for example, setting &#x60;completed_since&#x3D;now&#x60; will return only incomplete tasks, which is the default view for “My Tasks” in Asana.)*"
  },
  {
    "name": "removeDependenciesForTask",
    "method": "POST",
    "path": "/tasks/%s/removeDependencies",
    "params": [
      {
      "name": "task_gid",
      "type": "string",
      "example_values": ["321654"],
      "comment": "The task to operate on.",
      "required": true
      }
    ],
    "comment": "Unlinks a set of dependencies from this task."
  },
  {
    "name": "removeDependentsForTask",
    "method": "POST",
    "path": "/tasks/%s/removeDependents",
    "params": [
      {
      "name": "task_gid",
      "type": "string",
      "example_values": ["321654"],
      "comment": "The task to operate on.",
      "required": true
      }
    ],
    "comment": "Unlinks a set of dependents from this task."
  },
  {
    "name": "removeFollowerForTask",
    "method": "POST",
    "path": "/tasks/%s/removeFollowers",
    "params": [
      {
      "name": "task_gid",
      "type": "string",
      "example_values": ["321654"],
      "comment": "The task to operate on.",
      "required": true
      }
    ],
    "comment": "Removes each of the specified followers from the task if they are following. Returns the complete, updated record for the affected task."
  },
  {
    "name": "removeProjectForTask",
    "method": "POST",
    "path": "/tasks/%s/removeProject",
    "params": [
      {
      "name": "task_gid",
      "type": "string",
      "example_values": ["321654"],
      "comment": "The task to operate on.",
      "required": true
      }
    ],
    "comment": "Removes the task from the specified project. The task will still exist in the system, but it will not be in the project anymore.  Returns an empty data block."
  },
  {
    "name": "removeTagForTask",
    "method": "POST",
    "path": "/tasks/%s/removeTag",
    "params": [
      {
      "name": "task_gid",
      "type": "string",
      "example_values": ["321654"],
      "comment": "The task to operate on.",
      "required": true
      }
    ],
    "comment": "Removes a tag from a task. Returns an empty data block."
  },
  {
    "name": "searchTasksForWorkspace",
    "method": "GET",
    "path": "/workspaces/%s/tasks/search",
    "params": [
      {
      "name": "workspace_gid",
      "type": "string",
      "example_values": ["12345"],
      "comment": "Globally unique identifier for the workspace or organization.",
      "required": true
      }
    ],
    "comment": "To mirror the functionality of the Asana web app&#x27;s advanced search feature, the Asana API has a task search endpoint that allows you to build complex filters to find and retrieve the exact data you need. #### Premium access Like the Asana web product&#x27;s advance search feature, this search endpoint will only be available to premium Asana users. A user is premium if any of the following is true:  - The workspace in which the search is being performed is a premium workspace - The user is a member of a premium team inside the workspace  Even if a user is only a member of a premium team inside a non-premium workspace, search will allow them to find data anywhere in the workspace, not just inside the premium team. Making a search request using credentials of a non-premium user will result in a &#x60;402 Payment Required&#x60; error. #### Pagination Search results are not stable; repeating the same query multiple times may return the data in a different order, even if the data do not change. Because of this, the traditional [pagination](https://developers.asana.com/docs/#pagination) available elsewhere in the Asana API is not available here. However, you can paginate manually by sorting the search results by their creation time and then modifying each subsequent query to exclude data you have already seen. Page sizes are limited to a maximum of 100 items, and can be specified by the &#x60;limit&#x60; query parameter. #### Eventual consistency Changes in Asana (regardless of whether they’re made though the web product or the API) are forwarded to our search infrastructure to be indexed. This process can take between 10 and 60 seconds to complete under normal operation, and longer during some production incidents. Making a change to a task that would alter its presence in a particular search query will not be reflected immediately. This is also true of the advanced search feature in the web product. #### Rate limits You may receive a &#x60;429 Too Many Requests&#x60; response if you hit any of our [rate limits](https://developers.asana.com/docs/#rate-limits). #### Custom field parameters | Parameter name | Custom field type | Accepted type | |---|---|---| | custom_fields.{gid}.is_set | All | Boolean | | custom_fields.{gid}.value | Text | String | | custom_fields.{gid}.value | Number | Number | | custom_fields.{gid}.value | Enum | Enum option ID | | custom_fields.{gid}.starts_with | Text only | String | | custom_fields.{gid}.ends_with | Text only | String | | custom_fields.{gid}.contains | Text only | String | | custom_fields.{gid}.less_than | Number only | Number | | custom_fields.{gid}.greater_than | Number only | Number |   For example, if the gid of the custom field is 12345, these query parameter to find tasks where it is set would be &#x60;custom_fields.12345.is_set&#x3D;true&#x60;. To match an exact value for an enum custom field, use the gid of the desired enum option and not the name of the enum option: &#x60;custom_fields.12345.value&#x3D;67890&#x60;.  Searching for multiple exact matches of a custom field is not supported."
  },
  {
    "name": "setParentForTask",
    "method": "POST",
    "path": "/tasks/%s/setParent",
    "params": [
      {
      "name": "task_gid",
      "type": "string",
      "example_values": ["321654"],
      "comment": "The task to operate on.",
      "required": true
      }
    ],
    "comment": "parent, or no parent task at all. Returns an empty data block. When using &#x60;insert_before&#x60; and &#x60;insert_after&#x60;, at most one of those two options can be specified, and they must already be subtasks of the parent."
  },
  {
    "name": "updateTask",
    "method": "PUT",
    "path": "/tasks/%s",
    "params": [
      {
      "name": "task_gid",
      "type": "string",
      "example_values": ["321654"],
      "comment": "The task to operate on.",
      "required": true
      }
    ],
    "comment": "A specific, existing task can be updated by making a PUT request on the URL for that task. Only the fields provided in the &#x60;data&#x60; block will be updated; any unspecified fields will remain unchanged.  When using this method, it is best to specify only those fields you wish to change, or else you may overwrite changes made by another user since you last retrieved the task.  Returns the complete updated task record."
  },
  ]
}
export = resourceBase;