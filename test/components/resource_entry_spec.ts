/// <reference path="../../src/resources/interfaces.ts" />
/* tslint:disable:no-unused-variable */
import mock_dom = require("../mock_dom");
/* tslint:enable:no-unused-variable */

import chai = require("chai");
import react = require("react/addons");
import sinon = require("sinon");

import Resources = require("../../src/resources/index");
import ResourceEntry = require("../../src/components/resource_entry");
import helpers = require("../helpers");

var assert = chai.assert;
var testUtils = react.addons.TestUtils;

describe("ResourceEntryComponent", () => {
  var sand: SinonSandbox;

  var initial_resource: Resource;

  var onResourceChangeStub: SinonStub;

  var root: ResourceEntry.Component;
  var selectResource: React.HTMLComponent;

  beforeEach(() => {
    sand = sinon.sandbox.create();

    initial_resource = helpers.fetchResource(1);

    onResourceChangeStub = sand.stub();

    root = testUtils.renderIntoDocument<ResourceEntry.Component>(
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
      (<HTMLInputElement>selectResource.getDOMNode()).value,
      Resources.Helpers.resourceNameFromResource(initial_resource)
    );
  });

  it("should contain dropdown with other resources", () => {
    var children = selectResource.getDOMNode().childNodes;
    var resource_names = Resources.Helpers.names();

    assert.equal(children.length, resource_names.length);
    resource_names.forEach((resource_name, idx) => {
      assert.equal(
        (<HTMLOptionElement>children.item(idx)).value,
        resource_name
      );
    });
  });

  it("should trigger onResourceChange property on resource change", () => {
    var other_resource = helpers.fetchResource(0);

    testUtils.Simulate.change(selectResource, {
      target: { value: other_resource }
    });
    sinon.assert.called(onResourceChangeStub);
  });
});
