/// <reference path="../../src/asana_json.d.ts" />
/* tslint:disable:no-unused-variable */
import mock_dom = require("../mock_dom");
/* tslint:enable:no-unused-variable */

import AsanaJson = require("asana-json");
import chai = require("chai");
import react = require("react/addons");
import sinon = require("sinon");
import _ = require("lodash");

import ParameterEntry = require("../../src/components/parameter_entry");
import helpers = require("../helpers");

var assert = chai.assert;
var testUtils = react.addons.TestUtils;

describe("ParameterEntryComponent", () => {
  var sand: SinonSandbox;

  var parameters: AsanaJson.Parameter[];

  var onParameterChangeStub: SinonStub;

  var root: ParameterEntry.Component;
  var inputs: React.HTMLComponent[];

  beforeEach(() => {
    sand = sinon.sandbox.create();

    parameters = helpers.fetchResource(1).actions[0].params;

    onParameterChangeStub = sand.stub();

    root = testUtils.renderIntoDocument<ParameterEntry.Component>(
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
      var input_id = (<HTMLInputElement>input.getDOMNode()).id;
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
