/// <reference path="../../src/resources/interfaces.ts" />

/* tslint:disable:max-line-length */
/* tslint:disable:eofline */
var resourceBase = <Resource>{
  "name": "portfolios",
  "comment": "",
  "properties":[],
  "actions": [
  {
    "name": "addCustomFieldSettingForPortfolio",
    "method": "post",
    "path": "/portfolios/${encodeURIComponent(String(portfolioGid))}/addCustomFieldSetting",
    "params": [
      {
      "name": "portfolio_gid",
      "type": "string",
      "example_values": [""],
      "comment": "Globally unique identifier for the portfolio.",
      "required": true
      }
    ],
    "comment": "Custom fields are associated with portfolios by way of custom field settings.  This method creates a setting for the portfolio."
  },
  {
    "name": "addItemForPortfolio",
    "method": "post",
    "path": "/portfolios/${encodeURIComponent(String(portfolioGid))}/addItem",
    "params": [
      {
      "name": "portfolio_gid",
      "type": "string",
      "example_values": [""],
      "comment": "Globally unique identifier for the portfolio.",
      "required": true
      }
    ],
    "comment": "Add an item to a portfolio. Returns an empty data block."
  },
  {
    "name": "addMembersForPortfolio",
    "method": "post",
    "path": "/portfolios/${encodeURIComponent(String(portfolioGid))}/addMembers",
    "params": [
      {
      "name": "portfolio_gid",
      "type": "string",
      "example_values": [""],
      "comment": "Globally unique identifier for the portfolio.",
      "required": true
      }
    ],
    "comment": "Adds the specified list of users as members of the portfolio. Returns the updated portfolio record."
  },
  {
    "name": "createPortfolio",
    "method": "post",
    "path": "/portfolios",
    "params": [
    ],
    "comment": "Creates a new portfolio in the given workspace with the supplied name.  Note that portfolios created in the Asana UI may have some state (like the “Priority” custom field) which is automatically added to the portfolio when it is created. Portfolios created via our API will *not* be created with the same initial state to allow integrations to create their own starting state on a portfolio."
  },
  {
    "name": "deletePortfolio",
    "method": "delete",
    "path": "/portfolios/${encodeURIComponent(String(portfolioGid))}",
    "params": [
      {
      "name": "portfolio_gid",
      "type": "string",
      "example_values": [""],
      "comment": "Globally unique identifier for the portfolio.",
      "required": true
      }
    ],
    "comment": "An existing portfolio can be deleted by making a DELETE request on the URL for that portfolio.  Returns an empty data record."
  },
  {
    "name": "getItemsForPortfolio",
    "method": "get",
    "path": "/portfolios/${encodeURIComponent(String(portfolioGid))}/items",
    "params": [
      {
      "name": "portfolio_gid",
      "type": "string",
      "example_values": [""],
      "comment": "Globally unique identifier for the portfolio.",
      "required": true
      }
    ],
    "comment": "Get a list of the items in compact form in a portfolio."
  },
  {
    "name": "getPortfolio",
    "method": "get",
    "path": "/portfolios/${encodeURIComponent(String(portfolioGid))}",
    "params": [
      {
      "name": "portfolio_gid",
      "type": "string",
      "example_values": [""],
      "comment": "Globally unique identifier for the portfolio.",
      "required": true
      }
    ],
    "comment": "Returns the complete portfolio record for a single portfolio."
  },
  {
    "name": "getPortfolios",
    "method": "get",
    "path": "/portfolios",
    "params": [
    ],
    "comment": "Returns a list of the portfolios in compact representation that are owned by the current API user."
  },
  {
    "name": "removeCustomFieldSettingForPortfolio",
    "method": "post",
    "path": "/portfolios/${encodeURIComponent(String(portfolioGid))}/removeCustomFieldSetting",
    "params": [
      {
      "name": "portfolio_gid",
      "type": "string",
      "example_values": [""],
      "comment": "Globally unique identifier for the portfolio.",
      "required": true
      }
    ],
    "comment": "Removes a custom field setting from a portfolio."
  },
  {
    "name": "removeItemForPortfolio",
    "method": "post",
    "path": "/portfolios/${encodeURIComponent(String(portfolioGid))}/removeItem",
    "params": [
      {
      "name": "portfolio_gid",
      "type": "string",
      "example_values": [""],
      "comment": "Globally unique identifier for the portfolio.",
      "required": true
      }
    ],
    "comment": "Remove an item from a portfolio. Returns an empty data block."
  },
  {
    "name": "removeMembersForPortfolio",
    "method": "post",
    "path": "/portfolios/${encodeURIComponent(String(portfolioGid))}/removeMembers",
    "params": [
      {
      "name": "portfolio_gid",
      "type": "string",
      "example_values": [""],
      "comment": "Globally unique identifier for the portfolio.",
      "required": true
      }
    ],
    "comment": "Removes the specified list of users from members of the portfolio. Returns the updated portfolio record."
  },
  {
    "name": "updatePortfolio",
    "method": "put",
    "path": "/portfolios/${encodeURIComponent(String(portfolioGid))}",
    "params": [
      {
      "name": "portfolio_gid",
      "type": "string",
      "example_values": [""],
      "comment": "Globally unique identifier for the portfolio.",
      "required": true
      }
    ],
    "comment": "An existing portfolio can be updated by making a PUT request on the URL for that portfolio. Only the fields provided in the &#x60;data&#x60; block will be updated; any unspecified fields will remain unchanged.  Returns the complete updated portfolio record."
  },
  ]
}
export = resourceBase;