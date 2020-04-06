/* tslint:disable variable-name */
interface Action {
  name: string;
  class: string;
  method: string;
  path: string;
  notes?: string[];
  comment: string;
  params?: Parameter[];
  collection?: boolean;
  collection_cannot_paginate?: boolean;
  no_code?: boolean;
}

interface Parameter {
  name: string;
  type: string;
  example_values?: string[];
  comment: string;
  required?: boolean;
  explicit?: boolean;
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
