/// <reference path="../../src/resources/interfaces.ts" />
import chai = require("chai");
import React = require("react/addons");
import sinon = require("sinon");

import ResourceEntry = require("../../src/components/resource_entry");
import Resources = require("../../src/resources/resources");
import ResourcesHelpers = require("../../src/resources/helpers");

var assert = chai.assert;
var testUtils = React.addons.TestUtils;

describe("ResourceEntryComponent", () => {
  var sand: SinonSandbox;

  var initialResource: Resource;

  var onResourceChangeStub: SinonStub;

  var root: ResourceEntry;
  var selectResource: React.HTMLComponent;

  beforeEach(() => {
    sand = sinon.sandbox.create();

    initialResource = Resources.Events;

    onResourceChangeStub = sand.stub();

    root = testUtils.renderIntoDocument<ResourceEntry>(
      ResourceEntry.create({
        resource: initialResource,
        onResourceChange: onResourceChangeStub
      })
    );
    selectResource = testUtils.findRenderedDOMComponentWithClass(
      root,
      "select-resource"
    );
  });

  afterEach(() => {
    sand.restore();
  });

  it("should select the current resource", () => {
    assert.include(
      React.findDOMNode<HTMLInputElement>(selectResource).value,
      ResourcesHelpers.resourceNameFromResource(initialResource)
    );
  });

  it("should contain dropdown with other resources", () => {
    var children = React.findDOMNode(selectResource).childNodes;
    var resourceNames = ResourcesHelpers.names();

    assert.equal(children.length, resourceNames.length);
    resourceNames.forEach((resource_name, idx) => {
      assert.equal(
        (<HTMLOptionElement>children.item(idx)).value,
        resource_name
      );
    });
  });

  it("should trigger onResourceChange property on resource change", () => {
    var otherResource = Resources.Attachments;

    testUtils.Simulate.change(selectResource, {
      target: { value: otherResource }
    });
    sinon.assert.called(onResourceChangeStub);
  });
});
