import chai = require("chai");
import React = require("react/addons");
import sinon = require("sinon");

import JsonResponse = require("../../src/components/json_response");
import Resources = require("../../src/resources/resources");

var assert = chai.assert;
var testUtils = React.addons.TestUtils;

describe("JsonResponseComponent", () => {
  var sand: SinonSandbox;

  var root: JsonResponse;
  var responseBlock: React.HTMLComponent;
  var stringifySpy: SinonSpy;

  beforeEach(() => {
    sand = sinon.sandbox.create();
    stringifySpy = sand.spy(JSON, "stringify");
  });

  function renderWithProps(props?: JsonResponse.Props) {
    props = props || {
      response: <JsonResponse.ResponseData>{
        action: undefined,
        raw_response: undefined,
        route: undefined,
        route_url: undefined
      }
    };

    root = testUtils.renderIntoDocument<JsonResponse>(
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
    var node = React.findDOMNode(responseBlock);
    assert.equal(node.nodeName, "PRE");
    assert.equal(node.childNodes.length, 1);
    assert.equal(node.childNodes[0].nodeName, "CODE");
    assert.equal(node.childNodes[0].textContent, "");
  });

  it("should show error json response when response fails", () => {
    var action = Resources.Attachments.actions[0];

    // Set the props to have a non-empty response.
    var raw_response = { error: { again: 2 } };
    renderWithProps({
        response: {
          action: action,
          error: "something",
          raw_response: raw_response,
          route: action.path,
          route_url: "https://app.asana.com/api/1.0/" + action.path
        }
      });

    // We should stringify a non-empty string.
    sinon.assert.calledWith(stringifySpy, raw_response);

    // Verify the DOM for the json response block.
    var node = React.findDOMNode<HTMLElement>(responseBlock);
    assert.equal(node.nodeName, "PRE");
    assert.equal(node.childNodes.length, 1);
    assert.equal(node.childNodes[0].nodeName, "CODE");
    assert.equal(
      node.childNodes[0].textContent,
      JSON.stringify(raw_response, undefined, 2)
    );

    // Should contain error class for styling.
    assert.include(node.className, "json-error");

    // Verify the DOM for the response header info.
    var responseInfo = testUtils.findRenderedDOMComponentWithClass(
      root,
      "json-response-info"
    );
    var text_content = React.findDOMNode(responseInfo).textContent;
    assert.include(text_content, action.method);
    assert.include(text_content, action.path);
  });

  it("should show non-empty json response after updating props", () => {
    var action = Resources.Attachments.actions[0];

    // Set the props to have a non-empty response.
    var raw_response = { test: { again: 2 } };
    renderWithProps({
      response: {
        action: action,
        params: { },
        raw_response: raw_response,
        route: action.path,
        route_url: "https://app.asana.com/api/1.0/" + action.path
      }
    });

    // We should stringify a non-empty string.
    sinon.assert.calledWith(stringifySpy, raw_response);

    // Verify the DOM for the json response block.
    var node = React.findDOMNode(responseBlock);
    assert.equal(node.nodeName, "PRE");
    assert.equal(node.childNodes.length, 1);
    assert.equal(node.childNodes[0].nodeName, "CODE");
    assert.equal(
      node.childNodes[0].textContent,
      JSON.stringify(raw_response, undefined, 2)
    );

    // Verify the DOM for the response header info.
    var responseInfo = testUtils.findRenderedDOMComponentWithClass(
      root,
      "json-response-info"
    );
    assert.include(React.findDOMNode(responseInfo).textContent, action.method);
    assert.include(React.findDOMNode(responseInfo).textContent, action.path);
  });
});
