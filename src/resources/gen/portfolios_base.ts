/// <reference path="../interfaces.ts" />

/* tslint:disable:max-line-length */
/* tslint:disable:eofline */
var resourceBase = <Resource>{
  "name": "portfolios",
  "comment": "",
  "properties":[],
  "actions": [
  {
    "name": "addCustomFieldSettingForPortfolio",
    "method": "POST",
    "path": "/portfolios/%s/addCustomFieldSetting",
    "params": [
      {
      "name": "portfolio_gid",
      "type": "string",
      "example_values": ["12345"],
      "comment": "Globally unique identifier for the portfolio.",
      "required": true
      },
    ],
    "comment": "Add a custom field to a portfolio"
  },
  {
    "name": "addItemForPortfolio",
    "method": "POST",
    "path": "/portfolios/%s/addItem",
    "params": [
      {
      "name": "portfolio_gid",
      "type": "string",
      "example_values": ["12345"],
      "comment": "Globally unique identifier for the portfolio.",
      "required": true
      },
    ],
    "comment": "Add a portfolio item"
  },
  {
    "name": "addMembersForPortfolio",
    "method": "POST",
    "path": "/portfolios/%s/addMembers",
    "params": [
      {
      "name": "portfolio_gid",
      "type": "string",
      "example_values": ["12345"],
      "comment": "Globally unique identifier for the portfolio.",
      "required": true
      },
    ],
    "comment": "Add users to a portfolio"
  },
  {
    "name": "createPortfolio",
    "method": "POST",
    "path": "/portfolios",
    "params": [
    ],
    "comment": "Create a portfolio"
  },
  {
    "name": "deletePortfolio",
    "method": "DELETE",
    "path": "/portfolios/%s",
    "params": [
      {
      "name": "portfolio_gid",
      "type": "string",
      "example_values": ["12345"],
      "comment": "Globally unique identifier for the portfolio.",
      "required": true
      },
    ],
    "comment": "Delete a portfolio"
  },
  {
    "name": "getItemsForPortfolio",
    "method": "GET",
    "path": "/portfolios/%s/items",
    "params": [
      {
      "name": "portfolio_gid",
      "type": "string",
      "example_values": ["12345"],
      "comment": "Globally unique identifier for the portfolio.",
      "required": true
      },
    ],
    "comment": "Get portfolio items"
  },
  {
    "name": "getPortfolio",
    "method": "GET",
    "path": "/portfolios/%s",
    "params": [
      {
      "name": "portfolio_gid",
      "type": "string",
      "example_values": ["12345"],
      "comment": "Globally unique identifier for the portfolio.",
      "required": true
      },
    ],
    "comment": "Get a portfolio"
  },
  {
    "name": "getPortfolios",
    "method": "GET",
    "path": "/portfolios",
    "params": [
      {
      "name": "owner",
      "type": "string",
      "example_values": ["14916"],
      "comment": "The user who owns the portfolio. Currently, API users can only get a list of portfolios that they themselves own.",
      "required": true
      },
      {
      "name": "workspace",
      "type": "string",
      "example_values": ["1331"],
      "comment": "The workspace or organization to filter portfolios on.",
      "required": true
      },
    ],
    "comment": "Get multiple portfolios"
  },
  {
    "name": "removeCustomFieldSettingForPortfolio",
    "method": "POST",
    "path": "/portfolios/%s/removeCustomFieldSetting",
    "params": [
      {
      "name": "portfolio_gid",
      "type": "string",
      "example_values": ["12345"],
      "comment": "Globally unique identifier for the portfolio.",
      "required": true
      },
    ],
    "comment": "Remove a custom field from a portfolio"
  },
  {
    "name": "removeItemForPortfolio",
    "method": "POST",
    "path": "/portfolios/%s/removeItem",
    "params": [
      {
      "name": "portfolio_gid",
      "type": "string",
      "example_values": ["12345"],
      "comment": "Globally unique identifier for the portfolio.",
      "required": true
      },
    ],
    "comment": "Remove a portfolio item"
  },
  {
    "name": "removeMembersForPortfolio",
    "method": "POST",
    "path": "/portfolios/%s/removeMembers",
    "params": [
      {
      "name": "portfolio_gid",
      "type": "string",
      "example_values": ["12345"],
      "comment": "Globally unique identifier for the portfolio.",
      "required": true
      },
    ],
    "comment": "Remove users from a portfolio"
  },
  {
    "name": "updatePortfolio",
    "method": "PUT",
    "path": "/portfolios/%s",
    "params": [
      {
      "name": "portfolio_gid",
      "type": "string",
      "example_values": ["12345"],
      "comment": "Globally unique identifier for the portfolio.",
      "required": true
      },
    ],
    "comment": "Update a portfolio"
  },
  ]
}
export = resourceBase;