interface Parameter {
  name: string;
  type: string;
  example_values?: string[];
  comment: string;
  required?: boolean;
}

interface Action {
  name: string;
  method: string;
  path: string;
  comment: string;
  params?: Parameter[];
}

interface Resource {
  name: string;
  comment: string;
  templates: any[];
  properties: any[];
  actions: Action[];
}
