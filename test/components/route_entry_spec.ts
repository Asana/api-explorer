/// <reference path="../../src/resources/interfaces.ts" />
import chai = require("chai");
import sinon = require("sinon");
import _ = require("lodash");

import Resources = require("../../src/resources");
import RouteEntry = require("../../src/components/route_entry");
import {SinonSandbox, SinonStub} from "sinon";
import * as ReactTestUtils from "react-dom/test-utils";
import * as ReactDOM from "react-dom";

var assert = chai.assert;
var testUtils = ReactTestUtils;

describe("RouteEntryComponent", () => {
  var sand: SinonSandbox;

  var initialAction: Action;
  var initialResource: Resource;

  var onActionChangeStub: SinonStub;

  var root: RouteEntry;
  var selectRoute: Element;

  beforeEach(() => {
    sand = sinon.sandbox.create();

    initialResource = Resources.Projects;
    initialAction = initialResource.actions[0];

    onActionChangeStub = sand.stub();

    root = testUtils.renderIntoDocument(
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
      let selectRouteNode = ReactDOM.findDOMNode(selectRoute);
      if (selectRouteNode === null) {
          assert(false);
          return;
      }
      assert.include(
            selectRouteNode.nodeValue || "",
          initialAction.name
        );
  });

  it("should display the current route url", () => {
      let rootNode = ReactDOM.findDOMNode(root);
      if (rootNode === null) {
          assert(false);
          return;
      }
      assert.include(
          rootNode.textContent || "",
          initialAction.method + " " + "URL_HERE"
    );
  });

  it("should contain dropdown with other routes", () => {
    let selectRouteNode = ReactDOM.findDOMNode(selectRoute);

    if (selectRouteNode === null) {
        assert(false);
        return;
    }
    var children = selectRouteNode.childNodes;

    assert.equal(children.length, initialResource.actions.length);
    initialResource.actions.forEach((action, idx) => {
      var childItem = (<HTMLOptionElement>children.item(idx));

      // Replace any placeholders with their required param name.
      // NB: We use replace rather than util.format in order to ignore
      //     Paths that do not contain a placeholder.
      var requiredParam = _.find(action.params, "required");
      var actionPath = requiredParam !== undefined ?
        action.path.replace("%s", ":" + requiredParam.name) : action.path;

      assert.equal(childItem.value, action.name);
      assert.equal(childItem.text, action.method + " " + actionPath);
    });
  });

  it("should trigger onRouteChange property on route change", () => {
    selectRoute.dispatchEvent( new Event("change", {bubbles: true}));

    sinon.assert.called(onActionChangeStub);
  });
});
