/// <reference path="../../src/resources/interfaces.ts" />
import chai = require("chai");
import React = require("react/addons");
import sinon = require("sinon");

import Resources = require("../../src/resources/resources");
import RouteEntry = require("../../src/components/route_entry");

var assert = chai.assert;
var testUtils = React.addons.TestUtils;

describe("RouteEntryComponent", () => {
  var sand: SinonSandbox;

  var initial_action: Action;
  var initial_resource: Resource;

  var onFormSubmitStub: SinonStub;
  var onActionChangeStub: SinonStub;

  var root: RouteEntry;
  var selectRoute: React.HTMLComponent;

  beforeEach(() => {
    sand = sinon.sandbox.create();

    initial_resource = Resources.Projects;
    initial_action = initial_resource.actions[0];

    onFormSubmitStub = sand.stub();
    onActionChangeStub = sand.stub();

    root = testUtils.renderIntoDocument<RouteEntry>(
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
      React.findDOMNode<HTMLInputElement>(selectRoute).value,
      initial_action.name
    );
  });

  it("should contain dropdown with other routes", () => {
    var children = React.findDOMNode(selectRoute).childNodes;

    assert.equal(children.length, initial_resource.actions.length);
    initial_resource.actions.forEach((action, idx) => {
      var child_item = (<HTMLOptionElement>children.item(idx));
      assert.equal(child_item.value, action.name);
      assert.equal(child_item.text, action.path);
    });
  });

  it("should trigger onFormSubmit property on submit", () => {
    testUtils.Simulate.submit(React.findDOMNode(root));
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
