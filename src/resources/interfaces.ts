interface Action {
  name: string;
  method: string;
  path: string;
  comment: string;
  params?: Parameter[];
}

interface Parameter {
  name: string;
  type: string;
  example_values?: string[];
  comment: string;
  required?: boolean;
}
interface Property {
  name: string;
  comment: string;
  type: string;
  example_values: string[];
  values?: any[];
}

interface Resource {
  name: string;
  comment: string;
  properties: Property[];
  actions: Action[];
}
