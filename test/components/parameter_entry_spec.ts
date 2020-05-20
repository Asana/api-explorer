/// <reference path="../../src/resources/interfaces.ts" />
import chai = require("chai");
import React = require("react");
import sinon = require("sinon");
import _ = require("lodash");

import ParameterEntry = require("../../src/components/parameter_entry");
import Resources = require("../../src/resources");
import * as ReactTestUtils from "react-dom/test-utils";
import {SinonFakeServer, SinonStub} from "sinon";

const assert = chai.assert;
const r = React.createElement;
const testUtils = ReactTestUtils;

describe("ParameterEntryComponent", () => {
    let sand: SinonFakeServer;

    let parameters: Parameter[];

    let onParameterChangeStub: SinonStub;

    let root: ParameterEntry;
    let inputs: Element[];

    beforeEach(() => {
        sand = sinon.fakeServer.create();

        parameters = Resources.Events.actions[0].params || [];

        onParameterChangeStub = sinon.stub();

        root = testUtils.renderIntoDocument(
            ParameterEntry.create({
                text: r("h3", {}, "this is a test"),
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
        const parameterNames = _.map(parameters, "name");

        // Filter out the extra-param for this test.
        const parameterInputs = _.filter(
            inputs, input => !_.includes(input.className, "extra-param"));

        parameterInputs.forEach(input => {
            assert.include(
                parameterNames,
                (<HTMLInputElement>input).placeholder
            );
        });
    });

    it("should trigger onChange parameter when text is entered", () => {
        inputs.forEach(input => {
            input.dispatchEvent(new Event("change", {bubbles: true}));
        });

        parameters.forEach(parameter => {
            sinon.assert.calledWith(onParameterChangeStub, parameter);
        });
    });
});
