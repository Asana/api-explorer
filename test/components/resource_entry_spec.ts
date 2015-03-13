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

  var initial_resource: Resource;

  var onResourceChangeStub: SinonStub;

  var root: ResourceEntry;
  var selectResource: React.HTMLComponent;

  beforeEach(() => {
    sand = sinon.sandbox.create();

    initial_resource = Resources.Events;

    onResourceChangeStub = sand.stub();

    root = testUtils.renderIntoDocument<ResourceEntry>(
      ResourceEntry.create({
        resource: initial_resource,
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
      ResourcesHelpers.resourceNameFromResource(initial_resource)
    );
  });

  it("should contain dropdown with other resources", () => {
    var children = React.findDOMNode(selectResource).childNodes;
    var resource_names = ResourcesHelpers.names();

    assert.equal(children.length, resource_names.length);
    resource_names.forEach((resource_name, idx) => {
      assert.equal(
        (<HTMLOptionElement>children.item(idx)).value,
        resource_name
      );
    });
  });

  it("should trigger onResourceChange property on resource change", () => {
    var other_resource = Resources.Attachments;

    testUtils.Simulate.change(selectResource, {
      target: { value: other_resource }
    });
    sinon.assert.called(onResourceChangeStub);
  });
});
