/// <reference path="../../src/asana_json.d.ts" />
/* tslint:disable:no-unused-variable */
import mock_dom = require("../mock_dom");
/* tslint:enable:no-unused-variable */

import AsanaJson = require("asana-json");
import chai = require("chai");
import react = require("react/addons");
import sinon = require("sinon");
import _ = require("lodash");

import PropertyEntry = require("../../src/components/property_entry");
import helpers = require("../helpers");

var assert = chai.assert;
var testUtils = react.addons.TestUtils;

describe("PropertyEntryComponent", () => {
  var sand: SinonSandbox;

  var properties: AsanaJson.Property[];

  var isPropertyCheckedStub: SinonStub;
  var usePropertyStub: SinonStub;

  var root: PropertyEntry.Component;
  var checkboxes: React.HTMLComponent[];

  beforeEach(() => {
    sand = sinon.sandbox.create();

    properties = helpers.fetchResource(1).properties;

    isPropertyCheckedStub = sand.stub();
    usePropertyStub = sand.stub();

    root = testUtils.renderIntoDocument<PropertyEntry.Component>(
      PropertyEntry.create({
        class_suffix: "test",
        text: "this is a test",
        properties: properties,
        isPropertyChecked: isPropertyCheckedStub,
        useProperty: usePropertyStub
      })
    );
    checkboxes = testUtils.scryRenderedDOMComponentsWithClass(
      root,
      "property-checkbox-test"
    );
  });

  afterEach(() => {
    sand.restore();
  });

  it("should contain a checkbox for each property", () => {
    var property_names = _.pluck(properties, "name");

    assert.equal(checkboxes.length, properties.length);
    checkboxes.forEach(checkbox => {
      assert.include(
        property_names,
        (<HTMLInputElement>checkbox.getDOMNode()).value
      );
    });
  });

  it("should verify checked state for each property", () => {
    properties.forEach(property => {
      sinon.assert.calledWith(usePropertyStub, property.name);
    });
  });

  it("should trigger onChange property on each check action", () => {
    checkboxes.forEach(checkbox => {
      var checkbox_node = <HTMLInputElement>checkbox.getDOMNode();

      testUtils.Simulate.change(checkbox, {
        checked: !checkbox_node.checked
      });
    });
    sinon.assert.callCount(isPropertyCheckedStub, properties.length);
  });
});
