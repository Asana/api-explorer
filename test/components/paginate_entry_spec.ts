import chai = require("chai");
import React = require("react/addons");
import sinon = require("sinon");
import _ = require("lodash");

import PaginateEntry = require("../../src/components/paginate_entry");

var assert = chai.assert;
var r = React.DOM;
var testUtils = React.addons.TestUtils;

describe("PaginateEntryComponent", () => {
  var sand: SinonSandbox;

  var onPaginateChangeStub: SinonStub;

  var root: PaginateEntry;
  var limitInput: React.HTMLComponent;
  var offsetInput: React.HTMLComponent;

  beforeEach(() => {
    sand = sinon.sandbox.create();

    onPaginateChangeStub = sand.stub().returns(_.noop);
  });

  afterEach(() => {
    sand.restore();
  });

  describe("when can paginate", () => {
    beforeEach(() => {
      root = testUtils.renderIntoDocument<PaginateEntry>(
        PaginateEntry.create({
          canPaginate: true,
          onPaginateChange: onPaginateChangeStub,
          paginateParams: {
            limit: 5,
            offset: "initial value"
          },
          text: r.h3({ }, "this is a test")
        })
      );
      limitInput = testUtils.findRenderedDOMComponentWithClass(
        root,
        "paginate-entry-limit"
      );
      offsetInput = testUtils.findRenderedDOMComponentWithClass(
        root,
        "paginate-entry-offset"
      );
    });

    it("should set initial values of input fields from state", () => {
      assert.equal(limitInput.props.value, 5);
      assert.equal(offsetInput.props.value, "initial value");
    });

    it("should trigger onChange property for limit/offset fields", () => {
      testUtils.Simulate.change(limitInput, {
        target: {
          value: "1234"
        }
      });
      sinon.assert.calledWith(onPaginateChangeStub, "limit");
      assert(true);

      testUtils.Simulate.change(offsetInput, {
        target: {
          value: "abc123"
        }
      });
      sinon.assert.calledWith(onPaginateChangeStub, "offset");
    });
  });

  describe("when cannot paginate", () => {
    beforeEach(() => {
      root = testUtils.renderIntoDocument<PaginateEntry>(
        PaginateEntry.create({
          canPaginate: false,
          onPaginateChange: onPaginateChangeStub,
          paginateParams: {
            limit: 5,
            offset: "initial value"
          },
          text: r.h3({ }, "this is a test")
        })
      );
    });

    it("should hide pagination input fields", () => {
      var limitInputs = testUtils.scryRenderedDOMComponentsWithClass(
        root,
        "paginate-entry-limit"
      );
      assert.lengthOf(limitInputs, 0);

      var offsetInputs = testUtils.scryRenderedDOMComponentsWithClass(
        root,
        "paginate-entry-offset"
      );
      assert.lengthOf(offsetInputs, 0);
    });
  });
});
