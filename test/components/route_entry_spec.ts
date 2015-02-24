/// <reference path="../../src/asana_json.d.ts" />
/* tslint:disable:no-unused-variable */
import mock_dom = require("../mock_dom");
/* tslint:enable:no-unused-variable */

import AsanaJson = require("asana-json");
import chai = require("chai");
import react = require("react/addons");
import sinon = require("sinon");

import Resources = require("../../src/resources");
import RouteEntry = require("../../src/components/route_entry");
import helpers = require("../helpers");

var assert = chai.assert;
var testUtils = react.addons.TestUtils;

describe("RouteEntryComponent", () => {
  var sand: SinonSandbox;

  var root: RouteEntry.Component;
  var routeForm: React.HTMLComponent;
  var selectResource: React.HTMLComponent;
  var selectRoute: React.HTMLComponent;

  var initial_route: string;
  var initial_resource: AsanaJson.Resource;
  var other_resource: AsanaJson.Resource;

  var onFormSubmitStub: SinonStub;
  var onResourceChangeStub: SinonStub;
  var onRouteChangeStub: SinonStub;

  beforeEach(() => {
    sand = sinon.sandbox.create();

    initial_resource = helpers.fetchResource(1);
    initial_route = Resources.routesFromResource(initial_resource)[0];
    other_resource = helpers.fetchResource(0);

    onFormSubmitStub = sand.stub();
    onResourceChangeStub = sand.stub();
    onRouteChangeStub = sand.stub();

    root = testUtils.renderIntoDocument<RouteEntry.Component>(
      RouteEntry.create({
        route: initial_route,
        resource: initial_resource,
        onFormSubmit: onFormSubmitStub,
        onResourceChange: onResourceChangeStub,
        onRouteChange: onRouteChangeStub
      })
    );
    routeForm = testUtils.findRenderedDOMComponentWithClass(
      root,
      "route-entry"
    );
    selectResource = testUtils.findRenderedDOMComponentWithClass(
      root,
      "select-resource"
    );
    selectRoute = testUtils.findRenderedDOMComponentWithClass(
      root,
      "select-route"
    );
  });

  afterEach(() => {
    sand.restore();
  });

  it("should contain dropdown to choose resource", () => {
    var selectNode = <HTMLInputElement>selectResource.getDOMNode();
    var resource_names = Resources.names();

    // The current resource should be selected.
    assert.include(
      selectNode.value,
      Resources.resourceNameFromResource(initial_resource)
    );
    // All other resources should be options.
    assert.equal(selectNode.children.length, resource_names.length);
    resource_names.forEach((resource_name, idx) => {
      assert.equal(
        (<HTMLOptionElement>selectNode.children.item(idx)).value,
        resource_name
      );
    });
  });

  it("should contain dropdown to choose route", () => {
    var selectNode = <HTMLInputElement>selectRoute.getDOMNode();
    var routes = Resources.routesFromResource(initial_resource);

    // The current route should be selected.
    assert.include(selectNode.value, initial_route);

    // All other routes should be options.
    assert.equal(selectNode.children.length, routes.length);
    routes.forEach((route, idx) => {
      assert.equal(
        (<HTMLOptionElement>selectNode.children.item(idx)).value,
        route
      );
    });
  });

  it("should trigger onFormSubmit property on submit", () => {
    testUtils.Simulate.submit(routeForm.getDOMNode());
    sinon.assert.called(onFormSubmitStub);
  });

  it("should trigger onRouteChange property on route change", () => {
    var other_route = Resources.routesFromResource(initial_resource)[1];

    testUtils.Simulate.change(selectRoute, {
      target: { value: other_route }
    });
    sinon.assert.called(onRouteChangeStub);
  });

  it("should trigger onResourceChange property on resource change", () => {
    testUtils.Simulate.change(selectResource, {
      target: { value: other_resource }
    });
    sinon.assert.called(onResourceChangeStub);
  });
});
