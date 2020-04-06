/// <reference path="../interfaces.ts" />

/* tslint:disable:max-line-length */
/* tslint:disable:eofline */
var resourceBase = <Resource>{
  "name": "sections",
  "comment": "",
  "properties":[],
  "actions": [
  {
    "name": "addTaskForSection",
    "method": "POST",
    "path": "/sections/%s/addTask",
    "params": [
      {
      "name": "section_gid",
      "type": "string",
      "example_values": ["321654"],
      "comment": "The globally unique identifier for the section.",
      "required": true
      },
    ],
    "comment": "Add task to section"
  },
  {
    "name": "createSectionForProject",
    "method": "POST",
    "path": "/projects/%s/sections",
    "params": [
      {
      "name": "project_gid",
      "type": "string",
      "example_values": ["1331"],
      "comment": "Globally unique identifier for the project.",
      "required": true
      },
    ],
    "comment": "Create a section in a project"
  },
  {
    "name": "deleteSection",
    "method": "DELETE",
    "path": "/sections/%s",
    "params": [
      {
      "name": "section_gid",
      "type": "string",
      "example_values": ["321654"],
      "comment": "The globally unique identifier for the section.",
      "required": true
      },
    ],
    "comment": "Delete a section"
  },
  {
    "name": "getSection",
    "method": "GET",
    "path": "/sections/%s",
    "params": [
      {
      "name": "section_gid",
      "type": "string",
      "example_values": ["321654"],
      "comment": "The globally unique identifier for the section.",
      "required": true
      },
    ],
    "comment": "Get a section"
  },
  {
    "name": "getSectionsForProject",
    "method": "GET",
    "path": "/projects/%s/sections",
    "params": [
      {
      "name": "project_gid",
      "type": "string",
      "example_values": ["1331"],
      "comment": "Globally unique identifier for the project.",
      "required": true
      },
    ],
    "comment": "Get sections in a project"
  },
  {
    "name": "insertSectionForProject",
    "method": "POST",
    "path": "/projects/%s/sections/insert",
    "params": [
      {
      "name": "project_gid",
      "type": "string",
      "example_values": ["1331"],
      "comment": "Globally unique identifier for the project.",
      "required": true
      },
    ],
    "comment": "Move or Insert sections"
  },
  {
    "name": "updateSection",
    "method": "PUT",
    "path": "/sections/%s",
    "params": [
      {
      "name": "section_gid",
      "type": "string",
      "example_values": ["321654"],
      "comment": "The globally unique identifier for the section.",
      "required": true
      },
    ],
    "comment": "Update a section"
  },
  ]
}
export = resourceBase;
