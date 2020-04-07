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
    "collection": false,
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
    "comment": "Get a portfolio membership"
  },
  {
    "name": "getPortfolioMemberships",
    "method": "GET",
    "collection": true||false,
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
    "comment": "Get multiple portfolio memberships"
  },
  {
    "name": "getPortfolioMembershipsForPortfolio",
    "method": "GET",
    "collection": true||false,
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
    "comment": "Get memberships from a portfolio"
  },
  ]
}
export = resourceBase;
