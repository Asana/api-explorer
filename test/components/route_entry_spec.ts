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

  var initial_action: Action;
  var initial_resource: Resource;

  var canSubmitRequestStub: SinonStub;
  var onFormSubmitStub: SinonStub;
  var onActionChangeStub: SinonStub;

  var root: RouteEntry;
  var selectRoute: React.HTMLComponent;

  beforeEach(() => {
    sand = sinon.sandbox.create();

    initial_resource = Resources.Projects;
    initial_action = initial_resource.actions[0];

    canSubmitRequestStub = sand.stub();
    onFormSubmitStub = sand.stub();
    onActionChangeStub = sand.stub();
  });

  afterEach(() => {
    sand.restore();
  });

  function renderRoot() {
    root = testUtils.renderIntoDocument<RouteEntry>(
      RouteEntry.create({
        action: initial_action,
        current_request_url: "URL_HERE",
        onActionChange: onActionChangeStub,
        onFormSubmit: onFormSubmitStub,
        resource: initial_resource,
        submit_disabled: !canSubmitRequestStub()
      })
    );
    selectRoute = testUtils.findRenderedDOMComponentWithClass(
      root,
      "select-route"
    );
  }

  describe("when can submit", () => {
    beforeEach(() => {
      canSubmitRequestStub.returns(true);
      renderRoot();
    });

    it("should have enabled submit button", () => {
      var submitRequest = testUtils.findRenderedDOMComponentWithClass(
        root, "submit-request");

      sinon.assert.calledOnce(canSubmitRequestStub);
      assert.isFalse(submitRequest.props.disabled);
    });

    it("should select the current route", () => {
      assert.include(
        React.findDOMNode<HTMLInputElement>(selectRoute).value,
        initial_action.name
      );
    });

    it("should display the current route url", () => {
      assert.include(
        React.findDOMNode(root).textContent,
        initial_action.method + " " + "URL_HERE"
      );
    });

    it("should contain dropdown with other routes", () => {
      var children = React.findDOMNode(selectRoute).childNodes;

      assert.equal(children.length, initial_resource.actions.length);
      initial_resource.actions.forEach((action, idx) => {
        var child_item = (<HTMLOptionElement>children.item(idx));

        // Replace any placeholders with their required param name.
        var required_param = _.find(action.params, "required");
        var action_path = required_param !== undefined ?
          action.path.replace("%d", ":" + required_param.name) : action.path;

        assert.equal(child_item.value, action.name);
        assert.equal(child_item.text, action_path);
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

  describe("when cannot submit", () => {
    beforeEach(() => {
      canSubmitRequestStub.returns(false);
      renderRoot();
    });

    it("should have disabled submit button", () => {
      var submitRequest = testUtils.findRenderedDOMComponentWithClass(
        root, "submit-request");

      sinon.assert.calledOnce(canSubmitRequestStub);
      assert.isTrue(submitRequest.props.disabled);
    });
  });
});
