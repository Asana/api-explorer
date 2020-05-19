import chai = require("chai");
import React = require("react");
import sinon = require("sinon");
import _ = require("lodash");

import PaginateEntry = require("../../src/components/paginate_entry");
import * as ReactTestUtils from "react-dom/test-utils";
import {SinonFakeServer, SinonStub} from "sinon";

const assert = chai.assert;
const r = React.createElement;
const testUtils = ReactTestUtils;

describe("PaginateEntryComponent", () => {
    let sand: SinonFakeServer;

    let onPaginateChangeStub: SinonStub;

    let root: PaginateEntry;
    let limitInput: Element;
    let offsetInput: Element;

    beforeEach(() => {
        sand = sinon.fakeServer.create();

        onPaginateChangeStub = sinon.stub().returns(_.noop);
    });

    afterEach(() => {
        sand.restore();
    });

    describe("when can paginate", () => {
        beforeEach(() => {
            root = testUtils.renderIntoDocument(
                PaginateEntry.create({
                    canPaginate: true,
                    onPaginateChange: onPaginateChangeStub,
                    paginateParams: {
                        limit: 5,
                        offset: "initial value"
                    },
                    text: r("h3", {}, "this is a test")
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
            assert.equal((<HTMLInputElement>limitInput).value, "5");
            assert.equal((<HTMLInputElement>offsetInput).value, "initial value");
        });

        it("should trigger onChange property for limit/offset fields", () => {
            limitInput.dispatchEvent(new Event("change", {bubbles: true}));
            sinon.assert.calledWith(onPaginateChangeStub, "limit");
            assert(true);

            offsetInput.dispatchEvent(new Event("change", {bubbles: true}));
            sinon.assert.calledWith(onPaginateChangeStub, "offset");
        });
    });

    describe("when cannot paginate", () => {
        beforeEach(() => {
            root = testUtils.renderIntoDocument(
                PaginateEntry.create({
                    canPaginate: false,
                    onPaginateChange: onPaginateChangeStub,
                    paginateParams: {
                        limit: 5,
                        offset: "initial value"
                    },
                    text: r("h3", {}, "this is a test")
                })
            );
        });

        it("should hide pagination input fields", () => {
            const limitInputs = testUtils.scryRenderedDOMComponentsWithClass(
                root,
                "paginate-entry-limit"
            );
            assert.lengthOf(limitInputs, 0);

            const offsetInputs = testUtils.scryRenderedDOMComponentsWithClass(
                root,
                "paginate-entry-offset"
            );
            assert.lengthOf(offsetInputs, 0);
        });
    });
});
