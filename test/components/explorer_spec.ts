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
      var validAction = resource.actions[1];
      var explorer = testUtils.renderIntoDocument<Explorer>(
        Explorer.create({
          initialClient: client,
          initialResourceString:
            ResourcesHelpers.resourceNameFromResource(resource),
          initialRoute: validAction.path
        })
      );

      assert.equal(explorer.state.action, validAction);
    });

    it("should ignore initial routes if not found in the resource", () => {
      var invalidRoute = "/this/does/not/exist";
      var resource = Resources.Attachments;
      var explorer = testUtils.renderIntoDocument<Explorer>(
        Explorer.create({
          initialClient: client,
          initialResourceString:
            ResourcesHelpers.resourceNameFromResource(resource),
          initialRoute: invalidRoute
        })
      );

      assert.notEqual(explorer.state.action.path, invalidRoute);
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

    var initialAction: Action;
    var initialResource: Resource;

    beforeEach(() => {
      authStateFromClientStub.returns(Credentials.AuthState.Authorized);

      initialResource = Resources.Attachments;
      initialAction = initialResource.actions[0];

      root = testUtils.renderIntoDocument<Explorer>(
        Explorer.create({
          initialClient: client,
          initialRoute: initialAction.path,
          initialResourceString:
            ResourcesHelpers.resourceNameFromResource(initialResource)
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
        var oldAction: Action;
        var oldParams: any;

        beforeEach(() => {
          oldAction = root.state.action;
          oldParams = root.state.params;

          root.state.params.includeFields.push("test");

          testUtils.Simulate.change(selectResource, {
            target: {
              value: ResourcesHelpers.resourceNameFromResource(initialResource)
            }
          });
        });

        it("should not change resource", () => {
          assert.equal(root.state.resource, initialResource);
        });

        it("should not change action", () => {
          assert.equal(root.state.action, initialAction);
          assert.include(initialResource.actions, root.state.action);
        });

        it("should not clear params", () => {
          assert.deepEqual(root.state.params, oldParams);
        });
      });

      describe("on resource change", () => {
        var otherResource: Resource;

        beforeEach(() => {
          otherResource = Resources.Events;

          root.state.params.includeFields.push("test");

          testUtils.Simulate.change(selectResource, {
            target: {
              value: ResourcesHelpers.resourceNameFromResource(otherResource)
            }
          });
        });

        it("should update resource", () => {
          assert.notEqual(initialResource, otherResource);
          assert.equal(root.state.resource, otherResource);
        });

        it("should reset action to a valid state", () => {
          assert.notEqual(root.state.action, initialAction);
          assert.include(otherResource.actions, root.state.action);
        });

        it("should clear params", () => {
          assert.deepEqual(root.state.params, Explorer.emptyParams());
        });
      });

      describe("on no action change", () => {
        var oldParams: any;

        beforeEach(() => {
          oldParams = root.state.params;

          root.state.params.includeFields.push("test");

          testUtils.Simulate.change(selectRoute, {
            target: {value: initialAction.name}
          });
        });

        it("should not change action", () => {
          assert.equal(root.state.action, initialAction);
          assert.include(initialResource.actions, root.state.action);
        });

        it("should not clear params", () => {
          assert.deepEqual(root.state.params, oldParams);
        });
      });

      describe("on action change", () => {
        var otherAction: Action;

        beforeEach(() => {
          otherAction = initialResource.actions[1];

          testUtils.Simulate.change(selectRoute, {
            target: {value: otherAction.name}
          });
        });

        it("should update action", () => {
          assert.notEqual(root.state.action, initialAction);
          assert.include(initialResource.actions, root.state.action);
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
          root.state.params.includeFields.push("example");
        });

        it("should add property to params if previously unchecked", () => {
          assert.sameMembers(root.state.params.includeFields, ["example"]);

          var checkbox = propertyCheckboxes[0];
          testUtils.Simulate.change(checkbox, {
            target: {
              checked: true,
              value: React.findDOMNode<HTMLInputElement>(checkbox).value
            }
          });

          assert.sameMembers(
            root.state.params.includeFields,
            ["example", checkbox.props.value]
          );
        });

        it("should remove property from params if previously checked", () => {
          var checkbox = propertyCheckboxes[0];
          var value = React.findDOMNode<HTMLInputElement>(checkbox).value;

          root.state.params.includeFields.push(value);
          testUtils.Simulate.change(checkbox, {
            target: {
              checked: false,
              value: value
            }
          });

          assert.sameMembers(
            root.state.params.includeFields,
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
          var paramName: string;

          beforeEach(() => {
            var parameter = _.find(root.state.action.params, "required");
            paramName = parameter.name;

            // Add an existing parameters to ensure no data clobbering.
            root.state.params.requiredParams.example = "data here";
            root.state.params.optionalParams.other_example = "other data";
          });

          it("should add parameter when previously empty", () => {
            testUtils.Simulate.change(requiredParam, {
              target: {
                className: requiredParam.props.className,
                value: "some content"
              }
            });

            assert.deepEqual(
              root.state.params.requiredParams,
              _.object(["example", paramName], ["data here", "some content"])
            );

            // Other parameters should be unchanged.
            assert.deepEqual(
              root.state.params.optionalParams,
              { other_example: "other data" }
            );
          });

          it("should update parameter when previously set", () => {
            // Add some initial data and verify it's there.
            root.state.params.requiredParams[paramName] = "old data";
            assert.deepEqual(
              root.state.params.requiredParams,
              _.object(["example", paramName], ["data here", "old data"])
            );

            // We now change the data and verify it was updated.
            testUtils.Simulate.change(requiredParam, {
              target: {
                className: requiredParam.props.className,
                value: "new content!"
              }
            });
            assert.deepEqual(
              root.state.params.requiredParams,
              _.object(["example", paramName], ["data here", "new content!"])
            );

            // Other parameters should be unchanged.
            assert.deepEqual(
              root.state.params.optionalParams,
              { other_example: "other data" }
            );
          });

          it("should remove parameter when unset", () => {
            // Add some initial data and verify it's there.
            root.state.params.requiredParams[paramName] = "old data";
            assert.deepEqual(
              root.state.params.requiredParams,
              _.object(["example", paramName], ["data here", "old data"])
            );

            // We now change the data and verify it was updated.
            testUtils.Simulate.change(requiredParam, {
              target: {
                className: requiredParam.props.className,
                value: ""
              }
            });
            assert.deepEqual(
              root.state.params.requiredParams,
              { example: "data here" }
            );

            // Other parameters should be unchanged.
            assert.deepEqual(
              root.state.params.optionalParams,
              { other_example: "other data" }
            );
          });
        });

        describe("with optional parameters", () => {
          var paramName: string;

          beforeEach(() => {
            var parameter = _.find(
              root.state.action.params, param => !param.required);
            paramName = parameter.name;

            // Add an existing parameters to ensure no data clobbering.
            root.state.params.requiredParams.example = "data here";
            root.state.params.optionalParams.other_example = "other data";
          });

          it("should add parameter when previously empty", () => {
            testUtils.Simulate.change(optionalParam, {
              target: {
                className: optionalParam.props.className,
                value: "some content"
              }
            });

            assert.deepEqual(
              root.state.params.optionalParams,
              _.object(
                ["other_example", paramName],
                ["other data", "some content"])
            );

            // Other parameters should be unchanged.
            assert.deepEqual(
              root.state.params.requiredParams,
              { example: "data here" }
            );
          });

          it("should update parameter when previously set", () => {
            // Add some initial data and verify it's there.
            root.state.params.optionalParams[paramName] = "old data";
            assert.deepEqual(
              root.state.params.optionalParams,
              _.object(
                ["other_example", paramName],
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
              root.state.params.optionalParams,
              _.object(
                ["other_example", paramName],
                ["other data", "new content!"])
            );

            // Other parameters should be unchanged.
            assert.deepEqual(
              root.state.params.requiredParams,
              { example: "data here" }
            );
          });

          it("should remove parameter when unset", () => {
            // Add some initial data and verify it's there.
            root.state.params.optionalParams[paramName] = "old data";
            assert.deepEqual(
              root.state.params.optionalParams,
              _.object(
                ["other_example", paramName], ["other data", "old data"])
            );

            // We now change the data and verify it was updated.
            testUtils.Simulate.change(optionalParam, {
              target: {
                className: optionalParam.props.className,
                value: ""
              }
            });
            assert.deepEqual(
              root.state.params.optionalParams,
              { other_example: "other data" }
            );

            // Other parameters should be unchanged.
            assert.deepEqual(
              root.state.params.requiredParams,
              { example: "data here" }
            );
          });
        });

        describe("with extra params", () => {
          it("should include only fully-entered parameter fields", () => {
            assert.deepEqual(root.state.params.extraParams, {});

            var parameterList = [
              { key: "hi", value: "yeah" },
              { key: "", value: "empty" },
              { key: "real", value: "data" },
              { key: "empty", value: "" }
            ];

            // Syncing the parameters should add each accordingly.
            root.syncExtraParameters(parameterList);
            assert.deepEqual(
              root.state.params.extraParams,
              { hi: "yeah", real: "data" }
            );
          });

          it("should remove parameter fields that no longer exist", () => {
            var originalParameterList = [
              { key: "hi", value: "bye" },
              { key: "yeah", value: "data" }
            ];
            root.syncExtraParameters(originalParameterList);
            assert.deepEqual(
              root.state.params.extraParams,
              { hi: "bye", yeah: "data" }
            );

            // Syncing an altered parameter list should update accordingly.
            var newParameterList = [
              { key: "yeah", value: "new_data" }
            ];
            root.syncExtraParameters(newParameterList);
            assert.deepEqual(
              root.state.params.extraParams,
              { yeah: "new_data" }
            );
          });

          it("should be empty with no parameters", () => {
            root.syncExtraParameters([]);
            assert.deepEqual(root.state.params.extraParams, {});
          });
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
          root.state.params.requiredParams.example = "data here";
          root.state.params.optionalParams.other_example = "other data";
        });

        it("should update workspace when select from dropdown", () => {
          var oldParams = _.cloneDeep(root.state.params);

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
          assert.deepEqual(root.state.params, oldParams);
        });

        it("should not change state when select same workspace", () => {
          var oldParams = _.cloneDeep(root.state.params);

          // We now change the data to the same workspace.
          testUtils.Simulate.change(workspaceParam, {
            target: {
              className: workspaceParam.props.className,
              value: root.state.workspace.id
            }
          });

          assert.deepEqual(root.state.params, oldParams);
        });
      });

      describe("on pagination parameter input", () => {
        var inputLimitParam: React.HTMLComponent;
        var inputOffsetParam: React.HTMLComponent;

        beforeEach(() => {
          // Use a route that has pagination enabled.
          testUtils.Simulate.change(selectResource, {
            target: {value: "Users"}
          });
          testUtils.Simulate.change(selectRoute, {
            target: {value: "findAll"}
          });

          inputLimitParam = testUtils.findRenderedDOMComponentWithClass(
            root, "paginate-entry-limit");
          inputOffsetParam = testUtils.findRenderedDOMComponentWithClass(
            root, "paginate-entry-offset");
        });

        function setDataForPaginationParam(
          param: React.HTMLComponent, value: string, opt_validity?: boolean) {
          testUtils.Simulate.change(param, {
            target: {
              value: value,
              checkValidity: () =>
              opt_validity !== undefined ? opt_validity : true
            }
          });
        }

        it("should change state after updating limit/offset values", () => {
          setDataForPaginationParam(inputOffsetParam, "abc abc");
          assert.deepEqual(
            root.state.params.paginateParams,
            { limit: constants.INITIAL_PAGINATION_LIMIT, offset: "abc abc" }
          );

          setDataForPaginationParam(inputLimitParam, "123");
          assert.deepEqual(
            root.state.params.paginateParams,
            { limit: "123", offset: "abc abc" }
          );
        });

        it("should remove parameter when clearing limit/offset input", () => {
          setDataForPaginationParam(inputLimitParam, "");
          assert.deepEqual(root.state.params.paginateParams, {});

          setDataForPaginationParam(inputOffsetParam, "hi there");
          assert.deepEqual(
            root.state.params.paginateParams, { offset: "hi there" });

          setDataForPaginationParam(inputLimitParam, "123");
          assert.deepEqual(
            root.state.params.paginateParams,
            { limit: "123", offset: "hi there" }
          );

          setDataForPaginationParam(inputOffsetParam, "");
          assert.deepEqual(
            root.state.params.paginateParams, { limit: "123" });

          setDataForPaginationParam(inputLimitParam, "");
          assert.deepEqual(root.state.params.paginateParams, {});
        });

        it("should not change state if validity check fails", () => {
          var oldPaginateParams = _.cloneDeep(
            root.state.params.paginateParams);

          setDataForPaginationParam(inputLimitParam, "hi there", false);
          assert.deepEqual(
            root.state.params.paginateParams, oldPaginateParams);

          setDataForPaginationParam(inputOffsetParam, "hi there", false);
          assert.deepEqual(
            root.state.params.paginateParams, oldPaginateParams);
        });
      });
    });

    describe("on submit", () => {
      var rawResponsePromise: Promise<any>;
      var jsonResponse: string;
      var getStub: SinonStub;

      beforeEach(() => {
        var rawResponse = {data: "{ a: 2 }"};
        jsonResponse = JSON.stringify(rawResponse, undefined, 2);
        getStub = sand.stub(client.dispatcher, "get", () => {
          return rawResponsePromise = Promise.resolve(rawResponse);
        });

        // For these tests, we'll bypass the check for allowable submission.
        sand.stub(root, "userStateStatus")
          .returns(Explorer.UserStateStatus.Okay);
      });

      it("should display the submitted route URL", (cb) => {
        var requiredParam = _.find(initialAction.params, "required");

        testUtils.Simulate.submit(React.findDOMNode(routeEntry));

        // The path with no parameters should use a placeholder.
        var actionPath =
          initialAction.path.replace("%d", ":" + requiredParam.name);

        rawResponsePromise.then(function () {
          assert.include(
            React.findDOMNode(testUtils.findRenderedDOMComponentWithClass(
              root, "json-response-info")).textContent,
            actionPath
          );

          cb();
        }).catch(cb);
      });

      it("should display the submitted route URL with parameters", (cb) => {
        var requiredParam = _.find(initialAction.params, "required");

        root.state.params = {
          expandFields: ["test"],
          includeFields: ["other", "this"],
          requiredParams: _.object([requiredParam.name], ["123"]),
          optionalParams: {abc: 456},
          extraParams: {test: "hi"},
          paginateParams: {}
        };

        testUtils.Simulate.submit(React.findDOMNode(routeEntry));

        // The path should include all the params initialized above.
        var actionPath =
          initialAction.path.replace(/%d/, "123") +
          "?opt_expand=test&opt_fields=other,this&abc=456&test=hi";

        rawResponsePromise.then(function () {
          assert.include(
            React.findDOMNode(testUtils.findRenderedDOMComponentWithClass(
              root, "json-response-info")).textContent,
            actionPath
          );

          cb();
        }).catch(cb);
      });

      it("should display the current route method", (cb) => {
        testUtils.Simulate.submit(React.findDOMNode(routeEntry));

        rawResponsePromise.then(function () {
          assert.include(
            React.findDOMNode(testUtils.findRenderedDOMComponentWithClass(
              root, "json-response-info")).textContent,
            initialAction.method
          );

          cb();
        }).catch(cb);
      });

      it("should make a GET request with no parameters", (cb) => {
        testUtils.Simulate.submit(React.findDOMNode(routeEntry));

        rawResponsePromise.then(function () {
          sinon.assert.calledWith(
            getStub,
            ResourcesHelpers.pathForAction(initialAction),
            {}
          );

          assert.equal(
            React.findDOMNode(testUtils.findRenderedDOMComponentWithClass(
              root, "json-response-block")).textContent,
            jsonResponse);

          cb();
        }).catch(cb);
      });

      it("should make a GET request with parameters", (cb) => {
        var requiredParam = _.find(initialAction.params, "required");

        root.state.params = {
          expandFields: ["test"],
          includeFields: ["other", "this"],
          requiredParams: _.object([requiredParam.name], ["123"]),
          optionalParams: {abc: 456},
          extraParams: {test: "hi"},
          paginateParams: {}
        };

        testUtils.Simulate.submit(React.findDOMNode(routeEntry));

        rawResponsePromise.then(function () {
          sinon.assert.calledWith(
            getStub,
            initialAction.path.replace(/%d/, "123"),
            {
              opt_expand: "test",
              opt_fields: "other,this",
              abc: 456,
              test: "hi"
            }
          );

          assert.equal(
            React.findDOMNode(testUtils.findRenderedDOMComponentWithClass(
              root, "json-response-block")).textContent,
            jsonResponse);

          cb();
        }).catch(cb);
      });

      it("should make the correct request after changing resource", (cb) => {
        var otherResource = Resources.Events;
        var otherAction = otherResource.actions[0];

        // We change the resource, which in-turn will change the route.
        testUtils.Simulate.change(selectResource, {
          target: {
            value: ResourcesHelpers.resourceNameFromResource(otherResource)
          }
        });

        // Clicking the link should send request with the correct route.
        testUtils.Simulate.submit(React.findDOMNode(routeEntry));

        rawResponsePromise.then(function () {
          sinon.assert.calledWith(getStub, otherAction.path);

          assert.equal(
            React.findDOMNode(testUtils.findRenderedDOMComponentWithClass(
              root, "json-response-block")).textContent,
            jsonResponse);

          cb();
        }).catch(cb);
      });

      it("should make the correct request after changing route", (cb) => {
        var otherAction = initialResource.actions[1];

        testUtils.Simulate.change(selectRoute, {
          target: {value: otherAction.name}
        });

        // Clicking the link should send request with the correct route.
        testUtils.Simulate.submit(React.findDOMNode(routeEntry));

        rawResponsePromise.then(function () {
          sinon.assert.calledWith(
            getStub, ResourcesHelpers.pathForAction(otherAction));

          assert.equal(
            React.findDOMNode(testUtils.findRenderedDOMComponentWithClass(
              root, "json-response-block")).textContent,
            jsonResponse);

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
        var postAction = initialResource.actions[2];

        testUtils.Simulate.change(selectRoute, {
          target: {value: postAction.name}
        });

        assert.equal(root.state.action, postAction);
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
