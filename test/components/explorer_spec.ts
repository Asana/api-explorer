/* tslint:disable:no-unused-variable */
import mock_dom = require("../mock_dom");
/* tslint:enable:no-unused-variable */

import chai = require("chai");
import Promise = require("bluebird");
import react = require("react/addons");
import sinon = require("sinon");

import AuthorizedClient = require("../../src/authorized_client");
import Explorer = require("../../src/components/explorer");

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
        var node: Node;
        var children: NodeList;

        beforeEach(() => {
            isAuthorizedStub.returns(true);

            root = testUtils.renderIntoDocument<Explorer.Component>(
                Explorer.create({
                    initial_authorized_client: client
                })
            );
            node = root.getDOMNode();
            children = node.childNodes;
        });

        it("should not contain the authorization link", () => {
            assert.equal(testUtils.scryRenderedDOMComponentsWithClass(
                root,
                "authorize-link"
            ).length, 0);
        });

        it("should display the current route URL", () => {
            var explorer = testUtils.findRenderedDOMComponentWithClass(
                root,
                "api-explorer"
            );

            assert.include(explorer.getDOMNode().textContent, "/users/me");
        });

        it("should contain a link to make a request", (cb) => {
           var link = testUtils.findRenderedDOMComponentWithClass(
               root,
               "send-request"
           );

            // Stub get request to return json.
            var json_promise = Promise.resolve({ data: "{ a: 2 }" });
            var getStub = sand.stub(client, "get").returns(json_promise);

            // Clicking the link should send request.
            testUtils.Simulate.click(link.getDOMNode());
            json_promise.then(function () {
                sinon.assert.called(getStub);

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
