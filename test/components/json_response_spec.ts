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

  function renderWithProps(props: JsonResponse.Props) {
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
    renderWithProps({ response: undefined });

    // We shouldn't stringify an undefined string.
    sinon.assert.notCalled(stringifySpy);

    // Verify the DOM is as expected.
    var node = React.findDOMNode(responseBlock);
    assert.equal(node.nodeName, "PRE");
    assert.equal(node.childNodes.length, 1);
    assert.equal(node.childNodes[0].nodeName, "CODE");
    assert.equal(node.childNodes[0].textContent, "");
  });

  it("should show non-empty json response after updating props", () => {
    var action = Resources.Attachments.actions[0];
    // Set the props to have a non-empty response.
    var json = "{ test: { again: 2 } }";
    renderWithProps({ response: { data: json, action: action } });

    // We should stringify a non-empty string.
    sinon.assert.calledWith(stringifySpy, json);

    // Verify the DOM for the json response block.
    var node = React.findDOMNode(responseBlock);
    assert.equal(node.nodeName, "PRE");
    assert.equal(node.childNodes.length, 1);
    assert.equal(node.childNodes[0].nodeName, "CODE");
    assert.equal(node.childNodes[0].textContent, "\"" + json + "\"");

    // Verify the DOM for the response header info.
    var responseInfo = testUtils.findRenderedDOMComponentWithClass(
      root,
      "json-response-info"
    );
    assert.include(React.findDOMNode(responseInfo).textContent, action.method);
    assert.include(React.findDOMNode(responseInfo).textContent, action.path);
  });
});
