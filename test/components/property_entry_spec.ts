/// <reference path="../../src/asana_json.d.ts" />
/* tslint:disable:no-unused-variable */
import mock_dom = require("../mock_dom");
/* tslint:enable:no-unused-variable */

import AsanaJson = require("asana-json");
import chai = require("chai");
import react = require("react/addons");
import sinon = require("sinon");

import PropertyEntry = require("../../src/components/property_entry");
import helpers = require("../helpers");

var assert = chai.assert;
var testUtils = react.addons.TestUtils;

describe("PropertyEntryComponent", () => {
  var sand: SinonSandbox;

  var properties: AsanaJson.Property[];
  var unique_id: string;

  var isPropertyCheckedStub: SinonStub;
  var usePropertyStub: SinonStub;

  var root: PropertyEntry.Component;
  var checkboxesSpan: React.HTMLComponent;

  function findCheckboxForProperty(property: AsanaJson.Property): HTMLInputElement {
    return <HTMLInputElement>testUtils.findRenderedDOMComponentWithClass(
      checkboxesSpan,
      unique_id + "-checkbox-" + property.name
    ).getDOMNode();
  }

  beforeEach(() => {
    sand = sinon.sandbox.create();

    properties = helpers.fetchResource(1).properties;

    isPropertyCheckedStub = sand.stub();
    usePropertyStub = sand.stub();

    root = testUtils.renderIntoDocument<PropertyEntry.Component>(
      PropertyEntry.create({
        text: "this is a test",
        properties: properties,
        isPropertyChecked: isPropertyCheckedStub,
        useProperty: usePropertyStub
      })
    );
    unique_id = root.unique_id;
    checkboxesSpan = testUtils.findRenderedDOMComponentWithClass(
      root,
      unique_id + "-checkboxes"
    );
  });

  afterEach(() => {
    sand.restore();
  });

  it("should contain a checkbox for each property", () => {
    var children = checkboxesSpan.getDOMNode().childNodes;

    assert.equal(children.length, properties.length);
    properties.forEach(property => {
      assert.equal(findCheckboxForProperty(property).value, property.name);
    });
  });

  it("should verify checked state for each property", () => {
    properties.forEach(property => {
      sinon.assert.calledWith(usePropertyStub, property.name);
    });
  });

  it("should trigger onChange property on check action", () => {
    var checkbox = findCheckboxForProperty(properties[0]);

    testUtils.Simulate.change(checkbox, {
      checked: !checkbox.checked
    });
    sinon.assert.called(isPropertyCheckedStub);
  });
});
