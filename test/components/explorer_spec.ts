/// <reference path="../../src/asana.d.ts" />
/// <reference path="../../src/resources/interfaces.ts" />
import Asana = require("asana");
import chai = require("chai");
import sinon = require("sinon");
import util = require("util");
import _ = require("lodash");
import * as ReactDOM from "react-dom";


import constants = require("../../src/constants");
import Credentials = require("../../src/credentials");
import Explorer = require("../../src/components/explorer");
import Resources = require("../../src/resources");
import ResourcesHelpers = require("../../src/resources/helpers");
import {SinonFakeServer, SinonStub} from "sinon";
import * as ReactTestUtils from "react-dom/test-utils";

const assert = chai.assert;
const testUtils = ReactTestUtils;
import Helpers = require("../helpers");

describe("ExplorerComponent", () => {
    let sand: SinonFakeServer;

    let client: Asana.Client;
    let authStateFromClientStub: SinonStub;
    let findAllWorkspacesPromise: Promise<any>;
    let findAllWorkspacesStub: any;


    before(() => {
        authStateFromClientStub = sinon.stub(Credentials, "authStateFromClient");
    })

    beforeEach(() => {
        sand = sinon.fakeServer.create();

        client = Asana.Client.create({
            clientId: constants.CLIENT_ID,
            redirectUri: constants.REDIRECT_URI
        });

        findAllWorkspacesPromise = Promise.resolve({
            data: [
                {id: "123", name: "Personal Projects"},
                {id: "456", name: "Workspace Name"}
            ]
        });

        findAllWorkspacesStub = sinon.stub(client.workspaces, "findAll").returns(findAllWorkspacesPromise)
    });

    afterEach(() => {
        sand.restore();
    });

    it("should check local storage authorization state", () => {
        testUtils.renderIntoDocument(
            Explorer.create({
                initialClient: client
            })
        );

        sinon.assert.called(authStateFromClientStub);
    });

    describe("initial state", () => {
        it("should set initial routes if found in the resource", () => {
            const resource = Resources.Attachments;
            const validAction = resource.actions[1];
            const explorer = testUtils.renderIntoDocument(
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
            const invalidRoute = "/this/does/not/exist";
            const resource = Resources.Attachments;
            const explorer = testUtils.renderIntoDocument(
                Explorer.create({
                    initialClient: client,
                    initialResourceString:
                        ResourcesHelpers.resourceNameFromResource(resource),
                    initialRoute: invalidRoute
                })
            );

            if (!explorer.state.action) {
                assert(false);
                return;
            }
            assert.notEqual(explorer.state.action.path, invalidRoute);
            assert.include(resource.actions, explorer.state.action);
        });
    });

    describe("when expired", () => {
        let root: Explorer;
        let children: NodeList;

        beforeEach(() => {
            authStateFromClientStub.returns(Credentials.AuthState.Expired);

            root = testUtils.renderIntoDocument(
                Explorer.create({
                    initialClient: client
                })
            );
            let domNode = ReactDOM.findDOMNode(root);

            if (domNode === null) {
                return;
            }

            children = domNode.childNodes;
        });

        it("should disable the submit button", () => {
            const submitRequest = testUtils.findRenderedDOMComponentWithClass(
                root, "submit-request");
            assert.isTrue((<HTMLButtonElement>submitRequest).disabled);
        });

        it("should contain link to authorize client", (cb) => {
            const link = testUtils.findRenderedDOMComponentWithClass(
                root, "authorize-link");
            assert.equal(link.tagName, "A");

            let authorizeStub = sinon.stub();

            // Stub authorization to set the client to authorized.
            let promise = new Promise<Asana.Client>((resolve, reject) => {
                authorizeStub = sinon.stub(client, "authorize").callsFake(() => {
                        authStateFromClientStub.returns(Credentials.AuthState.Authorized);
                        resolve(client);
                        return promise;
                    }
                );
            });

            // Clicking the link send an authorization.
            testUtils.Simulate.click(<Element>ReactDOM.findDOMNode(link));
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
            let promise = new Promise<Asana.Client>((resolve, reject) => {
                sinon.stub(client, "authorize").callsFake(() => {
                        authStateFromClientStub.returns(Credentials.AuthState.Authorized);
                        resolve(client);
                        return promise;
                    }
                );
            });
            root.authorize();

            // After authorization resolves, the state should have updated.
            promise.then(() => {
                findAllWorkspacesPromise.then(() => {
                    assert.lengthOf((root.state.workspaces || []), 2);
                    assert.equal(root.state.workspace, (root.state.workspaces || [])[0]);

                    cb();
                }).catch(cb);
            }).catch(cb);
        });
    });

    describe("when unauthorized", () => {
        let root: Explorer;
        let children: NodeList;

        beforeEach(() => {
            authStateFromClientStub.returns(Credentials.AuthState.Unauthorized);

            root = testUtils.renderIntoDocument(
                Explorer.create({
                    initialClient: client
                })
            );
            children = (<Element>ReactDOM.findDOMNode(root)).childNodes;
        });

        it("should disable the submit button", () => {
            const submitRequest = testUtils.findRenderedDOMComponentWithClass(
                root, "submit-request");
            assert.isTrue((<HTMLButtonElement>submitRequest).disabled);
        });

        it("should contain link to authorize client", (cb) => {
            const link = testUtils.findRenderedDOMComponentWithClass(
                root, "authorize-link");
            assert.equal(link.tagName, "A");

            let authorizeStub = sinon.stub();

            // Stub authorization to set the client to authorized.
            let promise = new Promise<Asana.Client>((resolve, reject) => {
                authorizeStub = sinon.stub(client, "authorize").callsFake(() => {
                        authStateFromClientStub.returns(Credentials.AuthState.Authorized);
                        resolve(client);
                        return promise;
                    }
                );
            });

            // Clicking the link send an authorization.
            testUtils.Simulate.click(<Element>ReactDOM.findDOMNode(link));
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
            let promise = new Promise<Asana.Client>((resolve, reject) => {
                sinon.stub(client, "authorize").callsFake(() => {
                        authStateFromClientStub.returns(Credentials.AuthState.Authorized);
                        resolve(client);
                        return promise;
                    }
                );
            });
            root.authorize();

            // After authorization resolves, the state should have updated.
            promise.then(() => {
                sinon.assert.called(findAllWorkspacesStub);
                findAllWorkspacesPromise.then(() => {
                    assert.lengthOf((root.state.workspaces || []), 2);
                    assert.equal(root.state.workspace, (root.state.workspaces || [])[0]);

                    cb();
                }).catch(cb);
            }).catch(cb);
        });
    });

    describe("when authorized", () => {
        let root: Explorer;
        let selectResource: Element;
        let selectRoute: Element;
        let routeEntry: Element;

        let initialAction: Action;
        let initialResource: Resource;

        beforeEach(() => {
            authStateFromClientStub.returns(Credentials.AuthState.Authorized);

            initialResource = Resources.Attachments;
            initialAction = initialResource.actions[1]; // GET method

            root = testUtils.renderIntoDocument(
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
                assert.lengthOf((root.state.workspaces || []), 2);
                assert.equal(root.state.workspace, (root.state.workspaces || [])[0]);
                cb();
            }).catch(cb);
        });

        describe("state updates", () => {
            describe("on no resource change", () => {
                let oldAction: Action;
                let oldParams: any;

                beforeEach(() => {
                    if (!root.state.params) {
                        return;
                    }

                    oldAction = <Action>root.state.action;
                    oldParams = root.state.params;

                    root.state.params.includeFields.push("test");

                    (<HTMLSelectElement>ReactDOM.findDOMNode(selectResource)).value =
                        ResourcesHelpers.resourceNameFromResource(initialResource);
                    testUtils.Simulate.change(selectResource);
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
                let otherResource: Resource;

                beforeEach(() => {
                    if (!root.state.params) {
                        return;
                    }

                    otherResource = Resources.Events;

                    root.state.params.includeFields.push("test");

                    (<HTMLSelectElement>ReactDOM.findDOMNode(selectResource)).value =
                        ResourcesHelpers.resourceNameFromResource(otherResource);
                    testUtils.Simulate.change(selectResource);
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
                let oldParams: any;

                beforeEach(() => {
                    if (!root.state.params) {
                        return;
                    }

                    oldParams = root.state.params;

                    root.state.params.includeFields.push("test");

                    (<HTMLSelectElement>ReactDOM.findDOMNode(selectRoute)).value = initialAction.name;
                    testUtils.Simulate.change(selectRoute);
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
                let otherAction: Action;

                beforeEach(() => {
                    otherAction = initialResource.actions[1];

                    (<HTMLSelectElement>ReactDOM.findDOMNode(selectRoute)).value = otherAction.name;
                    testUtils.Simulate.change(selectRoute);
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
                let propertyCheckboxes: Element[];

                beforeEach(() => {
                    if (!root.state.params) {
                        return;
                    }

                    propertyCheckboxes = testUtils.scryRenderedDOMComponentsWithClass(
                        root,
                        "property-checkbox-include"
                    );

                    // Add an existing field to ensure no data clobbering.
                    root.state.params.includeFields.push("example");
                });

                it("should add property to params if previously unchecked", () => {
                    if (!root.state.params) {
                        return;
                    }

                    assert.sameMembers(root.state.params.includeFields, ["example"]);

                    const checkbox = propertyCheckboxes[0];
                    (<HTMLInputElement>ReactDOM.findDOMNode(selectResource)).checked = true;
                    testUtils.Simulate.change(selectResource);

                    assert.sameMembers(
                        root.state.params.includeFields,
                        ["example", Helpers.findReactComponent(checkbox).props.value]
                    );
                });

                it("should remove property from params if previously checked", () => {
                    if (!root.state.params) {
                        return;
                    }

                    const checkbox = propertyCheckboxes[0];
                    const value = (<HTMLInputElement>ReactDOM.findDOMNode(checkbox)).value;

                    root.state.params.includeFields.push(value);

                    (<HTMLInputElement>ReactDOM.findDOMNode(checkbox)).checked = false;
                    testUtils.Simulate.change(checkbox);

                    assert.sameMembers(
                        root.state.params.includeFields,
                        ["example"]
                    );
                });
            });

            describe("on parameter input", () => {
                let requiredParam: Element;
                let optionalParam: Element;
                let extraParam: Element;

                beforeEach(() => {
                    // Use an action that has one required and one optional input.
                    (<HTMLSelectElement>ReactDOM.findDOMNode(selectResource)).value = "Events";
                    testUtils.Simulate.change(selectResource);

                    // Fetch the required and optional params.
                    const params = testUtils.scryRenderedDOMComponentsWithClass(
                        root, "parameter-input");
                    requiredParam = <Element>_.find(params, param =>
                        _.includes(Helpers.findReactComponent(param).props.className, "required-param"));
                    optionalParam = <Element>_.find(params, param =>
                        !_.includes(Helpers.findReactComponent(param).props.className, "extra-param") &&
                        !_.includes(Helpers.findReactComponent(param).props.className, "required-param"));
                    extraParam = <Element>_.find(params, param =>
                        _.includes(Helpers.findReactComponent(param).props.className, "extra-param"));
                });

                describe("with required parameters", () => {
                    let paramName: string;

                    beforeEach(() => {
                        const parameter = _.find((root.state.action || {}).params, "required");
                        paramName = (parameter || {}).name || "";

                        // Add an existing parameters to ensure no data clobbering.
                        (root.state.params || {}).requiredParams.example = "data here";
                        (root.state.params || {}).optionalParams.other_example = "other data";
                    });

                    it("should add parameter when previously empty", () => {
                        let element = (<HTMLSelectElement>ReactDOM.findDOMNode(requiredParam));
                        element.value = "some content";
                        element.className = Helpers.findReactComponent(requiredParam).props.className;
                        testUtils.Simulate.change(requiredParam);

                        assert.deepEqual(
                            (root.state.params || {}).requiredParams,
                            _.zipObject(["example", paramName], ["data here", "some content"])
                        );

                        // Other parameters should be unchanged.
                        assert.deepEqual(
                            (root.state.params || {}).optionalParams,
                            {other_example: "other data"}
                        );
                    });

                    it("should update parameter when previously set", () => {
                        // Add some initial data and verify it's there.
                        (root.state.params || {}).requiredParams[paramName] = "old data";
                        assert.deepEqual(
                            (root.state.params || {}).requiredParams,
                            _.zipObject(["example", paramName], ["data here", "old data"])
                        );

                        // We now change the data and verify it was updated.
                        let element = (<HTMLSelectElement>ReactDOM.findDOMNode(requiredParam));
                        element.value = "new content";
                        element.className = Helpers.findReactComponent(requiredParam).props.className;
                        testUtils.Simulate.change(requiredParam);
                        assert.deepEqual(
                            (root.state.params || {}).requiredParams,
                            _.zipObject(["example", paramName], ["data here", "new content!"])
                        );

                        // Other parameters should be unchanged.
                        assert.deepEqual(
                            (root.state.params || {}).optionalParams,
                            {other_example: "other data"}
                        );
                    });

                    it("should remove parameter when unset", () => {
                        // Add some initial data and verify it's there.
                        (root.state.params || {}).requiredParams[paramName] = "old data";
                        assert.deepEqual(
                            (root.state.params || {}).requiredParams,
                            _.zipObject(["example", paramName], ["data here", "old data"])
                        );

                        // We now change the data and verify it was updated.
                        let element = (<HTMLSelectElement>ReactDOM.findDOMNode(requiredParam));
                        element.value = "";
                        element.className = Helpers.findReactComponent(requiredParam).props.className;
                        testUtils.Simulate.change(requiredParam);

                        assert.deepEqual(
                            (root.state.params || {}).requiredParams,
                            {example: "data here"}
                        );

                        // Other parameters should be unchanged.
                        assert.deepEqual(
                            (root.state.params || {}).optionalParams,
                            {other_example: "other data"}
                        );
                    });
                });

                describe("with optional parameters", () => {
                    let paramName: string;

                    beforeEach(() => {
                        const parameter = _.find(
                            (root.state.action || {}).params, param => !param.required);
                        paramName = (parameter || {}).name || "";

                        // Add an existing parameters to ensure no data clobbering.
                        (root.state.params || {}).requiredParams.example = "data here";
                        (root.state.params || {}).optionalParams.other_example = "other data";
                    });

                    it("should add parameter when previously empty", () => {
                        let element = (<HTMLSelectElement>ReactDOM.findDOMNode(optionalParam));
                        element.value = "some content";
                        element.className = Helpers.findReactComponent(optionalParam).props.className;
                        testUtils.Simulate.change(optionalParam);

                        assert.deepEqual(
                            (root.state.params || {}).optionalParams,
                            _.zipObject(
                                ["other_example", paramName],
                                ["other data", "some content"])
                        );

                        // Other parameters should be unchanged.
                        assert.deepEqual(
                            (root.state.params || {}).requiredParams,
                            {example: "data here"}
                        );
                    });

                    it("should update parameter when previously set", () => {
                        // Add some initial data and verify it's there.
                        (root.state.params || {}).optionalParams[paramName] = "old data";
                        assert.deepEqual(
                            (root.state.params || {}).optionalParams,
                            _.zipObject(
                                ["other_example", paramName],
                                ["other data", "old data"])
                        );

                        // We now change the data and verify it was updated.
                        let element = (<HTMLSelectElement>ReactDOM.findDOMNode(optionalParam));
                        element.value = "new content";
                        element.className = Helpers.findReactComponent(optionalParam).props.className;
                        testUtils.Simulate.change(optionalParam);

                        assert.deepEqual(
                            (root.state.params || {}).optionalParams,
                            _.zipObject(
                                ["other_example", paramName],
                                ["other data", "new content!"])
                        );

                        // Other parameters should be unchanged.
                        assert.deepEqual(
                            (root.state.params || {}).requiredParams,
                            {example: "data here"}
                        );
                    });

                    it("should remove parameter when unset", () => {
                        // Add some initial data and verify it's there.
                        (root.state.params || {}).optionalParams[paramName] = "old data";
                        assert.deepEqual(
                            (root.state.params || {}).optionalParams,
                            _.zipObject(
                                ["other_example", paramName], ["other data", "old data"])
                        );

                        // We now change the data and verify it was updated.
                        let element = (<HTMLSelectElement>ReactDOM.findDOMNode(optionalParam));
                        element.value = "";
                        element.className = Helpers.findReactComponent(optionalParam).props.className;
                        testUtils.Simulate.change(optionalParam);

                        assert.deepEqual(
                            (root.state.params || {}).optionalParams,
                            {other_example: "other data"}
                        );

                        // Other parameters should be unchanged.
                        assert.deepEqual(
                            (root.state.params || {}).requiredParams,
                            {example: "data here"}
                        );
                    });
                });

                describe("with extra params", () => {
                    it("should include only fully-entered parameter fields", () => {
                        assert.deepEqual((root.state.params || {}).extraParams, {});

                        const parameterList = [
                            {key: "hi", value: "yeah"},
                            {key: "", value: "empty"},
                            {key: "real", value: "data"},
                            {key: "empty", value: ""}
                        ];

                        // Syncing the parameters should add each accordingly.
                        root.syncExtraParameters(parameterList);
                        assert.deepEqual(
                            (root.state.params || {}).extraParams,
                            {hi: "yeah", real: "data"}
                        );
                    });

                    it("should remove parameter fields that no longer exist", () => {
                        const originalParameterList = [
                            {key: "hi", value: "bye"},
                            {key: "yeah", value: "data"}
                        ];
                        root.syncExtraParameters(originalParameterList);
                        assert.deepEqual(
                            (root.state.params || {}).extraParams,
                            {hi: "bye", yeah: "data"}
                        );

                        // Syncing an altered parameter list should update accordingly.
                        const newParameterList = [
                            {key: "yeah", value: "new_data"}
                        ];
                        root.syncExtraParameters(newParameterList);
                        assert.deepEqual(
                            (root.state.params || {}).extraParams,
                            {yeah: "new_data"}
                        );
                    });

                    it("should be empty with no parameters", () => {
                        root.syncExtraParameters([]);
                        assert.deepEqual((root.state.params || {}).extraParams, {});
                    });
                });
            });

            describe("on workspace parameter input", () => {
                let workspaceParam: Element;

                beforeEach(() => {
                    let element = (<HTMLSelectElement>ReactDOM.findDOMNode(selectResource));
                    element.value = "Workspaces";
                    testUtils.Simulate.change(selectResource);

                    // Fetch the workspace param.
                    const params = testUtils.scryRenderedDOMComponentsWithClass(
                        root, "parameter-input");
                    workspaceParam = <Element>_.find(params, param =>
                        _.includes(Helpers.findReactComponent(param).props.id, "parameter_input_workspace"));

                    // Add an existing parameters to ensure no data clobbering.
                    (root.state.params || {}).requiredParams.example = "data here";
                    (root.state.params || {}).optionalParams.other_example = "other data";
                });

                it("should update workspace when select from dropdown", () => {
                    const oldParams = _.cloneDeep(root.state.params);

                    // Verify initial workspace is chosen.
                    assert.equal(root.state.workspace, (root.state.workspaces || [])[0]);

                    // We now change the data and verify it was updated.
                    let element = (<HTMLSelectElement>ReactDOM.findDOMNode(workspaceParam));
                    element.value = (root.state.workspaces || [])[1].gid;
                    element.className = Helpers.findReactComponent(workspaceParam).props.className;
                    testUtils.Simulate.change(workspaceParam);
                    assert.equal(root.state.workspace, (root.state.workspaces || [])[1]);

                    // Ensure other params have not changed.
                    assert.deepEqual(root.state.params, oldParams);
                });

                it("should not change state when select same workspace", () => {
                    const oldParams = _.cloneDeep(root.state.params);

                    // We now change the data to the same workspace.
                    let element = (<HTMLSelectElement>ReactDOM.findDOMNode(workspaceParam));
                    element.value = (root.state.workspace || {}).gid || "";
                    element.className = Helpers.findReactComponent(workspaceParam).props.className;
                    testUtils.Simulate.change(workspaceParam);

                    assert.deepEqual(root.state.params, oldParams);
                });
            });

            describe("on pagination parameter input", () => {
                let inputLimitParam: Element;
                let inputOffsetParam: Element;

                beforeEach(() => {
                    // Use a route that has pagination enabled.
                    let element = (<HTMLSelectElement>ReactDOM.findDOMNode(selectResource));
                    element.value = "Users";
                    testUtils.Simulate.change(selectResource);

                    element = (<HTMLSelectElement>ReactDOM.findDOMNode(selectRoute));
                    element.value = "findAll";
                    testUtils.Simulate.change(selectRoute);

                    inputLimitParam = testUtils.findRenderedDOMComponentWithClass(
                        root, "paginate-entry-limit");
                    inputOffsetParam = testUtils.findRenderedDOMComponentWithClass(
                        root, "paginate-entry-offset");
                });

                function setDataForPaginationParam(
                    param: Element, value: string, optValidity?: boolean) {

                    let element = (<HTMLSelectElement>ReactDOM.findDOMNode(param));
                    element.value = value;
                    element.checkValidity = () =>
                        optValidity !== undefined ? optValidity : true;
                    testUtils.Simulate.change(param);
                }

                it("should change state after updating limit/offset values", () => {
                    setDataForPaginationParam(inputOffsetParam, "abc abc");
                    assert.deepEqual(
                        (root.state.params || {}).paginateParams,
                        {limit: constants.INITIAL_PAGINATION_LIMIT, offset: "abc abc"}
                    );

                    setDataForPaginationParam(inputLimitParam, "123");
                    assert.deepEqual(
                        (root.state.params || {}).paginateParams,
                        {limit: 123, offset: "abc abc"}
                    );
                });

                it("should remove parameter when clearing limit/offset input", () => {
                    setDataForPaginationParam(inputLimitParam, "");
                    assert.deepEqual((root.state.params || {}).paginateParams, {});

                    setDataForPaginationParam(inputOffsetParam, "hi there");
                    assert.deepEqual(
                        (root.state.params || {}).paginateParams, {offset: "hi there"});

                    setDataForPaginationParam(inputLimitParam, "123");
                    assert.deepEqual(
                        (root.state.params || {}).paginateParams,
                        {limit: 123, offset: "hi there"}
                    );

                    setDataForPaginationParam(inputOffsetParam, "");
                    assert.deepEqual(
                        (root.state.params || {}).paginateParams, {limit: 123});

                    setDataForPaginationParam(inputLimitParam, "");
                    assert.deepEqual((root.state.params || {}).paginateParams, {});
                });

                it("should not change state if validity check fails", () => {
                    const oldPaginateParams = _.cloneDeep(
                        (root.state.params || {}).paginateParams);

                    setDataForPaginationParam(inputLimitParam, "hi there", false);
                    assert.deepEqual(
                        (root.state.params || {}).paginateParams, oldPaginateParams);

                    setDataForPaginationParam(inputOffsetParam, "hi there", false);
                    assert.deepEqual(
                        (root.state.params || {}).paginateParams, oldPaginateParams);
                });
            });
        });

        describe("on submit", () => {
            let rawResponsePromise: Promise<any>;
            let jsonResponse: string;
            let getStub: SinonStub;

            beforeEach(() => {
                const rawResponse = {data: "{ a: 2 }"};
                jsonResponse = JSON.stringify(rawResponse, undefined, 2);
                getStub = sinon.stub(client.dispatcher, "get").callsFake(() => {
                    return rawResponsePromise = Promise.resolve(rawResponse);
                });

                // For these tests, we'll bypass the check for allowable submission.
                sinon.stub(root, "userStateStatus")
                    .returns(Explorer.UserStateStatus.Okay);
            });

            it("should display the submitted route URL", (cb) => {
                const requiredParam = _.find(initialAction.params, "required");

                testUtils.Simulate.submit(routeEntry);

                // The path with no parameters should use a placeholder.
                const actionPath = util.format(initialAction.path, ":" + (requiredParam || {}).name);

                rawResponsePromise.then(function () {
                    assert.include(
                        (ReactDOM.findDOMNode(testUtils.findRenderedDOMComponentWithClass(
                            root, "json-response-info")) || {}).textContent || "",
                        actionPath
                    );

                    cb();
                }).catch(cb);
            });

            it("should display the submitted route URL with parameters", (cb) => {
                const requiredParam = _.find(initialAction.params, "required");

                root.setState({
                    params: {
                        includeFields: ["other", "this"],
                        requiredParams: _.zipObject([(requiredParam || {}).name || ""], ["123"]),
                        optionalParams: {abc: 456},
                        extraParams: {test: "hi"},
                        paginateParams: {}
                    }
                });

                testUtils.Simulate.submit(routeEntry);

                // The path should include all the params initialized above.
                const actionPath =
                    util.format(initialAction.path, "123") +
                    "?opt_fields=other,this&abc=456&test=hi";

                rawResponsePromise.then(function () {
                    assert.include(
                        (ReactDOM.findDOMNode(testUtils.findRenderedDOMComponentWithClass(
                            root, "json-response-info")) || {}).textContent || "",
                        actionPath
                    );

                    cb();
                }).catch(cb);
            });

            it("should display the current route method", (cb) => {
                testUtils.Simulate.submit(routeEntry);

                rawResponsePromise.then(function () {
                    assert.include(
                        (ReactDOM.findDOMNode(testUtils.findRenderedDOMComponentWithClass(
                            root, "json-response-info")) || {}).textContent || "",
                        initialAction.method
                    );

                    cb();
                }).catch(cb);
            });

            it("should make a GET request with no parameters", (cb) => {
                testUtils.Simulate.submit(routeEntry);

                rawResponsePromise.then(function () {
                    sinon.assert.calledWith(
                        getStub,
                        ResourcesHelpers.pathForAction(initialAction),
                        {}
                    );

                    assert.equal(
                        (ReactDOM.findDOMNode(testUtils.findRenderedDOMComponentWithClass(
                            root, "json-response-block")) || {}).textContent,
                        jsonResponse);

                    cb();
                }).catch(cb);
            });

            it("should make a GET request with parameters", (cb) => {
                const requiredParam = _.find(initialAction.params, "required");

                root.setState({
                    params: {
                        includeFields: ["other", "this"],
                        requiredParams: _.zipObject([(requiredParam || {}).name || ""], ["123"]),
                        optionalParams: {abc: 456},
                        extraParams: {test: "hi"},
                        paginateParams: {}
                    }
                });

                testUtils.Simulate.submit(routeEntry);

                rawResponsePromise.then(function () {
                    sinon.assert.calledWith(
                        getStub,
                        util.format(initialAction.path, "123"),
                        {
                            opt_fields: "other,this",
                            abc: 456,
                            test: "hi"
                        }
                    );

                    assert.equal(
                        (ReactDOM.findDOMNode(testUtils.findRenderedDOMComponentWithClass(
                            root, "json-response-block")) || {}).textContent,
                        jsonResponse);

                    cb();
                }).catch(cb);
            });

            it("should make the correct request after changing resource", (cb) => {
                const otherResource = Resources.Events;
                const otherAction = otherResource.actions[0];

                // We change the resource, which in-turn will change the route.
                let element = (<HTMLSelectElement>ReactDOM.findDOMNode(selectResource));
                element.value = ResourcesHelpers.resourceNameFromResource(otherResource);
                testUtils.Simulate.change(selectResource);

                // Clicking the link should send request with the correct route.
                testUtils.Simulate.submit(routeEntry);

                rawResponsePromise.then(function () {
                    sinon.assert.calledWith(getStub, otherAction.path);

                    assert.equal(
                        (ReactDOM.findDOMNode(testUtils.findRenderedDOMComponentWithClass(
                            root, "json-response-block")) || {}).textContent,
                        jsonResponse);

                    cb();
                }).catch(cb);
            });

            it("should make the correct request after changing route", (cb) => {
                const otherAction = initialResource.actions[1];

                let element = (<HTMLSelectElement>ReactDOM.findDOMNode(selectRoute));
                element.value = otherAction.name;
                testUtils.Simulate.change(selectRoute);

                // Clicking the link should send request with the correct route.
                testUtils.Simulate.submit(routeEntry);

                rawResponsePromise.then(function () {
                    sinon.assert.calledWith(
                        getStub, ResourcesHelpers.pathForAction(otherAction));

                    assert.equal(
                        (ReactDOM.findDOMNode(testUtils.findRenderedDOMComponentWithClass(
                            root, "json-response-block")) || {}).textContent,
                        jsonResponse);

                    cb();
                }).catch(cb);
            });

        });

        describe("submit state", () => {
            let submitRequest: Element;

            beforeEach(() => {
                submitRequest = testUtils.findRenderedDOMComponentWithClass(
                    root, "submit-request");
            });

            it("should be disabled with unset required param with get request", () => {
                console.log(root.state.action)
                assert.equal((root.state.action || {}).method, "GET");
                assert.propertyVal(((root.state.action || {}).params || [])[0], "required", true);
                assert.isTrue((<HTMLButtonElement>submitRequest).disabled);

                assert.equal(
                    root.userStateStatus(),
                    Explorer.UserStateStatus.ErrorUnsetRequiredParams);
            });

            it("should be enabled with set required param with get request", () => {
                const requiredParam = testUtils.findRenderedDOMComponentWithClass(
                    root, "required-param");

                let element = (<HTMLSelectElement>ReactDOM.findDOMNode(requiredParam));
                element.value = "hi there";
                element.className = Helpers.findReactComponent(requiredParam).props.className;
                testUtils.Simulate.change(requiredParam);
                assert.isFalse(Helpers.findReactComponent(submitRequest).props.disabled);

                assert.equal(
                    root.userStateStatus(),
                    Explorer.UserStateStatus.Okay);
            });

            it("should be disabled with non-get request", () => {
                const deleteAction = initialResource.actions[0];

                let element = (<HTMLSelectElement>ReactDOM.findDOMNode(selectRoute));
                element.value = deleteAction.name;
                testUtils.Simulate.change(selectRoute);

                assert.equal(root.state.action, deleteAction);
                assert.notEqual((root.state.action || {}).method, "GET");
                assert.isTrue(Helpers.findReactComponent(submitRequest).props.disabled);

                assert.equal(
                    root.userStateStatus(),
                    Explorer.UserStateStatus.ErrorUnsupportedMethodType);
            });

            it("should throw when the user submits on disabled state", () => {
                assert.notEqual(
                    root.userStateStatus(),
                    Explorer.UserStateStatus.Okay);

                assert.isTrue((<HTMLButtonElement>submitRequest).disabled);
                assert.throws(root.onSubmitRequest);
            });
        });
    });
});
