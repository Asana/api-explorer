/// <reference path="../../src/asana_json.d.ts" />
/* tslint:disable:no-unused-variable */
import mock_dom = require("../mock_dom");
/* tslint:enable:no-unused-variable */

import AsanaJson = require("asana-json");
import chai = require("chai");
import react = require("react/addons");
import sinon = require("sinon");

import RouteEntry = require("../../src/components/route_entry");
import helpers = require("../helpers");

var assert = chai.assert;
var testUtils = react.addons.TestUtils;

describe("RouteEntryComponent", () => {
  var sand: SinonSandbox;

  var initial_action: AsanaJson.Action;
  var initial_resource: AsanaJson.Resource;

  var onFormSubmitStub: SinonStub;
  var onActionChangeStub: SinonStub;

  var root: RouteEntry.Component;
  var selectRoute: React.HTMLComponent;

  beforeEach(() => {
    sand = sinon.sandbox.create();

    initial_resource = helpers.fetchResource(2);
    initial_action = initial_resource.actions[0];

    onFormSubmitStub = sand.stub();
    onActionChangeStub = sand.stub();

    root = testUtils.renderIntoDocument<RouteEntry.Component>(
      RouteEntry.create({
        action: initial_action,
        resource: initial_resource,
        onFormSubmit: onFormSubmitStub,
        onActionChange: onActionChangeStub
      })
    );
    selectRoute = testUtils.findRenderedDOMComponentWithClass(
      root,
      "select-route"
    );
  });

  afterEach(() => {
    sand.restore();
  });

  it("should select the current route", () => {
    assert.include(
      (<HTMLInputElement>selectRoute.getDOMNode()).value,
      initial_action.name
    );
  });

  it("should contain dropdown with other routes", () => {
    var children = selectRoute.getDOMNode().childNodes;

    assert.equal(children.length, initial_resource.actions.length);
    initial_resource.actions.forEach((action, idx) => {
      var child_item = (<HTMLOptionElement>children.item(idx));
      assert.equal(child_item.value, action.name);
      assert.equal(child_item.text, action.path);
    });
  });

  it("should trigger onFormSubmit property on submit", () => {
    testUtils.Simulate.submit(root.getDOMNode());
    sinon.assert.called(onFormSubmitStub);
  });

  it("should trigger onRouteChange property on route change", () => {
    var other_action = initial_resource.actions[1];

    testUtils.Simulate.change(selectRoute, {
      target: { value: other_action.name }
    });
    sinon.assert.called(onActionChangeStub);
  });
});
