import AsanaJson = require("asana-json");

/**
 * Returns the names of all valid resources.
 *
 * @returns {string[]}
 */
export function names(): String[] {
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
 * Returns the routes for a given resource.
 *
 * @param resource
 * @returns {string[]}
 */
export function routesFromResource(resource: AsanaJson.Resource): string[] {
  return resource.actions.map(action => { return action.path; });
}
