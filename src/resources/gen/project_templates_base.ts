/// <reference path="../interfaces.ts" />

/* tslint:disable:max-line-length */
/* tslint:disable:eofline */
var resourceBase = <Resource>{
  "name": "project_templates",
  "comment": "",
  "properties":[],
  "actions": [
  {
    "name": "getProjectTemplate",
    "method": "GET",
    "collection": false,
    "path": "/project_templates/%s",
    "params": [
      {
      "name": "project_template_gid",
      "type": "string",
      "example_values": ["1331"],
      "comment": "Globally unique identifier for the project template.",
      "required": true
      },
    ],
    "comment": "Get a project template"
  },
  {
    "name": "getProjectTemplates",
    "method": "GET",
    "collection": true||false,
    "path": "/project_templates",
    "params": [
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
      "example_values": ["12345"],
      "comment": "The workspace to filter results on.",
      "required": false
      },
    ],
    "comment": "Get multiple project templates"
  },
  {
    "name": "getProjectTemplatesForTeam",
    "method": "GET",
    "collection": true||false,
    "path": "/teams/%s/project_templates",
    "params": [
      {
      "name": "team_gid",
      "type": "string",
      "example_values": ["159874"],
      "comment": "Globally unique identifier for the team.",
      "required": true
      },
    ],
    "comment": "Get a team&#x27;s project templates"
  },
  {
    "name": "instantiateProject",
    "method": "POST",
    "collection": false,
    "path": "/project_templates/%s/instantiateProject",
    "params": [
      {
      "name": "project_template_gid",
      "type": "string",
      "example_values": ["1331"],
      "comment": "Globally unique identifier for the project template.",
      "required": true
      },
    ],
    "comment": "Instantiate a project from a project template"
  },
  ]
}
export = resourceBase;
