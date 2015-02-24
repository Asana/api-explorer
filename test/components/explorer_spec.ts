/// <reference path="../../src/asana_json.d.ts" />
/* tslint:disable:no-unused-variable */
import mock_dom = require("../mock_dom");
/* tslint:enable:no-unused-variable */

import AsanaJson = require("asana-json");
import chai = require("chai");
import Promise = require("bluebird");
import react = require("react/addons");
import sinon = require("sinon");

import AuthorizedClient = require("../../src/authorized_client");
import Explorer = require("../../src/components/explorer");
import Resources = require("../../src/resources");
import helpers = require("../helpers");

var assert = chai.assert;
var testUtils = react.addons.TestUtils;

describe("ExplorerComponent", () => {
  var sand: SinonSandbox;

  var client: AuthorizedClient;
  var isAuthorizedStub: SinonStub;

  beforeEach(() => {
    sand = sinon.sandbox.create();

    client = new AuthorizedClient();
    isAuthorizedStub = sand.stub(client, "isAuthorized");
  });

  afterEach(() => {
    sand.restore();
  });

  it("should check authorization state", () => {
    testUtils.renderIntoDocument<Explorer.Component>(
      Explorer.create({
        initialAuthorizedClient: client
      })
    );

    sinon.assert.called(isAuthorizedStub);
  });

  describe("when unauthorized", () => {
    var root: Explorer.Component;
    var node: Node;
    var children: NodeList;

    beforeEach(() => {
      isAuthorizedStub.returns(false);

      root = testUtils.renderIntoDocument<Explorer.Component>(
        Explorer.create({
          initialAuthorizedClient: client
        })
      );
      node = root.getDOMNode();
      children = node.childNodes;
    });

    it("should not contain the api explorer", () => {
      assert.equal(testUtils.scryRenderedDOMComponentsWithClass(
        root,
        "api-explorer"
      ).length, 0);
    });

    it("should contain link to authorize client", (cb) => {
      var link = testUtils.findRenderedDOMComponentWithClass(
        root,
        "authorize-link"
      );
      assert.equal(link.tagName, "A");

      // Stub authorization to set the client to authorized.
      var promise: Promise<any>;
      var authorizeStub = sand.stub(client, "authorizeIfExpired", () => {
          isAuthorizedStub.returns(true);
          return promise = Promise.resolve();
        }
      );

      // Clicking the link send an authorization.
      testUtils.Simulate.click(link.getDOMNode());
      promise.then(function () {
        sinon.assert.called(authorizeStub);

        // Page should now be re-rendered with the api-explorer.
        assert.equal(testUtils.scryRenderedDOMComponentsWithClass(
          root,
          "authorize-link"
        ).length, 0);

        assert.equal(testUtils.scryRenderedDOMComponentsWithClass(
          root,
          "api-explorer"
        ).length, 1);

        cb();
      }).catch(function (err) {
        cb(err);
      });
    });
  });

  describe("when authorized", () => {
    var root: Explorer.Component;
    var selectResource: React.HTMLComponent;
    var selectRoute: React.HTMLComponent;
    var routeEntry: React.HTMLComponent;

    var initial_route: string;
    var initial_resource: AsanaJson.Resource;

    beforeEach(() => {
      isAuthorizedStub.returns(true);

      initial_resource = helpers.fetchResource(0);
      initial_route = Resources.routesFromResource(initial_resource)[0];

      root = testUtils.renderIntoDocument<Explorer.Component>(
        Explorer.create({
          initialAuthorizedClient: client,
          initial_route: initial_route,
          initial_resource_string:
            Resources.resourceNameFromResource(initial_resource)
        })
      );
      selectResource = testUtils.findRenderedDOMComponentWithClass(
        root,
        "select-resource"
      );
      selectRoute = testUtils.findRenderedDOMComponentWithClass(
        root,
        "select-route"
      );
      routeEntry = testUtils.findRenderedDOMComponentWithClass(
        root,
        "route-entry"
      );
    });

    it("should not contain the authorization link", () => {
      assert.equal(testUtils.scryRenderedDOMComponentsWithClass(
        root,
        "authorize-link"
      ).length, 0);
    });

    it("should display the current route URL", () => {
      assert.include(
        (<HTMLInputElement>selectRoute.getDOMNode()).value,
        initial_route
      );
    });

    it("should make a GET request on submit", (cb) => {
      // Stub get request to return json.
      var json_promise = Promise.resolve({data: "{ a: 2 }"});
      var getStub = sand.stub(client, "get").returns(json_promise);

      // Clicking the link should send request with the correct route.
      testUtils.Simulate.submit(routeEntry.getDOMNode());
      json_promise.then(function () {
        sinon.assert.calledWith(getStub, initial_route);

        assert.equal(testUtils.findRenderedDOMComponentWithClass(
          root,
          "json-response-block"
        ).getDOMNode().textContent, "\"{ a: 2 }\"");

        cb();
      }).catch(function (err) {
        cb(err);
      });
    });

    it("should make the correct GET request after changing resource", (cb) => {
      var other_resource = helpers.fetchResource(1);
      var other_route = Resources.routesFromResource(other_resource)[0];

      // Stub get request to return json.
      var json_promise = Promise.resolve({data: "{ a: 2 }"});
      var getStub = sand.stub(client, "get")
        .withArgs(other_route).returns(json_promise);

      // We change the resource, which in-turn will change the route.
      testUtils.Simulate.change(selectResource, {
        target: { value: Resources.resourceNameFromResource(other_resource) }
      });

      // Clicking the link should send request with the correct route.
      testUtils.Simulate.submit(routeEntry.getDOMNode());
      json_promise.then(function () {
        sinon.assert.calledWith(getStub, other_route);

        assert.equal(testUtils.findRenderedDOMComponentWithClass(
          root,
          "json-response-block"
        ).getDOMNode().textContent, "\"{ a: 2 }\"");

        cb();
      }).catch(function (err) {
        cb(err);
      });
    });

    it("should make the correct GET request after changing route", (cb) => {
      var other_route = Resources.routesFromResource(initial_resource)[1];

      // Stub get request to return json.
      var json_promise = Promise.resolve({data: "{ a: 2 }"});
      var getStub = sand.stub(client, "get")
        .withArgs(other_route).returns(json_promise);

      testUtils.Simulate.change(selectRoute, {
        target: { value: other_route }
      });

      // Clicking the link should send request with the correct route.
      testUtils.Simulate.submit(routeEntry.getDOMNode());
      json_promise.then(function () {
        sinon.assert.calledWith(getStub, other_route);

        assert.equal(testUtils.findRenderedDOMComponentWithClass(
          root,
          "json-response-block"
        ).getDOMNode().textContent, "\"{ a: 2 }\"");

        cb();
      }).catch(function (err) {
        cb(err);
      });
    });
  });
});
