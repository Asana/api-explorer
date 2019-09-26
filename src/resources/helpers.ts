// <reference path="./interfaces.ts" />
import util = require("util");
import _ = require("lodash");

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
export function actionFromResourceAndName(resource: Resource, action_name: string): Action {
  return resource.actions.filter(
    action => { return action_name === action.name; }
  )[0];
}

/**
 * Returns the action to use as a default for a given resource.
 *
 * We prefer GET actions, so if one exists on the resource use that.
 * Otherwise, we use the first action in the list.
 */
export function defaultActionFromResource(resource: Resource): Action {
  var getActions = resource.actions.filter(
    action => { return action.method === "GET"; }
  );

  return getActions.length > 0 ? getActions[0] : resource.actions[0];
}

/**
 * Given an action, return the path after replacing a required param value.
 * If no param value is given, and one is needed, then use a placeholder value.
 *
 * Assumes we have at-most one required parameter to put in the URL.
 *
 * @param action
 * @param param_value?
 * @returns {string}
 */
export function pathForAction(action: Action, paramValue?: string): string {
  // If there's a placeholder, then replace it with its required param.
  if (pathForActionContainsRequiredParam(action)) {
    var requiredParam = _.find(action.params, "required");
    if (requiredParam === undefined) {
      throw new Error("Placeholder in path but there's no required param.");
    }

    // If a param_value is given, use it. Otherwise, use a placeholder.
    if (paramValue !== undefined) {
      return util.format(action.path, paramValue);
    } else {
      // Use the parameter name as a placeholder in the URL.
      return util.format(action.path, ":" + requiredParam.name);
    }
  }

  // Otherwise, we just return the path.
  return action.path;
}

/**
 * Given an action, checks the path to check if there's a placeholder value for
 * a required param.
 *
 * @param action
 * @returns {boolean}
 */
export function pathForActionContainsRequiredParam(action: Action): boolean {
  return action.path.match(/%/g) !== null;
}
