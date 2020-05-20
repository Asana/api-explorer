import chai = require("chai");
import React = require("react");
import sinon = require("sinon");
import _ = require("lodash");

import ExtraParameterEntry = require("../../src/components/extra_parameter_entry");
import * as ReactTestUtils from "react-dom/test-utils";
import {SinonFakeServer, SinonStub} from "sinon";

import Helpers = require("../helpers");

const assert = chai.assert;
const r = React.createElement;
const testUtils = ReactTestUtils;

describe("ExtraParameterEntryComponent", () => {
    let sand: SinonFakeServer;

    let syncExtraParametersStub: SinonStub;

    let root: ExtraParameterEntry;
    let addExtraParam: Element;

    beforeEach(() => {
        sand = sinon.fakeServer.create();

        syncExtraParametersStub = sinon.stub();

        root = testUtils.renderIntoDocument(
            ExtraParameterEntry.create({
                text: r("h3", {}, "this is a test"),
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
        const extraParams = testUtils.scryRenderedDOMComponentsWithClass(
            root,
            "extra-param"
        );


        const extraParamKeys = testUtils.scryRenderedDOMComponentsWithClass(
            root,
            "extra-param-key"
        );

        const extraParamValues = testUtils.scryRenderedDOMComponentsWithClass(
            root,
            "extra-param-value"
        );

        // For each extra parameter, we'll input data and verify it updated.
        extraParamKeys.forEach((keyInput, i) => {

            const uniqueKey = _.uniqueId();
            const input = (<HTMLInputElement>keyInput)
            testUtils.Simulate.change(input, {	
                target: { value: uniqueKey }	
              } as any)

            assert.include(
                root.state.extraParams,
                {key: uniqueKey, value: ""}
            );
            sinon.assert.calledWith(
                syncExtraParametersStub,
                root.state.extraParams);

            const uniqueValue = _.uniqueId();

            testUtils.Simulate.change( extraParamValues[i], {	
                target: { value: uniqueValue }	
              } as any)

            assert.include(
                root.state.extraParams,
                {key: uniqueKey, value: uniqueValue}
            );
            sinon.assert.calledWith(
                syncExtraParametersStub,
                root.state.extraParams);
        })  
    });

    it("should remove extra param after clicking link", () => {
        // First add a few parameters so we can enter text in those fields.
        testUtils.Simulate.click(addExtraParam);
        testUtils.Simulate.click(addExtraParam);
        testUtils.Simulate.click(addExtraParam);
        const extraParams = testUtils.scryRenderedDOMComponentsWithClass(
            root,
            "extra-param"
        );

        const extraParamKeys = testUtils.scryRenderedDOMComponentsWithClass(
            root,
            "extra-param-key"
        );

        const extraParamValues = testUtils.scryRenderedDOMComponentsWithClass(
            root,
            "extra-param-value"
        );

        // Now enter text in parameters to differentiate them.
        extraParamKeys.forEach((keyInput, i) => {
            keyInput.dispatchEvent(new Event("change", {bubbles: true}));
            extraParamValues[i].dispatchEvent(new Event("change", {bubbles: true}));
        })

        // Now, we can remove each of the fields and verify.
        const extraParamsCopy = _.cloneDeep(root.state.extraParams);
        while (root.state.extraParams.length > 0) {
            const deleteLink = testUtils.scryRenderedDOMComponentsWithClass(
                root,
                "delete-extra-param"
            );
            testUtils.Simulate.click(deleteLink[0]);

            extraParamsCopy.shift();
            assert.deepEqual(root.state.extraParams, extraParamsCopy);
            sinon.assert.calledWith(
                syncExtraParametersStub,
                root.state.extraParams
            );
        }
    });
});
