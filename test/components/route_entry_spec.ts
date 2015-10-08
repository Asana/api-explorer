/// <reference path="../../src/resources/interfaces.ts" />
import chai = require("chai");
import React = require("react/addons");
import sinon = require("sinon");
import _ = require("lodash");

import Resources = require("../../src/resources/resources");
import RouteEntry = require("../../src/components/route_entry");

var assert = chai.assert;
var testUtils = React.addons.TestUtils;

describe("RouteEntryComponent", () => {
  var sand: SinonSandbox;

  var initialAction: Action;
  var initialResource: Resource;

  var onActionChangeStub: SinonStub;

  var root: RouteEntry;
  var selectRoute: React.HTMLComponent;

  beforeEach(() => {
    sand = sinon.sandbox.create();

    initialResource = Resources.Projects;
    initialAction = initialResource.actions[0];

    onActionChangeStub = sand.stub();

    root = testUtils.renderIntoDocument<RouteEntry>(
      RouteEntry.create({
        action: initialAction,
        currentRequestUrl: "URL_HERE",
        onActionChange: onActionChangeStub,
        resource: initialResource
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
      initialAction.name
    );
  });

  it("should display the current route url", () => {
    assert.include(
      React.findDOMNode(root).textContent,
      initialAction.method + " " + "URL_HERE"
    );
  });

  it("should contain dropdown with other routes", () => {
    var children = React.findDOMNode(selectRoute).childNodes;

    assert.equal(children.length, initialResource.actions.length);
    initialResource.actions.forEach((action, idx) => {
      var childItem = (<HTMLOptionElement>children.item(idx));

      // Replace any placeholders with their required param name.
      // NB: We use replace rather than util.format in order to ignore
      //     paths that do not contain a placeholder.
      var requiredParam = _.find(action.params, "required");
      var actionPath = requiredParam !== undefined ?
        action.path.replace("%s", ":" + requiredParam.name) : action.path;

      assert.equal(childItem.value, action.name);
      assert.equal(childItem.text, action.method + " " + actionPath);
    });
  });

  it("should trigger onRouteChange property on route change", () => {
    var otherAction = initialResource.actions[1];

    testUtils.Simulate.change(selectRoute, {
      target: { value: otherAction.name }
    });
    sinon.assert.called(onActionChangeStub);
  });
});
