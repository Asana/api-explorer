/// <reference path="../../src/resources/interfaces.ts" />

/* tslint:disable:max-line-length */
/* tslint:disable:eofline */
var resourceBase = <Resource>{
  "name": "sections",
  "comment": "",
  "properties":[],
  "actions": [
  {
    "name": "addTaskForSection",
    "method": "post",
    "path": "/sections/${encodeURIComponent(String(sectionGid))}/addTask",
    "params": [
      {
      "name": "section_gid",
      "type": "string",
      "example_values": [""],
      "comment": "The globally unique identifier for the section.",
      "required": true
      }
    ],
    "comment": "Add a task to a specific, existing section. This will remove the task from other sections of the project.  The task will be inserted at the top of a section unless an insert_before or insert_after parameter is declared.  This does not work for separators (tasks with the resource_subtype of section)."
  },
  {
    "name": "createSectionForProject",
    "method": "post",
    "path": "/projects/${encodeURIComponent(String(projectGid))}/sections",
    "params": [
      {
      "name": "project_gid",
      "type": "string",
      "example_values": [""],
      "comment": "Globally unique identifier for the project.",
      "required": true
      }
    ],
    "comment": "Creates a new section in a project. Returns the full record of the newly created section."
  },
  {
    "name": "deleteSection",
    "method": "delete",
    "path": "/sections/${encodeURIComponent(String(sectionGid))}",
    "params": [
      {
      "name": "section_gid",
      "type": "string",
      "example_values": [""],
      "comment": "The globally unique identifier for the section.",
      "required": true
      }
    ],
    "comment": "A specific, existing section can be deleted by making a DELETE request on the URL for that section.  Note that sections must be empty to be deleted.  The last remaining section in a board view cannot be deleted.  Returns an empty data block."
  },
  {
    "name": "getSection",
    "method": "get",
    "path": "/sections/${encodeURIComponent(String(sectionGid))}",
    "params": [
      {
      "name": "section_gid",
      "type": "string",
      "example_values": [""],
      "comment": "The globally unique identifier for the section.",
      "required": true
      }
    ],
    "comment": "Returns the complete record for a single section."
  },
  {
    "name": "getSectionsForProject",
    "method": "get",
    "path": "/projects/${encodeURIComponent(String(projectGid))}/sections",
    "params": [
      {
      "name": "project_gid",
      "type": "string",
      "example_values": [""],
      "comment": "Globally unique identifier for the project.",
      "required": true
      }
    ],
    "comment": "Returns the compact records for all sections in the specified project."
  },
  {
    "name": "insertSectionForProject",
    "method": "post",
    "path": "/projects/${encodeURIComponent(String(projectGid))}/sections/insert",
    "params": [
      {
      "name": "project_gid",
      "type": "string",
      "example_values": [""],
      "comment": "Globally unique identifier for the project.",
      "required": true
      }
    ],
    "comment": "Move sections relative to each other in a board view. One of &#x60;before_section&#x60; or &#x60;after_section&#x60; is required.  Sections cannot be moved between projects.  Returns an empty data block."
  },
  {
    "name": "updateSection",
    "method": "put",
    "path": "/sections/${encodeURIComponent(String(sectionGid))}",
    "params": [
      {
      "name": "section_gid",
      "type": "string",
      "example_values": [""],
      "comment": "The globally unique identifier for the section.",
      "required": true
      }
    ],
    "comment": "A specific, existing section can be updated by making a PUT request on the URL for that project. Only the fields provided in the &#x60;data&#x60; block will be updated; any unspecified fields will remain unchanged. (note that at this time, the only field that can be updated is the &#x60;name&#x60; field.)  When using this method, it is best to specify only those fields you wish to change, or else you may overwrite changes made by another user since you last retrieved the task.  Returns the complete updated section record."
  },
  ]
}
export = resourceBase;