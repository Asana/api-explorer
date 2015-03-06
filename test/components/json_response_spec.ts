/* tslint:disable:no-unused-variable */
import mock_dom = require("../mock_dom");
/* tslint:enable:no-unused-variable */

import chai = require("chai");
import react = require("react/addons");
import sinon = require("sinon");

import JsonResponse = require("../../src/components/json_response");
import Resources = require("../../src/resources/resources");

var assert = chai.assert;
var testUtils = react.addons.TestUtils;

describe("JsonResponseComponent", () => {
  var sand: SinonSandbox;

  var root: JsonResponse.Component;
  var responseBlock: React.HTMLComponent;
  var stringifySpy: SinonSpy;

  beforeEach(() => {
    sand = sinon.sandbox.create();

    stringifySpy = sand.spy(JSON, "stringify");

    root = testUtils.renderIntoDocument<JsonResponse.Component>(
      JsonResponse.create({ response: undefined })
    );
    responseBlock = testUtils.findRenderedDOMComponentWithClass(
      root,
      "json-response-block"
    );
  });

  afterEach(() => {
    sand.restore();
  });

  it("should show an empty json response when undefined", () => {
    // We shouldn't stringify an undefined string.
    sinon.assert.notCalled(stringifySpy);

    // Verify the DOM is as expected.
    var node = responseBlock.getDOMNode();
    assert.equal(node.nodeName, "PRE");
    assert.equal(node.childNodes.length, 1);
    assert.equal(node.childNodes[0].nodeName, "CODE");
    assert.equal(node.childNodes[0].textContent, "");
  });

  it("should show non-empty json response after updating props", () => {
    var action = Resources.Attachments.actions[0];
    // Update the state to have a non-empty response.
    var json = "{ test: { again: 2 } }";
    testUtils.findRenderedComponentWithType(
      root,
      JsonResponse.create
    ).setProps({ response: { data: json, action: action } });

    // We should stringify a non-empty string.
    sinon.assert.calledWith(stringifySpy, json);

    // Verify the DOM for the json response block.
    var node = responseBlock.getDOMNode();
    assert.equal(node.nodeName, "PRE");
    assert.equal(node.childNodes.length, 1);
    assert.equal(node.childNodes[0].nodeName, "CODE");
    assert.equal(node.childNodes[0].textContent, "\"" + json + "\"");

    // Verify the DOM for the response header info.
    var responseInfo = testUtils.findRenderedDOMComponentWithClass(
      root,
      "json-response-info"
    );
    assert.include(responseInfo.getDOMNode().textContent, action.method);
    assert.include(responseInfo.getDOMNode().textContent, action.path);
  });
});
