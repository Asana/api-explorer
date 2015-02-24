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
 * Returns the routes for a given resource.
 *
 * @param resource
 * @returns {string[]}
 */
export function routesFromResource(resource: AsanaJson.Resource): string[] {
  return resource.actions.map(action => { return action.path; });
}

/**
 * Return the action for a given resource and path string.
 *
 */
export function actionFromResourcePath(resource: AsanaJson.Resource, path: string): AsanaJson.Action {
  return resource.actions.filter(
    action => { return path === action.path; }
  )[0];
}
