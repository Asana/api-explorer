/// <reference path="../../src/resources/interfaces.ts" />

/* tslint:disable:max-line-length */
/* tslint:disable:eofline */
var resourceBase = <Resource>{
  "name": "portfolio_memberships",
  "comment": "",
  "properties":[],
  "actions": [
  {
    "name": "getPortfolioMembership",
    "method": "get",
    "path": "/portfolio_memberships/${encodeURIComponent(String(portfolioMembershipGid))}",
    "params": [
      {
      "name": "portfolio_membership_gid",
      "type": "string",
      "example_values": [""],
      "comment": "",
      "required": true
      }
    ],
    "comment": "Returns the complete portfolio record for a single portfolio membership."
  },
  {
    "name": "getPortfolioMemberships",
    "method": "get",
    "path": "/portfolio_memberships",
    "params": [
    ],
    "comment": "Returns a list of portfolio memberships in compact representation. You must specify &#x60;portfolio&#x60;, &#x60;portfolio&#x60; and &#x60;user&#x60;, or &#x60;workspace&#x60; and &#x60;user&#x60;."
  },
  {
    "name": "getPortfolioMembershipsForPortfolio",
    "method": "get",
    "path": "/portfolios/${encodeURIComponent(String(portfolioGid))}/portfolio_memberships",
    "params": [
      {
      "name": "portfolio_gid",
      "type": "string",
      "example_values": [""],
      "comment": "Globally unique identifier for the portfolio.",
      "required": true
      }
    ],
    "comment": "Returns the compact portfolio membership records for the portfolio."
  },
  ]
}
export = resourceBase;