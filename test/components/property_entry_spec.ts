/// <reference path="../../src/resources/interfaces.ts" />
import chai = require("chai");
import React = require("react/addons");
import sinon = require("sinon");
import _ = require("lodash");

import PropertyEntry = require("../../src/components/property_entry");
import Resources = require("../../src/resources/resources");

var assert = chai.assert;
var r = React.DOM;
var testUtils = React.addons.TestUtils;

describe("PropertyEntryComponent", () => {
  var sand: SinonSandbox;

  var properties: Property[];

  var isPropertyCheckedStub: SinonStub;
  var usePropertyStub: SinonStub;

  var root: PropertyEntry;
  var checkboxes: React.HTMLComponent[];

  beforeEach(() => {
    sand = sinon.sandbox.create();

    properties = Resources.Events.properties;

    isPropertyCheckedStub = sand.stub();
    usePropertyStub = sand.stub();

    root = testUtils.renderIntoDocument<PropertyEntry>(
      PropertyEntry.create({
        class_suffix: "test",
        text: r.h3({ }, "this is a test"),
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
        (React.findDOMNode<HTMLInputElement>(checkbox)).value
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
      var checkbox_node = React.findDOMNode<HTMLInputElement>(checkbox);

      testUtils.Simulate.change(checkbox, {
        checked: !checkbox_node.checked
      });
    });
    sinon.assert.callCount(isPropertyCheckedStub, properties.length);
  });
});
