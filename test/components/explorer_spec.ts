/// <reference path="../../src/asana.d.ts" />
/// <reference path="../../src/asana_json.d.ts" />
/* tslint:disable:no-unused-variable */
import mock_dom = require("../mock_dom");
/* tslint:enable:no-unused-variable */

import Asana = require("asana");
import AsanaJson = require("asana-json");
import chai = require("chai");
import Promise = require("bluebird");
import react = require("react/addons");
import sinon = require("sinon");

import constants = require("../../src/constants");
import CredentialsManager = require("../../src/credentials_manager");
import Explorer = require("../../src/components/explorer");
import Resources = require("../../src/resources");
import helpers = require("../helpers");

var assert = chai.assert;
var testUtils = react.addons.TestUtils;

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
    testUtils.renderIntoDocument<Explorer.Component>(
      Explorer.create({
        initialClient: client
      })
    );

    sinon.assert.called(isPossiblyValidFromClientStub);
  });

  describe("initial state", () => {
    it("should set initial routes if found in the resource", () => {
      var resource = helpers.fetchResource(0);
      var valid_action = resource.actions[1];
      var explorer = testUtils.renderIntoDocument<Explorer.Component>(
        Explorer.create({
          initialClient: client,
          initial_resource_string:
            Resources.resourceNameFromResource(resource),
          initial_route: valid_action.path
        })
      );

      assert.equal(explorer.state.action, valid_action);
    });

    it("should ignore initial routes if not found in the resource", () => {
      var invalid_route = "/this/does/not/exist";
      var resource = helpers.fetchResource(0);
      var explorer = testUtils.renderIntoDocument<Explorer.Component>(
        Explorer.create({
          initialClient: client,
          initial_resource_string:
            Resources.resourceNameFromResource(resource),
          initial_route: invalid_route
        })
      );

      assert.notEqual(explorer.state.action.path, invalid_route);
      assert.include(resource.actions, explorer.state.action);
    });
  });

  describe("when unauthorized", () => {
    var root: Explorer.Component;
    var node: Node;

    beforeEach(() => {
      isPossiblyValidFromClientStub.returns(false);

      root = testUtils.renderIntoDocument<Explorer.Component>(
        Explorer.create({
          initialClient: client
        })
      );
      node = root.getDOMNode();
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

    var initial_action: AsanaJson.Action;
    var initial_resource: AsanaJson.Resource;

    beforeEach(() => {
      isPossiblyValidFromClientStub.returns(true);

      initial_resource = helpers.fetchResource(0);
      initial_action = initial_resource.actions[0];

      root = testUtils.renderIntoDocument<Explorer.Component>(
        Explorer.create({
          initialClient: client,
          initial_route: initial_action.path,
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

    describe("on submit", () => {
      var raw_response_promise: Promise<any>;
      var json_response: string;
      var getStub: SinonStub;

      beforeEach(() => {
        var raw_response = {data: "{ a: 2 }"};
        json_response = JSON.stringify(raw_response, undefined, 2);
        getStub = sand.stub(client.dispatcher, "get", () => {
          return raw_response_promise = Promise.resolve(raw_response);
        });
      });

      it("should display the current route URL", (cb) => {
        testUtils.Simulate.submit(routeEntry.getDOMNode());

        raw_response_promise.then(function () {
          assert.include(
            testUtils.findRenderedDOMComponentWithClass(
              root, "json-response-info").getDOMNode().textContent,
            initial_action.path
          );

          cb();
        }).catch(function (err) {
          cb(err);
        });
      });

      it("should display the current route URL with parameters", (cb) => {
        root.state.params = {
          expand_fields: ["test"],
          include_fields: ["other", "this"],
          required_params: {},
          optional_params: {}
        };

        testUtils.Simulate.submit(routeEntry.getDOMNode());

        raw_response_promise.then(function () {
          assert.include(
            testUtils.findRenderedDOMComponentWithClass(
              root, "json-response-info").getDOMNode().textContent,
            initial_action.path + "?opt_expand=test&opt_fields=other,this"
          );

          cb();
        }).catch(function (err) {
          cb(err);
        });
      });

      it("should display the current route method", (cb) => {
        testUtils.Simulate.submit(routeEntry.getDOMNode());

        raw_response_promise.then(function () {
          assert.include(
            testUtils.findRenderedDOMComponentWithClass(
              root, "json-response-info").getDOMNode().textContent,
            initial_action.method
          );

          cb();
        }).catch(function (err) {
          cb(err);
        });
      });

      it("should make a GET request", (cb) => {
        testUtils.Simulate.submit(routeEntry.getDOMNode());

        raw_response_promise.then(function () {
          sinon.assert.calledWith(getStub, initial_action.path);

          assert.equal(testUtils.findRenderedDOMComponentWithClass(
            root,
            "json-response-block"
          ).getDOMNode().textContent, json_response);

          cb();
        }).catch(function (err) {
          cb(err);
        });
      });

      it("should make a GET request with parameters", (cb) => {
        root.state.params = {
          expand_fields: ["test"],
          include_fields: ["other", "this"],
          required_params: {},
          optional_params: {}
        };

        testUtils.Simulate.submit(routeEntry.getDOMNode());

        raw_response_promise.then(function () {
          sinon.assert.calledWith(
            getStub,
            initial_action.path,
            { opt_expand: "test", opt_fields: "other,this" }
          );

          assert.equal(testUtils.findRenderedDOMComponentWithClass(
            root,
            "json-response-block"
          ).getDOMNode().textContent, json_response);

          cb();
        }).catch(function (err) {
          cb(err);
        });
      });

      it("should make the correct request after changing resource", (cb) => {
        var other_resource = helpers.fetchResource(1);
        var other_action = other_resource.actions[0];

        // We change the resource, which in-turn will change the route.
        testUtils.Simulate.change(selectResource, {
          target: {value: Resources.resourceNameFromResource(other_resource)}
        });

        // Clicking the link should send request with the correct route.
        testUtils.Simulate.submit(routeEntry.getDOMNode());

        raw_response_promise.then(function () {
          sinon.assert.calledWith(getStub, other_action.path);

          assert.equal(testUtils.findRenderedDOMComponentWithClass(
            root,
            "json-response-block"
          ).getDOMNode().textContent, json_response);

          cb();
        }).catch(function (err) {
          cb(err);
        });
      });

      it("should make the correct request after changing route", (cb) => {
        var other_action = initial_resource.actions[1];

        testUtils.Simulate.change(selectRoute, {
          target: {value: other_action.name}
        });

        // Clicking the link should send request with the correct route.
        testUtils.Simulate.submit(routeEntry.getDOMNode());

        raw_response_promise.then(function () {
          sinon.assert.calledWith(getStub, other_action.path);

          assert.equal(testUtils.findRenderedDOMComponentWithClass(
            root,
            "json-response-block"
          ).getDOMNode().textContent, json_response);

          cb();
        }).catch(function (err) {
          cb(err);
        });
      });
    });
  });
});
