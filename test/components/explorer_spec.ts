/// <reference path="../../src/asana.d.ts" />
/// <reference path="../../src/resources/interfaces.ts" />
import Asana = require("asana");
import chai = require("chai");
import Promise = require("bluebird");
import React = require("react/addons");
import sinon = require("sinon");

import constants = require("../../src/constants");
import CredentialsManager = require("../../src/credentials_manager");
import Explorer = require("../../src/components/explorer");
import Resources = require("../../src/resources/resources");
import ResourcesHelpers = require("../../src/resources/helpers");

var assert = chai.assert;
var testUtils = React.addons.TestUtils;

describe("ExplorerComponent", () => {
  var sand: SinonSandbox;

  var client: Asana.Client;
  var isPossiblyValidFromClientStub: SinonStub;

  beforeEach(() => {
    sand = sinon.sandbox.create();

    client = Asana.Client.create({
      clientId: constants.CLIENT_ID,
      redirectUri: constants.REDIRECT_URI
    });
    isPossiblyValidFromClientStub = sand.stub(
      CredentialsManager, "isPossiblyValidFromClient");
  });

  afterEach(() => {
    sand.restore();
  });

  it("should check local storage authorization state", () => {
    testUtils.renderIntoDocument<Explorer>(
      Explorer.create({
        initialClient: client
      })
    );

    sinon.assert.called(isPossiblyValidFromClientStub);
  });

  describe("initial state", () => {
    it("should set initial routes if found in the resource", () => {
      var resource = Resources.Attachments;
      var valid_action = resource.actions[1];
      var explorer = testUtils.renderIntoDocument<Explorer>(
        Explorer.create({
          initialClient: client,
          initial_resource_string:
            ResourcesHelpers.resourceNameFromResource(resource),
          initial_route: valid_action.path
        })
      );

      assert.equal(explorer.state.action, valid_action);
    });

    it("should ignore initial routes if not found in the resource", () => {
      var invalid_route = "/this/does/not/exist";
      var resource = Resources.Attachments;
      var explorer = testUtils.renderIntoDocument<Explorer>(
        Explorer.create({
          initialClient: client,
          initial_resource_string:
            ResourcesHelpers.resourceNameFromResource(resource),
          initial_route: invalid_route
        })
      );

      assert.notEqual(explorer.state.action.path, invalid_route);
      assert.include(resource.actions, explorer.state.action);
    });
  });

  describe("when unauthorized", () => {
    var root: Explorer;
    var children: NodeList;

    beforeEach(() => {
      isPossiblyValidFromClientStub.returns(false);

      root = testUtils.renderIntoDocument<Explorer>(
        Explorer.create({
          initialClient: client
        })
      );
      children = React.findDOMNode(root).childNodes;
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
      var authorizeStub = sand.stub(client, "authorize", () => {
          isPossiblyValidFromClientStub.returns(true);
          return promise = Promise.resolve();
        }
      );

      // Clicking the link send an authorization.
      testUtils.Simulate.click(React.findDOMNode(link));
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
    var root: Explorer;
    var selectResource: React.HTMLComponent;
    var selectRoute: React.HTMLComponent;
    var routeEntry: React.HTMLComponent;

    var initial_action: Action;
    var initial_resource: Resource;

    beforeEach(() => {
      isPossiblyValidFromClientStub.returns(true);

      initial_resource = Resources.Attachments;
      initial_action = initial_resource.actions[0];

      root = testUtils.renderIntoDocument<Explorer>(
        Explorer.create({
          initialClient: client,
          initial_route: initial_action.path,
          initial_resource_string:
            ResourcesHelpers.resourceNameFromResource(initial_resource)
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
        (React.findDOMNode<HTMLInputElement>(selectRoute)).value,
        initial_action.name
      );
    });

    it("should make a GET request on submit", (cb) => {
      // Stub get request to return json.
      var json_promise = Promise.resolve({data: "{ a: 2 }"});
      var getStub = sand.stub(client.dispatcher, "get").returns(json_promise);

      // Clicking the link should send request with the correct route.
      testUtils.Simulate.submit(React.findDOMNode(routeEntry));
      json_promise.then(function () {
        sinon.assert.calledWith(getStub, initial_action.path);

        assert.equal(
          React.findDOMNode(testUtils.findRenderedDOMComponentWithClass(
            root, "json-response-block")).textContent,
          "\"{ a: 2 }\"");

        cb();
      }).catch(function (err) {
        cb(err);
      });
    });

    it("should make the correct GET request after changing resource", (cb) => {
      var other_resource = Resources.Events;
      var other_action = other_resource.actions[0];

      // Stub get request to return json.
      var json_promise = Promise.resolve({data: "{ a: 2 }"});
      var getStub = sand.stub(client.dispatcher, "get")
        .withArgs(other_action.path).returns(json_promise);

      // We change the resource, which in-turn will change the route.
      testUtils.Simulate.change(selectResource, {
        target: {
          value: ResourcesHelpers.resourceNameFromResource(other_resource)
        }
      });

      // Clicking the link should send request with the correct route.
      testUtils.Simulate.submit(React.findDOMNode(routeEntry));
      json_promise.then(function () {
        sinon.assert.calledWith(getStub, other_action.path);

        assert.equal(
          React.findDOMNode(testUtils.findRenderedDOMComponentWithClass(
            root, "json-response-block")).textContent,
          "\"{ a: 2 }\"");

        cb();
      }).catch(function (err) {
        cb(err);
      });
    });

    it("should make the correct GET request after changing route", (cb) => {
      var other_action = initial_resource.actions[1];

      // Stub get request to return json.
      var json_promise = Promise.resolve({data: "{ a: 2 }"});
      var getStub = sand.stub(client.dispatcher, "get")
        .withArgs(other_action.path).returns(json_promise);

      testUtils.Simulate.change(selectRoute, {
        target: { value: other_action.name }
      });

      // Clicking the link should send request with the correct route.
      testUtils.Simulate.submit(React.findDOMNode(routeEntry));
      json_promise.then(function () {
        sinon.assert.calledWith(getStub, other_action.path);

        assert.equal(
          React.findDOMNode(testUtils.findRenderedDOMComponentWithClass(
            root, "json-response-block")).textContent,
          "\"{ a: 2 }\"");

        cb();
      }).catch(function (err) {
        cb(err);
      });
    });
  });
});
