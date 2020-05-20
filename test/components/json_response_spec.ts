import chai = require("chai");
import sinon = require("sinon");

import JsonResponse = require("../../src/components/json_response");
import Resources = require("../../src/resources/resources");
import {SinonSandbox, SinonSpy} from "sinon";
import * as ReactTestUtils from "react-dom/test-utils";
import * as ReactDOM from "react-dom";

const assert = chai.assert;
const testUtils = ReactTestUtils;

describe("JsonResponseComponent", () => {
    let sand: SinonSandbox;

    let root: JsonResponse;
    let responseBlock: Element;
    let stringifySpy: SinonSpy;

    beforeEach(() => {
        sand = sinon.sandbox.create();
        stringifySpy = sand.spy(JSON, "stringify");
    });

    function renderWithProps(props?: JsonResponse.Props) {
        props = props || {
            response: <JsonResponse.ResponseData>{
                action: undefined,
                rawResponse: undefined,
                route: undefined,
                routeUrl: undefined
            }
        };

        root = testUtils.renderIntoDocument(
            JsonResponse.create(props)
        );
        responseBlock = testUtils.findRenderedDOMComponentWithClass(
            root,
            "json-response-block"
        );
    }

    afterEach(() => {
        sand.restore();
    });

    it("should show an empty json response when undefined", () => {
        renderWithProps();

        // We shouldn't stringify an undefined string.
        sinon.assert.notCalled(stringifySpy);

        // Verify the DOM is as expected.
        const node = ReactDOM.findDOMNode(responseBlock);

        if (node !== null) {
            assert.equal(node.nodeName, "PRE");
            assert.equal(node.childNodes.length, 1);
            assert.equal(node.childNodes[0].nodeName, "CODE");
            assert.equal(node.childNodes[0].textContent, "");
        } else {
            assert(false);
        }
    });

    it("should show error json response when response fails", () => {
        const action = Resources.Attachments.actions[0];

        // Set the props to have a non-empty response.
        const rawResponse = {error: {again: 2}};
        renderWithProps({
            response: {
                action: action,
                error: "something",
                rawResponse: rawResponse,
                route: action.path,
                routeUrl: "https://app.asana.com/api/1.0/" + action.path
            }
        });

        // We should stringify a non-empty string.
        sinon.assert.calledWith(stringifySpy, rawResponse);

        // Verify the DOM for the json response block.
        const node = ReactDOM.findDOMNode(responseBlock);
        if (node === null) {
            assert(false);
            return;
        }

        assert.equal(node.nodeName, "PRE");
        assert.equal(node.childNodes.length, 1);
        assert.equal(node.childNodes[0].nodeName, "CODE");
        assert.equal(
            node.childNodes[0].textContent,
            JSON.stringify(rawResponse, undefined, 2)
        );

        // Should contain error class for styling.
        assert.include((node as HTMLElement).className, "json-error");

        // Verify the DOM for the response header info.
        const responseInfo = testUtils.findRenderedDOMComponentWithClass(
            root,
            "json-response-info"
        );
        const textNode = ReactDOM.findDOMNode(responseInfo);

        if (textNode === null) {
            assert(false);
            return;
        }
        const textContent = textNode.textContent;

        if (textContent === null) {
            assert(false);
            return;
        }

        assert.include(textContent, action.method);
        assert.include(textContent, action.path);
    });

    it("should show non-empty json response after updating props", () => {
        const action = Resources.Attachments.actions[0];

        // Set the props to have a non-empty response.
        const rawResponse = {test: {again: 2}};
        renderWithProps({
            response: {
                action: action,
                rawResponse: rawResponse,
                route: action.path,
                routeUrl: "https://app.asana.com/api/1.0/" + action.path
            }
        });

        // We should stringify a non-empty string.
        sinon.assert.calledWith(stringifySpy, rawResponse);

        // Verify the DOM for the json response block.
        const node = ReactDOM.findDOMNode(responseBlock);

        if (node !== null) {
            assert.equal(node.nodeName, "PRE");
            assert.equal(node.childNodes.length, 1);
            assert.equal(node.childNodes[0].nodeName, "CODE");
            assert.equal(
                node.childNodes[0].textContent,
                JSON.stringify(rawResponse, undefined, 2)
            );
        }

        // Verify the DOM for the response header info.
        const responseInfo = testUtils.findRenderedDOMComponentWithClass(
            root,
            "json-response-info"
        );
        let domNode = ReactDOM.findDOMNode(responseInfo);

        if (domNode !== null) {
            let textContent = domNode.textContent;

            if (textContent !== null) {
                assert.include(textContent, action.method);
                assert.include(textContent, action.path);
            }
        }
    });
});
