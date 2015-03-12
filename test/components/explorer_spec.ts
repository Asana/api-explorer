/// <reference path="../../src/asana.d.ts" />
/// <reference path="../../src/resources/interfaces.ts" />
import Asana = require("asana");
import chai = require("chai");
import Promise = require("bluebird");
import React = require("react/addons");
import sinon = require("sinon");
import _ = require("lodash");

import constants = require("../../src/constants");
import CredentialsManager = require("../../src/credentials_manager");
import Explorer = require("../../src/components/explorer");
import ParameterEntry = require("../../src/components/parameter_entry");
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

    describe("state updates", () => {
      describe("on no resource change", () => {
        var old_action: Action;
        var old_params: any;

        beforeEach(() => {
          old_action = root.state.action;
          old_params = root.state.params;

          root.state.params.include_fields.push("test");

          testUtils.Simulate.change(selectResource, {
            target: {
              value: ResourcesHelpers.resourceNameFromResource(initial_resource)
            }
          });
        });

        it("should not change resource", () => {
          assert.equal(root.state.resource, initial_resource);
        });

        it("should not change action", () => {
          assert.equal(root.state.action, initial_action);
          assert.include(initial_resource.actions, root.state.action);
        });

        it("should not clear params", () => {
          assert.deepEqual(root.state.params, old_params);
        });
      });

      describe("on resource change", () => {
        var other_resource: Resource;

        beforeEach(() => {
          other_resource = Resources.Events;

          root.state.params.include_fields.push("test");

          testUtils.Simulate.change(selectResource, {
            target: {
              value: ResourcesHelpers.resourceNameFromResource(other_resource)
            }
          });
        });

        it("should update resource", () => {
          assert.notEqual(initial_resource, other_resource);
          assert.equal(root.state.resource, other_resource);
        });

        it("should reset action to a valid state", () => {
          assert.notEqual(root.state.action, initial_action);
          assert.include(other_resource.actions, root.state.action);
        });

        it("should clear params", () => {
          assert.deepEqual(root.state.params, Explorer.emptyParams());
        });
      });

      describe("on no action change", () => {
        var old_params: any;

        beforeEach(() => {
          old_params = root.state.params;

          root.state.params.include_fields.push("test");

          testUtils.Simulate.change(selectRoute, {
            target: {value: initial_action.name}
          });
        });

        it("should not change action", () => {
          assert.equal(root.state.action, initial_action);
          assert.include(initial_resource.actions, root.state.action);
        });

        it("should not clear params", () => {
          assert.deepEqual(root.state.params, old_params);
        });
      });

      describe("on action change", () => {
        var other_action: Action;

        beforeEach(() => {
          other_action = initial_resource.actions[1];

          testUtils.Simulate.change(selectRoute, {
            target: {value: other_action.name}
          });
        });

        it("should update action", () => {
          assert.notEqual(root.state.action, initial_action);
          assert.include(initial_resource.actions, root.state.action);
        });

        it("should clear params", () => {
          assert.deepEqual(root.state.params, Explorer.emptyParams());
        });
      });

      describe("on property check", () => {
        var propertyCheckboxes: React.HTMLComponent[];

        beforeEach(() => {
          propertyCheckboxes = testUtils.scryRenderedDOMComponentsWithClass(
            root,
            "property-checkbox-include"
          );

          // Add an existing field to ensure no data clobbering.
          root.state.params.include_fields.push("example");
        });

        it("should add property to params if previously unchecked", () => {
          assert.sameMembers(root.state.params.include_fields, ["example"]);

          var checkbox = propertyCheckboxes[0];
          testUtils.Simulate.change(checkbox, {
            target: {
              checked: true,
              value: React.findDOMNode<HTMLInputElement>(checkbox).value
            }
          });

          assert.sameMembers(
            root.state.params.include_fields,
            ["example", checkbox.props.value]
          );
        });

        it("should remove property from params if previously checked", () => {
          var checkbox = propertyCheckboxes[0];
          var value = React.findDOMNode<HTMLInputElement>(checkbox).value;

          root.state.params.include_fields.push(value);
          testUtils.Simulate.change(checkbox, {
            target: {
              checked: false,
              value: value
            }
          });

          assert.sameMembers(
            root.state.params.include_fields,
            ["example"]
          );
        });
      });

      describe("on parameter input", () => {
        var requiredParam: React.HTMLComponent;
        var optionalParam: React.HTMLComponent;

        beforeEach(() => {
          // Use a resource/action that has both a required and optional input.
          testUtils.Simulate.change(selectResource, {
            target: {value: "Events"}
          });

          // Fetch the required and optional params.
          var params = testUtils.scryRenderedDOMComponentsWithClass(
            root, "parameter-input");
          requiredParam = _.find(params, param =>
              _.contains(param.props.className, "required-param"));
          optionalParam = _.find(params, param =>
            !_.contains(param.props.className, "required-param"));
        });

        describe("with required parameters", () => {
          var param_name: string;

          beforeEach(() => {
            param_name = ParameterEntry.parameterFromInputId(
              requiredParam.props.id);

            // Add an existing parameters to ensure no data clobbering.
            root.state.params.required_params.example = "data here";
            root.state.params.optional_params.other_example = "other data";
          });

          it("should add parameter when previously empty", () => {
            testUtils.Simulate.change(requiredParam, {
              target: {
                className: requiredParam.props.className,
                id: requiredParam.props.id,
                value: "some content"
              }
            });

            assert.deepEqual(
              root.state.params.required_params,
              _.object(["example", param_name], ["data here", "some content"])
            );

            // Other parameters should be unchanged.
            assert.deepEqual(
              root.state.params.optional_params,
              { other_example: "other data" }
            );
          });

          it("should update parameter when previously set", () => {
            // Add some initial data and verify it's there.
            root.state.params.required_params[param_name] = "old data";
            assert.deepEqual(
              root.state.params.required_params,
              _.object(["example", param_name], ["data here", "old data"])
            );

            // We now change the data and verify it was updated.
            testUtils.Simulate.change(requiredParam, {
              target: {
                className: requiredParam.props.className,
                id: requiredParam.props.id,
                value: "new content!"
              }
            });
            assert.deepEqual(
              root.state.params.required_params,
              _.object(["example", param_name], ["data here", "new content!"])
            );

            // Other parameters should be unchanged.
            assert.deepEqual(
              root.state.params.optional_params,
              { other_example: "other data" }
            );
          });

          it("should remove parameter when unset", () => {
            // Add some initial data and verify it's there.
            root.state.params.required_params[param_name] = "old data";
            assert.deepEqual(
              root.state.params.required_params,
              _.object(["example", param_name], ["data here", "old data"])
            );

            // We now change the data and verify it was updated.
            testUtils.Simulate.change(requiredParam, {
              target: {
                className: requiredParam.props.className,
                id: requiredParam.props.id,
                value: ""
              }
            });
            assert.deepEqual(
              root.state.params.required_params,
              { example: "data here" }
            );

            // Other parameters should be unchanged.
            assert.deepEqual(
              root.state.params.optional_params,
              { other_example: "other data" }
            );
          });
        });

        describe("with optional parameters", () => {
          var param_name: string;

          beforeEach(() => {
            param_name = ParameterEntry.parameterFromInputId(
              optionalParam.props.id);

            // Add an existing parameters to ensure no data clobbering.
            root.state.params.required_params.example = "data here";
            root.state.params.optional_params.other_example = "other data";
          });

          it("should add parameter when previously empty", () => {
            testUtils.Simulate.change(optionalParam, {
              target: {
                className: optionalParam.props.className,
                id: optionalParam.props.id,
                value: "some content"
              }
            });

            assert.deepEqual(
              root.state.params.optional_params,
              _.object(
                ["other_example", param_name],
                ["other data", "some content"])
            );

            // Other parameters should be unchanged.
            assert.deepEqual(
              root.state.params.required_params,
              { example: "data here" }
            );
          });

          it("should update parameter when previously set", () => {
            // Add some initial data and verify it's there.
            root.state.params.optional_params[param_name] = "old data";
            assert.deepEqual(
              root.state.params.optional_params,
              _.object(
                ["other_example", param_name],
                ["other data", "old data"])
            );

            // We now change the data and verify it was updated.
            testUtils.Simulate.change(optionalParam, {
              target: {
                className: optionalParam.props.className,
                id: optionalParam.props.id,
                value: "new content!"
              }
            });
            assert.deepEqual(
              root.state.params.optional_params,
              _.object(
                ["other_example", param_name],
                ["other data", "new content!"])
            );

            // Other parameters should be unchanged.
            assert.deepEqual(
              root.state.params.required_params,
              { example: "data here" }
            );
          });

          it("should remove parameter when unset", () => {
            // Add some initial data and verify it's there.
            root.state.params.optional_params[param_name] = "old data";
            assert.deepEqual(
              root.state.params.optional_params,
              _.object(
                ["other_example", param_name], ["other data", "old data"])
            );

            // We now change the data and verify it was updated.
            testUtils.Simulate.change(optionalParam, {
              target: {
                className: optionalParam.props.className,
                id: optionalParam.props.id,
                value: ""
              }
            });
            assert.deepEqual(
              root.state.params.optional_params,
              { other_example: "other data" }
            );

            // Other parameters should be unchanged.
            assert.deepEqual(
              root.state.params.required_params,
              { example: "data here" }
            );
          });
        });
      });
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
        testUtils.Simulate.submit(React.findDOMNode(routeEntry));

        raw_response_promise.then(function () {
          assert.include(
            React.findDOMNode(testUtils.findRenderedDOMComponentWithClass(
              root, "json-response-info")).textContent,
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

        testUtils.Simulate.submit(React.findDOMNode(routeEntry));

        raw_response_promise.then(function () {
          assert.include(
            React.findDOMNode(testUtils.findRenderedDOMComponentWithClass(
              root, "json-response-info")).textContent,
            initial_action.path + "?opt_expand=test&opt_fields=other,this"
          );

          cb();
        }).catch(function (err) {
          cb(err);
        });
      });

      it("should display the current route method", (cb) => {
        testUtils.Simulate.submit(React.findDOMNode(routeEntry));

        raw_response_promise.then(function () {
          assert.include(
            React.findDOMNode(testUtils.findRenderedDOMComponentWithClass(
              root, "json-response-info")).textContent,
            initial_action.method
          );

          cb();
        }).catch(function (err) {
          cb(err);
        });
      });

      it("should make a GET request", (cb) => {
        testUtils.Simulate.submit(React.findDOMNode(routeEntry));

        raw_response_promise.then(function () {
          sinon.assert.calledWith(getStub, initial_action.path);

          assert.equal(
            React.findDOMNode(testUtils.findRenderedDOMComponentWithClass(
              root, "json-response-block")).textContent,
            json_response);

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

        testUtils.Simulate.submit(React.findDOMNode(routeEntry));

        raw_response_promise.then(function () {
          sinon.assert.calledWith(
            getStub,
            initial_action.path,
            { opt_expand: "test", opt_fields: "other,this" }
          );

          assert.equal(
            React.findDOMNode(testUtils.findRenderedDOMComponentWithClass(
              root, "json-response-block")).textContent,
            json_response);

          cb();
        }).catch(function (err) {
          cb(err);
        });
      });

      it("should make the correct request after changing resource", (cb) => {
        var other_resource = Resources.Events;
        var other_action = other_resource.actions[0];

        // We change the resource, which in-turn will change the route.
        testUtils.Simulate.change(selectResource, {
          target: {
            value: ResourcesHelpers.resourceNameFromResource(other_resource)
          }
        });

        // Clicking the link should send request with the correct route.
        testUtils.Simulate.submit(React.findDOMNode(routeEntry));

        raw_response_promise.then(function () {
          sinon.assert.calledWith(getStub, other_action.path);

          assert.equal(
            React.findDOMNode(testUtils.findRenderedDOMComponentWithClass(
              root, "json-response-block")).textContent,
            json_response);

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
        testUtils.Simulate.submit(React.findDOMNode(routeEntry));

        raw_response_promise.then(function () {
          sinon.assert.calledWith(getStub, other_action.path);

          assert.equal(
            React.findDOMNode(testUtils.findRenderedDOMComponentWithClass(
              root, "json-response-block")).textContent,
            json_response);

          cb();
        }).catch(function (err) {
          cb(err);
        });
      });

    });

    describe("submit state", () => {
      var submitRequest: React.HTMLComponent;

      beforeEach(() => {
        submitRequest = testUtils.findRenderedDOMComponentWithClass(
          root, "submit-request");
      });

      it("should be disabled with unset required param with get request", () => {
        assert.equal(root.state.action.method, "GET");
        assert.propertyVal(root.state.action.params[0], "required", true);
        assert.isTrue(submitRequest.props.disabled);
      });

      it("should be enabled with set required param with get request", () => {
        var requiredParam = testUtils.findRenderedDOMComponentWithClass(
          root, "required-param");

        testUtils.Simulate.change(requiredParam, {
          target: {
            className: requiredParam.props.className,
            id: requiredParam.props.id,
            value: "hi there"
          }
        });
        assert.isFalse(submitRequest.props.disabled);
      });
    });

    it("should be disabled with non-get request", () => {
      var other_resource = Resources.Tasks;

      var submitRequest = testUtils.findRenderedDOMComponentWithClass(
        root, "submit-request");

      testUtils.Simulate.change(selectResource, {
        target: {
          value: ResourcesHelpers.resourceNameFromResource(other_resource)
        }
      });

      assert.equal(root.state.resource, other_resource);
      assert.notEqual(root.state.action.method, "GET");
      assert.isTrue(submitRequest.props.disabled);
    });
  });
});
