/// <reference path="../../src/resources/interfaces.ts" />
import chai = require("chai");
import React = require("react/addons");
import sinon = require("sinon");
import _ = require("lodash");

import ParameterEntry = require("../../src/components/parameter_entry");
import Resources = require("../../src/resources/resources");

var assert = chai.assert;
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
        text: "this is a test",
        parameters: parameters,
        onParameterChange: onParameterChangeStub
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
    var parameter_names = _.pluck(parameters, "name");

    assert.equal(inputs.length, parameters.length);
    inputs.forEach(input => {
      assert.include(
        parameter_names,
        input.props.children
      );
    });
  });

  it("should contain the parameter name in each input id", () => {
    var parameter_names = _.pluck(parameters, "name");

    assert.equal(inputs.length, parameters.length);
    inputs.forEach(input => {
      var input_id = (React.findDOMNode<HTMLInputElement>(input)).id;
      assert.include(
        parameter_names,
        ParameterEntry.parameterFromInputId(input_id)
      );
    });
  });

  it("should trigger onChange parameter when text is entered", () => {
    inputs.forEach(input => {
      testUtils.Simulate.change(input, {
        value: "hello"
      });
    });
    sinon.assert.callCount(onParameterChangeStub, parameters.length);
  });
});
