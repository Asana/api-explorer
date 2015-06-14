import chai = require("chai");
import React = require("react/addons");
import sinon = require("sinon");
import _ = require("lodash");

import ExtraParameterEntry = require("../../src/components/extra_parameter_entry");

var assert = chai.assert;
var r = React.DOM;
var testUtils = React.addons.TestUtils;

describe("ExtraParameterEntryComponent", () => {
  var sand: SinonSandbox;

  var syncExtraParametersStub: SinonStub;

  var root: ExtraParameterEntry;
  var addExtraParam: React.HTMLComponent;

  beforeEach(() => {
    sand = sinon.sandbox.create();

    syncExtraParametersStub = sand.stub();

    root = testUtils.renderIntoDocument<ExtraParameterEntry>(
      ExtraParameterEntry.create({
        text: r.h3({ }, "this is a test"),
        syncExtraParameters: syncExtraParametersStub
      })
    );
    addExtraParam = testUtils.findRenderedDOMComponentWithClass(
      root,
      "add-extra-param"
    );
  });

  afterEach(() => {
    sand.restore();
  });

  function assertNumberOfExtraParams(n: number) {
    assert.lengthOf(root.state.extraParams, n);

    assert.lengthOf(
      testUtils.scryRenderedDOMComponentsWithClass(root, "extra-param-key"),
      n
    );
    assert.lengthOf(
      testUtils.scryRenderedDOMComponentsWithClass(root, "extra-param-value"),
      n
    );
    assert.lengthOf(
      testUtils.scryRenderedDOMComponentsWithClass(root, "extra-param"),
      n
    );
  }

  it("should initialize with no extra parameter fields", () => {
    assertNumberOfExtraParams(0);
  });

  it("should add a parameter field after clicking link", () => {
    testUtils.Simulate.click(addExtraParam);
    assertNumberOfExtraParams(1);

    testUtils.Simulate.click(addExtraParam);
    assertNumberOfExtraParams(2);
  });

  it("should update state and trigger sync when text is entered", () => {
    // First add a few parameters so we can enter text in those fields.
    testUtils.Simulate.click(addExtraParam);
    testUtils.Simulate.click(addExtraParam);
    testUtils.Simulate.click(addExtraParam);
    var extraParams = testUtils.scryRenderedDOMComponentsWithClass(
      root,
      "extra-param"
    );

    // For each extra parameter, we'll input data and verify it updated.
    extraParams.forEach(extraParam => {
      var keyInput = testUtils.findRenderedDOMComponentWithClass(
        extraParam,
        "extra-param-key"
      );
      var valueInput = testUtils.findRenderedDOMComponentWithClass(
        extraParam,
        "extra-param-value"
      );

      var uniqueKey = _.uniqueId();
      testUtils.Simulate.change(keyInput, {
        target: { value: uniqueKey }
      });
      assert.include(
        root.state.extraParams,
        { key: uniqueKey, value: "" }
      );
      sinon.assert.calledWith(
        syncExtraParametersStub,
        root.state.extraParams);

      var uniqueValue = _.uniqueId();
      testUtils.Simulate.change(valueInput, {
        target: { value: uniqueValue }
      });
      assert.include(
        root.state.extraParams,
        { key: uniqueKey, value: uniqueValue }
      );
      sinon.assert.calledWith(
        syncExtraParametersStub,
        root.state.extraParams);
    });
  });

  it("should remove extra param after clicking link", () => {
    // First add a few parameters so we can enter text in those fields.
    testUtils.Simulate.click(addExtraParam);
    testUtils.Simulate.click(addExtraParam);
    testUtils.Simulate.click(addExtraParam);
    var extraParams = testUtils.scryRenderedDOMComponentsWithClass(
      root,
      "extra-param"
    );

    // Now enter text in parameters to differentiate them.
    extraParams.forEach(extraParam => {
      var keyInput = testUtils.findRenderedDOMComponentWithClass(
        extraParam,
        "extra-param-key"
      );
      var valueInput = testUtils.findRenderedDOMComponentWithClass(
        extraParam,
        "extra-param-value"
      );

      testUtils.Simulate.change(keyInput, {
        target: { value: _.uniqueId() }
      });
      testUtils.Simulate.change(valueInput, {
        target: { value: _.uniqueId() }
      });
    });

    // Now, we can remove each of the fields and verify.
    var extraParamsCopy = _.cloneDeep(root.state.extraParams);
    while (root.state.extraParams.length > 0) {
      var deleteLink = testUtils.findRenderedDOMComponentWithClass(
        extraParams[0],
        "delete-extra-param"
      );
      testUtils.Simulate.click(deleteLink);

      extraParamsCopy.shift();
      assert.deepEqual(root.state.extraParams, extraParamsCopy);
      sinon.assert.calledWith(
        syncExtraParametersStub,
        root.state.extraParams
      );
    }
  });
});
