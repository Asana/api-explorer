/// <reference path="../../src/resources/interfaces.ts" />
import chai = require("chai");
import React = require("react/addons");
import sinon = require("sinon");
import _ = require("lodash");

import ParameterEntry = require("../../src/components/parameter_entry");
import Resources = require("../../src/resources/resources");

var assert = chai.assert;
var r = React.DOM;
var testUtils = React.addons.TestUtils;

describe("ParameterEntryComponent", () => {
  var sand: SinonSandbox;

  var parameters: Parameter[];

  var onParameterChangeStub: SinonStub;

  var root: ParameterEntry;
  var inputs: React.HTMLComponent[];

  beforeEach(() => {
    sand = sinon.sandbox.create();

    parameters = Resources.Events.actions[0].params;

    onParameterChangeStub = sand.stub();

    root = testUtils.renderIntoDocument<ParameterEntry>(
      ParameterEntry.create({
        text: r.h3({ }, "this is a test"),
        parameters: parameters,
        onParameterChange: onParameterChangeStub,
        workspace: undefined,
        workspaces: undefined
      })
    );
    inputs = testUtils.scryRenderedDOMComponentsWithClass(
      root,
      "parameter-input"
    );
  });

  afterEach(() => {
    sand.restore();
  });

  it("should contain an input for each parameter", () => {
    var parameterNames = _.pluck(parameters, "name");

    // Filter out the extra-param for this test.
    var parameterInputs = _.filter(
      inputs, input => !_.contains(input.props.className, "extra-param"));

    parameterInputs.forEach(input => {
      assert.include(
        parameterNames,
        input.props.placeholder
      );
    });
  });

  it("should trigger onChange parameter when text is entered", () => {
    inputs.forEach(input => {
      testUtils.Simulate.change(input, {
        value: "hello"
      });
    });

    parameters.forEach(parameter => {
      sinon.assert.calledWith(onParameterChangeStub, parameter);
    });
  });
});
