import resourceBase = require("./gen/jobs_base");
resourceBase.comment = "A _job_ represents a process that handles asynchronous work.\n\nJobs are created when an endpoint requests an action that will be handled asynchronously.\nSuch as project or task duplication.\n";
resourceBase.properties = [
  {
    "name": "gid",
    "type": "Gid",
    "example_values": [
      "\"1234\""
    ],
    "comment": "Globally unique ID of the job.\n"
  },
  {
    "name": "resource_type",
    "type": "Enum",
    "comment": "The resource type of this resource. The value for this resource is always `job`.\n",
    "example_values": [
      "\"job\""
    ],
    "values": [
      {
        "name": "job",
        "comment": "A job resource type."
      }
    ]
  },
  {
    "name": "resource_subtype",
    "type": "Enum",
    "comment": "The type of job.\n",
    "example_values": [
      "\"duplicate_project\"",
      "\"duplicate_task\""
    ],
    "values": [
      {
        "name": "duplicate_project",
        "comment": "A job that duplicates a project."
      },
      {
        "name": "duplicate_task",
        "comment": "A job that duplicates a task."
      }
    ]
  },
  {
    "name": "status",
    "type": "Enum",
    "comment": "The status of the job.",
    "example_values": [
      "\"not_started\"",
      "\"in_progress\"",
      "\"succeeded\"",
      "\"failed\""
    ],
    "values": [
      {
        "name": "not_started",
        "comment": "The job has not started."
      },
      {
        "name": "in_progress",
        "comment": "The job is in progress."
      },
      {
        "name": "succeeded",
        "comment": "The job has completed."
      },
      {
        "name": "failed",
        "comment": "The job has not started."
      }
    ]
  },
  {
    "name": "new_project",
    "type": "Project",
    "example_values": [
      "{ id: 1234, gid: \"1234\", name: 'Bugs' }"
    ],
    "comment": "Contains the new project if the job created a new project.\n"
  },
  {
    "name": "new_task",
    "type": "Task",
    "example_values": [
      "{ id: 1234, gid: \"1234\", name: 'Bug task' }"
    ],
    "comment": "Contains the new task if the job created a new task.\n"
  }
]

export = resourceBase;