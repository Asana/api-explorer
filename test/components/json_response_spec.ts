/* tslint:disable:no-unused-variable */
import mock_dom = require("../mock_dom");
/* tslint:enable:no-unused-variable */

import chai = require("chai");
import react = require("react/addons");
import sinon = require("sinon");

import JsonResponse = require("../../src/components/json_response");

var assert = chai.assert;
var testUtils = react.addons.TestUtils;

describe("ExplorerComponent", () => {
    var sand: SinonSandbox;

    var root: JsonResponse.Component;
    var node: Node;
    var children: NodeList;
    var stringifySpy: SinonSpy;

    beforeEach(() => {
        sand = sinon.sandbox.create();

        stringifySpy = sand.spy(JSON, "stringify");

        root = testUtils.renderIntoDocument<JsonResponse.Component>(
            JsonResponse.create({ response: undefined })
        );
        node = root.getDOMNode();
        children = node.childNodes;

    });

    afterEach(() => {
        sand.restore();
    });

    it("should show an empty json response when undefined", () => {
        // We shouldn't stringify an undefined string.
        sinon.assert.notCalled(stringifySpy);

        // Verify the DOM is as expected.
        assert.equal(node.nodeName, "PRE");
        assert.equal(children.length, 1);
        assert.equal(children[0].nodeName, "CODE");
        assert.equal(children[0].textContent, "");
    });

    it("should show non-empty json response after updating props", () => {
        // Update the state to have a non-empty response.
        var json = "{ test: { again: 2 } }";
        testUtils.findRenderedComponentWithType(
            root,
            JsonResponse.create
        ).setProps({ response: { data: json } });

        // We should stringify a non-empty string.
        sinon.assert.calledWith(stringifySpy, json);

        // Verify the DOM updated as expected.
        assert.equal(node.nodeName, "PRE");
        assert.equal(children.length, 1);
        assert.equal(children[0].nodeName, "CODE");
        assert.equal(children[0].textContent, "\"" + json + "\"");
    });
});
