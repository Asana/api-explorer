/// <reference path="../interfaces.ts" />

/* tslint:disable:max-line-length */
/* tslint:disable:eofline */
var resourceBase = <Resource>{
  "name": "goals",
  "comment": "",
  "properties":[],
  "actions": [
  {
    "name": "addFollowers",
    "method": "POST",
    "collection": false,
    "path": "/goals/%s/addFollowers",
    "params": [
      {
      "name": "goal_gid",
      "type": "string",
      "example_values": ["12345"],
      "comment": "Globally unique identifier for the goal.",
      "required": true
      },
    ],
    "comment": "Add a collaborator to a goal"
  },
  {
    "name": "addSubgoal",
    "method": "POST",
    "collection": false,
    "path": "/goals/%s/addSubgoal",
    "params": [
      {
      "name": "goal_gid",
      "type": "string",
      "example_values": ["12345"],
      "comment": "Globally unique identifier for the goal.",
      "required": true
      },
    ],
    "comment": "Add a subgoal to a parent goal"
  },
  {
    "name": "addSupportingWorkForGoal",
    "method": "POST",
    "collection": false,
    "path": "/goals/%s/addSupportingWork",
    "params": [
      {
      "name": "goal_gid",
      "type": "string",
      "example_values": ["12345"],
      "comment": "Globally unique identifier for the goal.",
      "required": true
      },
    ],
    "comment": "Add a project/portfolio as supporting work for a goal."
  },
  {
    "name": "createGoal",
    "method": "POST",
    "collection": true||false,
    "path": "/goals",
    "params": [
    ],
    "comment": "Create a goal"
  },
  {
    "name": "createGoalMetric",
    "method": "POST",
    "collection": false,
    "path": "/goals/%s/setMetric",
    "params": [
      {
      "name": "goal_gid",
      "type": "string",
      "example_values": ["12345"],
      "comment": "Globally unique identifier for the goal.",
      "required": true
      },
    ],
    "comment": "Create a goal metric"
  },
  {
    "name": "deleteGoal",
    "method": "DELETE",
    "collection": false,
    "path": "/goals/%s",
    "params": [
      {
      "name": "goal_gid",
      "type": "string",
      "example_values": ["12345"],
      "comment": "Globally unique identifier for the goal.",
      "required": true
      },
    ],
    "comment": "Delete a goal"
  },
  {
    "name": "getGoal",
    "method": "GET",
    "collection": false,
    "path": "/goals/%s",
    "params": [
      {
      "name": "goal_gid",
      "type": "string",
      "example_values": ["12345"],
      "comment": "Globally unique identifier for the goal.",
      "required": true
      },
    ],
    "comment": "Get a goal"
  },
  {
    "name": "getGoals",
    "method": "GET",
    "collection": true||false,
    "path": "/goals",
    "params": [
      {
      "name": "time_periods",
      "type": "Array&lt;string&gt;",
      "example_values": ["221693,506165"],
      "comment": "Globally unique identifiers for the time periods.",
      "required": false
      },
      {
      "name": "workspace",
      "type": "string",
      "example_values": ["31326"],
      "comment": "Globally unique identifier for the workspace.",
      "required": false
      },
      {
      "name": "team",
      "type": "string",
      "example_values": ["31326"],
      "comment": "Globally unique identifier for the team.",
      "required": false
      },
      {
      "name": "is_workspace_level",
      "type": "boolean",
      "example_values": [false],
      "comment": "Filter to goals with is_workspace_level set to query value. Must be used with the workspace parameter.",
      "required": false
      },
      {
      "name": "project",
      "type": "string",
      "example_values": ["512241"],
      "comment": "Globally unique identifier for supporting project.",
      "required": false
      },
      {
      "name": "portfolio",
      "type": "string",
      "example_values": ["159874"],
      "comment": "Globally unique identifier for supporting portfolio.",
      "required": false
      },
    ],
    "comment": "Get goals"
  },
  {
    "name": "getParentGoalsForGoal",
    "method": "GET",
    "collection": false,
    "path": "/goals/%s/parentGoals",
    "params": [
      {
      "name": "goal_gid",
      "type": "string",
      "example_values": ["12345"],
      "comment": "Globally unique identifier for the goal.",
      "required": true
      },
    ],
    "comment": "Get parent goals from a goal"
  },
  {
    "name": "getSubgoalsForGoal",
    "method": "GET",
    "collection": false,
    "path": "/goals/%s/subgoals",
    "params": [
      {
      "name": "goal_gid",
      "type": "string",
      "example_values": ["12345"],
      "comment": "Globally unique identifier for the goal.",
      "required": true
      },
    ],
    "comment": "Get subgoals from a goal"
  },
  {
    "name": "removeFollowers",
    "method": "POST",
    "collection": false,
    "path": "/goals/%s/removeFollowers",
    "params": [
      {
      "name": "goal_gid",
      "type": "string",
      "example_values": ["12345"],
      "comment": "Globally unique identifier for the goal.",
      "required": true
      },
    ],
    "comment": "Remove a collaborator from a goal"
  },
  {
    "name": "removeSubgoal",
    "method": "POST",
    "collection": false,
    "path": "/goals/%s/removeSubgoal",
    "params": [
      {
      "name": "goal_gid",
      "type": "string",
      "example_values": ["12345"],
      "comment": "Globally unique identifier for the goal.",
      "required": true
      },
    ],
    "comment": "Remove a subgoal from a goal"
  },
  {
    "name": "removeSupportingWorkForGoal",
    "method": "POST",
    "collection": false,
    "path": "/goals/%s/removeSupportingWork",
    "params": [
      {
      "name": "goal_gid",
      "type": "string",
      "example_values": ["12345"],
      "comment": "Globally unique identifier for the goal.",
      "required": true
      },
    ],
    "comment": "Remove a project/portfolio as supporting work for a goal."
  },
  {
    "name": "supportingWork",
    "method": "GET",
    "collection": false,
    "path": "/goals/%s/supportingWork",
    "params": [
      {
      "name": "goal_gid",
      "type": "string",
      "example_values": ["12345"],
      "comment": "Globally unique identifier for the goal.",
      "required": true
      },
    ],
    "comment": "Get supporting work from a goal"
  },
  {
    "name": "updateGoal",
    "method": "PUT",
    "collection": false,
    "path": "/goals/%s",
    "params": [
      {
      "name": "goal_gid",
      "type": "string",
      "example_values": ["12345"],
      "comment": "Globally unique identifier for the goal.",
      "required": true
      },
    ],
    "comment": "Update a goal"
  },
  {
    "name": "updateGoalMetric",
    "method": "POST",
    "collection": false,
    "path": "/goals/%s/setMetricCurrentValue",
    "params": [
      {
      "name": "goal_gid",
      "type": "string",
      "example_values": ["12345"],
      "comment": "Globally unique identifier for the goal.",
      "required": true
      },
    ],
    "comment": "Update a goal metric"
  },
  ]
}
export = resourceBase;
