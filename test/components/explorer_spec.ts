/// <reference path="../../src/asana.d.ts" />
/// <reference path="../../src/resources/interfaces.ts" />
import Asana = require("asana");
import chai = require("chai");
import Promise = require("bluebird");
import React = require("react/addons");
import sinon = require("sinon");
import _ = require("lodash");

import constants = require("../../src/constants");
import Credentials = require("../../src/credentials");
import Explorer = require("../../src/components/explorer");
import Resources = require("../../src/resources/resources");
import ResourcesHelpers = require("../../src/resources/helpers");

var assert = chai.assert;
var testUtils = React.addons.TestUtils;

describe("ExplorerComponent", () => {
  var sand: SinonSandbox;

  var client: Asana.Client;
  var authStateFromClientStub: SinonStub;
  var findAllWorkspacesPromise: Promise<any>;
  var findAllWorkspacesStub: SinonStub;

  beforeEach(() => {
    sand = sinon.sandbox.create();

    client = Asana.Client.create({
      clientId: constants.CLIENT_ID,
      redirectUri: constants.REDIRECT_URI
    });
    authStateFromClientStub = sand.stub(Credentials, "authStateFromClient");

    findAllWorkspacesPromise = Promise.resolve({
      data: [
        { id: "123", name: "Personal Projects" },
        { id: "456", name: "Workspace Name" }
      ]
    });
    findAllWorkspacesStub = sand.stub(client.workspaces, "findAll")
      .returns(findAllWorkspacesPromise);
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

    sinon.assert.called(authStateFromClientStub);
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

  describe("when expired", () => {
    var root: Explorer;
    var children: NodeList;

    beforeEach(() => {
      authStateFromClientStub.returns(Credentials.AuthState.Expired);

      root = testUtils.renderIntoDocument<Explorer>(
        Explorer.create({
          initialClient: client
        })
      );
      children = React.findDOMNode(root).childNodes;
    });

    it("should disable the submit button", () => {
      var submitRequest = testUtils.findRenderedDOMComponentWithClass(
        root, "submit-request");
      assert.isTrue(submitRequest.props.disabled);
    });

    it("should contain link to authorize client", (cb) => {
      var link = testUtils.findRenderedDOMComponentWithClass(
        root, "authorize-link");
      assert.equal(link.tagName, "A");

      // Stub authorization to set the client to authorized.
      var promise: Promise<any>;
      var authorizeStub = sand.stub(client, "authorize", () => {
          authStateFromClientStub.returns(Credentials.AuthState.Authorized);
          return promise = Promise.resolve();
        }
      );

      // Clicking the link send an authorization.
      testUtils.Simulate.click(React.findDOMNode(link));
      promise.then(function () {
        sinon.assert.called(authorizeStub);

        // Page should now be re-rendered with the api-explorer.
        assert.equal(testUtils.scryRenderedDOMComponentsWithClass(
          root, "authorize-link").length,
          0);

        assert.equal(testUtils.scryRenderedDOMComponentsWithClass(
          root, "api-explorer").length,
          1);

        cb();
      }).catch(cb);
    });

    it("should fetch workspaces only after authorization", (cb) => {
      sinon.assert.notCalled(findAllWorkspacesStub);
      assert.isUndefined(root.state.workspaces);
      assert.isUndefined(root.state.workspace);

      // Stub authorization to set the client to authorized.
      var promise: Promise<any>;
      sand.stub(client, "authorize", () => {
        authStateFromClientStub.returns(Credentials.AuthState.Authorized);
        return promise = Promise.resolve();
      });
      root.authorize();

      // After authorization resolves, the state should have updated.
      promise.then(() => {
        sinon.assert.called(findAllWorkspacesStub);
        findAllWorkspacesPromise.then(() => {
          assert.lengthOf(root.state.workspaces, 2);
          assert.equal(root.state.workspace, root.state.workspaces[0]);

          cb();
        }).catch(cb);
      }).catch(cb);
    });
  });

  describe("when unauthorized", () => {
    var root: Explorer;
    var children: NodeList;

    beforeEach(() => {
      authStateFromClientStub.returns(Credentials.AuthState.Unauthorized);

      root = testUtils.renderIntoDocument<Explorer>(
        Explorer.create({
          initialClient: client
        })
      );
      children = React.findDOMNode(root).childNodes;
    });

    it("should disable the submit button", () => {
      var submitRequest = testUtils.findRenderedDOMComponentWithClass(
        root, "submit-request");
      assert.isTrue(submitRequest.props.disabled);
    });

    it("should contain link to authorize client", (cb) => {
      var link = testUtils.findRenderedDOMComponentWithClass(
        root, "authorize-link");
      assert.equal(link.tagName, "A");

      // Stub authorization to set the client to authorized.
      var promise: Promise<any>;
      var authorizeStub = sand.stub(client, "authorize", () => {
          authStateFromClientStub.returns(Credentials.AuthState.Authorized);
          return promise = Promise.resolve();
        }
      );

      // Clicking the link send an authorization.
      testUtils.Simulate.click(React.findDOMNode(link));
      promise.then(function () {
        sinon.assert.called(authorizeStub);

        // Page should now be re-rendered with the api-explorer.
        assert.equal(testUtils.scryRenderedDOMComponentsWithClass(
          root, "authorize-link").length,
          0);

        assert.equal(testUtils.scryRenderedDOMComponentsWithClass(
          root, "api-explorer").length,
          1);

        cb();
      }).catch(cb);
    });

    it("should fetch workspaces only after authorization", (cb) => {
      sinon.assert.notCalled(findAllWorkspacesStub);
      assert.isUndefined(root.state.workspaces);
      assert.isUndefined(root.state.workspace);

      // Stub authorization to set the client to authorized.
      var promise: Promise<any>;
      sand.stub(client, "authorize", () => {
        authStateFromClientStub.returns(Credentials.AuthState.Authorized);
        return promise = Promise.resolve();
      });
      root.authorize();

      // After authorization resolves, the state should have updated.
      promise.then(() => {
        sinon.assert.called(findAllWorkspacesStub);
        findAllWorkspacesPromise.then(() => {
          assert.lengthOf(root.state.workspaces, 2);
          assert.equal(root.state.workspace, root.state.workspaces[0]);

          cb();
        }).catch(cb);
      }).catch(cb);
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
      authStateFromClientStub.returns(Credentials.AuthState.Authorized);

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

    it("should fetch workspaces for the user", (cb) => {
      sinon.assert.called(findAllWorkspacesStub);

      // After findAllWorkspaces resolves, the state should have updated.
      findAllWorkspacesPromise.then(() => {
        assert.lengthOf(root.state.workspaces, 2);
        assert.equal(root.state.workspace, root.state.workspaces[0]);
        cb();
      }).catch(cb);
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
        var extraParam: React.HTMLComponent;

        beforeEach(() => {
          // Use an action that has one required and one optional input.
          testUtils.Simulate.change(selectResource, {
            target: {value: "Events"}
          });

          // Fetch the required and optional params.
          var params = testUtils.scryRenderedDOMComponentsWithClass(
            root, "parameter-input");
          requiredParam = _.find(params, param =>
              _.contains(param.props.className, "required-param"));
          optionalParam = _.find(params, param =>
            !_.contains(param.props.className, "extra-param") &&
            !_.contains(param.props.className, "required-param"));
          extraParam = _.find(params, param =>
            _.contains(param.props.className, "extra-param"));
        });

        describe("with required parameters", () => {
          var param_name: string;

          beforeEach(() => {
            var parameter = _.find(root.state.action.params, "required");
            param_name = parameter.name;

            // Add an existing parameters to ensure no data clobbering.
            root.state.params.required_params.example = "data here";
            root.state.params.optional_params.other_example = "other data";
          });

          it("should add parameter when previously empty", () => {
            testUtils.Simulate.change(requiredParam, {
              target: {
                className: requiredParam.props.className,
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
            var parameter = _.find(
              root.state.action.params, param => !param.required);
            param_name = parameter.name;

            // Add an existing parameters to ensure no data clobbering.
            root.state.params.required_params.example = "data here";
            root.state.params.optional_params.other_example = "other data";
          });

          it("should add parameter when previously empty", () => {
            testUtils.Simulate.change(optionalParam, {
              target: {
                className: optionalParam.props.className,
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

        describe("with extra params", () => {
          beforeEach(() => {
            // Add an existing parameters to ensure no data clobbering.
            root.state.params.required_params.example = "data here";
            root.state.params.optional_params.other_example = "other data";
          });

          // TODO: Add tests for extra params.
        });
      });

      describe("on workspace parameter input", () => {
        var workspaceParam: React.HTMLComponent;

        beforeEach(() => {
          testUtils.Simulate.change(selectResource, {
            target: {value: "Workspaces"}
          });

          // Fetch the workspace param.
          var params = testUtils.scryRenderedDOMComponentsWithClass(
            root, "parameter-input");
          workspaceParam = _.find(params, param =>
            _.contains(param.props.id, "parameter_input_workspace"));

          // Add an existing parameters to ensure no data clobbering.
          root.state.params.required_params.example = "data here";
          root.state.params.optional_params.other_example = "other data";
        });

        it("should update workspace when select from dropdown", () => {
          var old_params = _.cloneDeep(root.state.params);

          // Verify initial workspace is chosen.
          assert.equal(root.state.workspace, root.state.workspaces[0]);

          // We now change the data and verify it was updated.
          testUtils.Simulate.change(workspaceParam, {
            target: {
              className: workspaceParam.props.className,
              value: root.state.workspaces[1].id
            }
          });
          assert.equal(root.state.workspace, root.state.workspaces[1]);

          // Ensure other params have not changed.
          assert.deepEqual(root.state.params, old_params);
        });

        it("should not change state when select same workspace", () => {
          var old_params = _.cloneDeep(root.state.params);

          // We now change the data to the same workspace.
          testUtils.Simulate.change(workspaceParam, {
            target: {
              className: workspaceParam.props.className,
              value: root.state.workspace.id
            }
          });

          assert.deepEqual(root.state.params, old_params);
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

        // For these tests, we'll bypass the check for allowable submission.
        sand.stub(root, "userStateStatus")
          .returns(Explorer.UserStateStatus.Okay);
      });

      it("should display the submitted route URL", (cb) => {
        var required_param = _.find(initial_action.params, "required");

        testUtils.Simulate.submit(React.findDOMNode(routeEntry));

        // The path with no parameters should use a placeholder.
        var action_path =
          initial_action.path.replace("%d", ":" + required_param.name);

        raw_response_promise.then(function () {
          assert.include(
            React.findDOMNode(testUtils.findRenderedDOMComponentWithClass(
              root, "json-response-info")).textContent,
            action_path
          );

          cb();
        }).catch(cb);
      });

      it("should display the submitted route URL with parameters", (cb) => {
        var required_param = _.find(initial_action.params, "required");

        root.state.params = {
          expand_fields: ["test"],
          include_fields: ["other", "this"],
          required_params: _.object([required_param.name], ["123"]),
          optional_params: {abc: 456},
          extra_params: {}
        };

        testUtils.Simulate.submit(React.findDOMNode(routeEntry));

        // The path should include all the params initialized above.
        var action_path =
          initial_action.path.replace(/%d/, "123") +
          "?opt_expand=test&opt_fields=other,this&abc=456";

        raw_response_promise.then(function () {
          assert.include(
            React.findDOMNode(testUtils.findRenderedDOMComponentWithClass(
              root, "json-response-info")).textContent,
            action_path
          );

          cb();
        }).catch(cb);
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
        }).catch(cb);
      });

      it("should make a GET request", (cb) => {
        testUtils.Simulate.submit(React.findDOMNode(routeEntry));

        raw_response_promise.then(function () {
          sinon.assert.calledWith(getStub,
            ResourcesHelpers.pathForAction(initial_action));

          assert.equal(
            React.findDOMNode(testUtils.findRenderedDOMComponentWithClass(
              root, "json-response-block")).textContent,
            json_response);

          cb();
        }).catch(cb);
      });

      it("should make a GET request with parameters", (cb) => {
        root.state.params = {
          expand_fields: ["test"],
          include_fields: ["other", "this"],
          required_params: {},
          optional_params: {},
          extra_params: {}
        };

        testUtils.Simulate.submit(React.findDOMNode(routeEntry));

        raw_response_promise.then(function () {
          sinon.assert.calledWith(
            getStub,
            ResourcesHelpers.pathForAction(initial_action),
            { opt_expand: "test", opt_fields: "other,this" }
          );

          assert.equal(
            React.findDOMNode(testUtils.findRenderedDOMComponentWithClass(
              root, "json-response-block")).textContent,
            json_response);

          cb();
        }).catch(cb);
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
        }).catch(cb);
      });

      it("should make the correct request after changing route", (cb) => {
        var other_action = initial_resource.actions[1];

        testUtils.Simulate.change(selectRoute, {
          target: {value: other_action.name}
        });

        // Clicking the link should send request with the correct route.
        testUtils.Simulate.submit(React.findDOMNode(routeEntry));

        raw_response_promise.then(function () {
          sinon.assert.calledWith(
            getStub, ResourcesHelpers.pathForAction(other_action));

          assert.equal(
            React.findDOMNode(testUtils.findRenderedDOMComponentWithClass(
              root, "json-response-block")).textContent,
            json_response);

          cb();
        }).catch(cb);
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

        assert.equal(
          root.userStateStatus(),
          Explorer.UserStateStatus.ErrorUnsetRequiredParams);
      });

      it("should be enabled with set required param with get request", () => {
        var requiredParam = testUtils.findRenderedDOMComponentWithClass(
          root, "required-param");

        testUtils.Simulate.change(requiredParam, {
          target: {
            className: requiredParam.props.className,
            value: "hi there"
          }
        });
        assert.isFalse(submitRequest.props.disabled);

        assert.equal(
          root.userStateStatus(),
          Explorer.UserStateStatus.Okay);
      });

      it("should be disabled with non-get request", () => {
        var other_resource = Resources.Tasks;

        testUtils.Simulate.change(selectResource, {
          target: {
            value: ResourcesHelpers.resourceNameFromResource(other_resource)
          }
        });

        assert.equal(root.state.resource, other_resource);
        assert.notEqual(root.state.action.method, "GET");
        assert.isTrue(submitRequest.props.disabled);

        assert.equal(
          root.userStateStatus(),
          Explorer.UserStateStatus.ErrorUnsupportedMethodType);
      });

      it("should throw when the user submits on disabled state", () => {
        assert.notEqual(
          root.userStateStatus(),
          Explorer.UserStateStatus.Okay);

        assert.isTrue(submitRequest.props.disabled);
        assert.throws(root.onSubmitRequest);
      });
    });
  });
});
