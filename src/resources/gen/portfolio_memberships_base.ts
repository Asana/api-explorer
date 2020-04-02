/// <reference path="../interfaces.ts" />

/* tslint:disable:max-line-length */
/* tslint:disable:eofline */
var resourceBase = <Resource>{
  "name": "portfolio_memberships",
  "comment": "",
  "properties":[],
  "actions": [
  {
    "name": "getPortfolioMembership",
    "method": "GET",
    "path": "/portfolio_memberships/%s",
    "params": [
      {
      "name": "portfolio_membership_gid",
      "type": "string",
      "example_values": ["1331"],
      "comment": "",
      "required": true
      },
    ],
    "comment": "Returns the complete portfolio record for a single portfolio membership."
  },
  {
    "name": "getPortfolioMemberships",
    "method": "GET",
    "path": "/portfolio_memberships",
    "params": [
      {
      "name": "user",
      "type": "string",
      "example_values": ["me"],
      "comment": "A string identifying a user. This can either be the string \&quot;me\&quot;, an email, or the gid of a user.",
      "required": false
      },
      {
      "name": "workspace",
      "type": "string",
      "example_values": ["12345"],
      "comment": "The workspace to filter results on.",
      "required": false
      },
      {
      "name": "portfolio",
      "type": "string",
      "example_values": ["12345"],
      "comment": "The portfolio to filter results on.",
      "required": false
      },
    ],
    "comment": "Returns a list of portfolio memberships in compact representation. You must specify &#x60;portfolio&#x60;, &#x60;portfolio&#x60; and &#x60;user&#x60;, or &#x60;workspace&#x60; and &#x60;user&#x60;."
  },
  {
    "name": "getPortfolioMembershipsForPortfolio",
    "method": "GET",
    "path": "/portfolios/%s/portfolio_memberships",
    "params": [
      {
      "name": "portfolio_gid",
      "type": "string",
      "example_values": ["12345"],
      "comment": "Globally unique identifier for the portfolio.",
      "required": true
      },
      {
      "name": "user",
      "type": "string",
      "example_values": ["me"],
      "comment": "A string identifying a user. This can either be the string \&quot;me\&quot;, an email, or the gid of a user.",
      "required": false
      },
    ],
    "comment": "Returns the compact portfolio membership records for the portfolio."
  },
  ]
}
export = resourceBase;