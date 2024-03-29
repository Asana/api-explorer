import resourceBase = require("./gen/audit_log_api_base");
resourceBase.comment = "Asana's Audit Log is an immutable log of [important events](/docs/supported-auditlogevents) in your organization's Asana instance.\n\nThe Audit Log API allows you to monitor and act upon important security and compliance-related changes. Organizations might use this API endpoint to:\n\n* Set up proactive alerting with a Security Information and Event Management (SIEM) tool like [Splunk](https://asana.com/guide/help/api/splunk)\n* Conduct reactive investigations when a security incident takes place\n* Visualize key domain data in aggregate to identify security trends\n\nNote that since the API provides insight into what is happening in an Asana instance, the data is [read-only](/docs/get-audit-log-events). That is, there are no \"write\" or \"update\" endpoints for audit log events.\n\nOnly [Service Accounts](https://asana.com/guide/help/premium/service-accounts) in [Enterprise Domains](https://asana.com/enterprise) can access Audit Log API endpoints. Authentication with a Service Account's [Personal Access Token](/docs/personal-access-token) is required.\n\nFor a full list of supported events, see [Supported AuditLogEvents](/docs/supported-auditlogevents).\n";
resourceBase.properties = [
    {
        "name": "gid",
        "type": "",
        "example_values": [],
        "comment": "",
    },
    {
        "name": "actor",
        "type": "",
        "example_values": [],
        "comment": "",
    },
    {
        "name": "context",
        "type": "",
        "example_values": [],
        "comment": "",
    },
    {
        "name": "created_at",
        "type": "",
        "example_values": [],
        "comment": "",
    },
    {
        "name": "details",
        "type": "",
        "example_values": [],
        "comment": "",
    },
    {
        "name": "event_category",
        "type": "",
        "example_values": [],
        "comment": "",
    },
    {
        "name": "event_type",
        "type": "",
        "example_values": [],
        "comment": "",
    },
    {
        "name": "resource",
        "type": "",
        "example_values": [],
        "comment": "",
    },
];
export = resourceBase;
