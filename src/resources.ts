import AsanaJson = require("asana-json");

/**
 * Returns the names of all valid resources.
 *
 * @returns {string[]}
 */
export function names(): string[] {
  return Object.keys(AsanaJson);
}

/**
 * Returns the resource information for a given resource name.
 *
 * @param name
 * @returns {any}
 */
export function resourceFromResourceName(name: string): AsanaJson.Resource {
  return (<any>AsanaJson)[name];
}

/**
 * Returns the resource name (key of AsanaJson) for a given resource.
 *
 * @param resource
 * @returns {any}
 */
export function resourceNameFromResource(resource: AsanaJson.Resource): string {
  return Object.keys(AsanaJson).filter(
      key => { return (<any>AsanaJson)[key] === resource; }
  )[0];
}

/**
 * Return the action for a given resource and path string.
 *
 * @param {AsanaJson.Resource} resource
 * @param {string} path
 * @returns {AsanaJson.Action}
 */
export function actionFromResourcePath(resource: AsanaJson.Resource, path: string): AsanaJson.Action {
  return resource.actions.filter(
    action => { return path === action.path; }
  )[0];
}

/**
 * Returns the action by its resource and name.
 *
 * @param {AsanaJson.Resource} resource
 * @param {string} action_name
 * @returns {AsanaJson.Action}
 */
export function actionFromResourceAndName(resource: AsanaJson.Resource, action_name: string): AsanaJson.Action {
  return resource.actions.filter(
    action => { return action_name === action.name; }
  )[0];
}
