/* tslint:disable:no-unused-variable */
import mock_dom = require("../mock_dom");
/* tslint:enable:no-unused-variable */

import chai = require("chai");
import Promise = require("bluebird");
import react = require("react/addons");
import sinon = require("sinon");

import AuthorizedClient = require("../../src/authorized_client");
import Explorer = require("../../src/components/explorer");
import RouteEntry = require("../../src/components/route_entry");

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
                initial_authorized_client: client
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
                    initial_authorized_client: client
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
        var inputRoute: React.HTMLComponent;
        var routeEntry: RouteEntry.Component;

        var initial_route: string;

        beforeEach(() => {
            isAuthorizedStub.returns(true);

            initial_route = "/this/route";
            root = testUtils.renderIntoDocument<Explorer.Component>(
                Explorer.create({
                    initial_authorized_client: client,
                    initial_route: initial_route
                })
            );
            inputRoute = testUtils.findRenderedDOMComponentWithClass(
                root,
                "input-route"
            );
            routeEntry = <RouteEntry.Component>testUtils
                .findRenderedComponentWithType(root, RouteEntry.create);
        });

        it("should not contain the authorization link", () => {
            assert.equal(testUtils.scryRenderedDOMComponentsWithClass(
                root,
                "authorize-link"
            ).length, 0);
        });

        it("should display the current route URL", () => {
            assert.include(
                (<HTMLInputElement>inputRoute.getDOMNode()).value,
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

        it("should contain an input to change the route", (cb) => {
            var new_route = "/this/other/route";

            // Stub get request to return json.
            var json_promise = Promise.resolve({data: "{ a: 2 }"});
            var getStub = sand.stub(client, "get").returns(json_promise);

            // Clicking the link should send request with the correct route.
            testUtils.Simulate.change(inputRoute, {
                target: { value: new_route }
            });
            testUtils.Simulate.submit(routeEntry.getDOMNode());
            json_promise.then(function () {
                sinon.assert.calledWith(getStub, new_route);

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
