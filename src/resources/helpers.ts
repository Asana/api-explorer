// <reference path="./interfaces.ts" />

import Resources = require("./resources");

/**
 * Returns the names of all valid resources.
 *
 * @returns {string[]}
 */
export function names(): string[] {
  return Object.keys(Resources);
}

/**
 * Returns the resource information for a given resource name.
 *
 * @param name
 * @returns {any}
 */
export function resourceFromResourceName(name: string): Resource {
  return (<any>Resources)[name];
}

/**
 * Returns the resource name (key of Resources) for a given resource.
 *
 * @param resource
 * @returns {any}
 */
export function resourceNameFromResource(resource: Resource): string {
  return Object.keys(Resources).filter(
      key => { return (<any>Resources)[key] === resource; }
  )[0];
}

/**
 * Return the action for a given resource and path string.
 *
 */
export function actionFromResourcePath(resource: Resource, path: string): Action {
  return resource.actions.filter(
    action => { return path === action.path; }
  )[0];
}

/**
 * Returns the action by its resource and name.
 */
export function actionFromName(resource: Resource, action_name: string): Action {
  return resource.actions.filter(
    action => { return action_name === action.name; }
  )[0];
}
