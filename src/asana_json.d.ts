// Type definitions for asana-api-json
// Project: https://github.com/asana/asana-api-json/
// Note: These type definitions are incomplete; only used sections of the API will be defined.

declare module "asana-json" {

  interface Action {
    name: string;
    method: string;
    path: string;
    comment: string;
    params?: any;
  }

  interface Resource {
    name: string;
    comment: string;
    templates: any[];
    properties: any[];
    actions: Action[];
  }

  export var Attachments: Resource;
  export var Events: Resource;
  export var Projects: Resource;
  export var Stories: Resource;
  export var Tags: Resource;
  export var Tasks: Resource;
  export var Teams: Resource;
  export var Users: Resource;
  export var Workspaces: Resource;
}
