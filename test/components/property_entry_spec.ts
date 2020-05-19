/// <reference path="../../src/resources/interfaces.ts" />
import chai = require("chai");
import React = require("react");
import sinon = require("sinon");
import _ = require("lodash");
import * as ReactDOM from "react-dom";

import PropertyEntry = require("../../src/components/property_entry");
import Resources = require("../../src/resources");
import * as ReactTestUtils from "react-dom/test-utils";
import {SinonFakeServer, SinonStub} from "sinon";

const assert = chai.assert;
const r = React.createElement;
const testUtils = ReactTestUtils;

describe("PropertyEntryComponent", () => {
    let sand: SinonFakeServer;

    let properties: Property[];

    let isPropertyCheckedStub: SinonStub;
    let usePropertyStub: SinonStub;

    let root: PropertyEntry;
    let checkboxes: Element[];

    beforeEach(() => {
        sand = sinon.fakeServer.create();

        properties = Resources.Events.properties;

        isPropertyCheckedStub = sinon.stub();
        usePropertyStub = sinon.stub();

        root = testUtils.renderIntoDocument(
            PropertyEntry.create({
                classSuffix: "test",
                text: r("h3", {}, "this is a test"),
                properties: properties,
                isPropertyChecked: isPropertyCheckedStub,
                useProperty: usePropertyStub
            })
        );
        checkboxes = testUtils.scryRenderedDOMComponentsWithClass(
            root,
            "property-checkbox-test"
        );
    });

    afterEach(() => {
        sand.restore();
    });

    it("should contain a checkbox for each property", () => {
        const propertyNames = _.map(properties, "name");

        assert.equal(checkboxes.length, properties.length);
        checkboxes.forEach(checkbox => {
            assert.include(
                propertyNames,
                (<HTMLInputElement>(ReactDOM.findDOMNode(checkbox))).value
            );
        });
    });

    it("should verify checked state for each property", () => {
        properties.forEach(property => {
            sinon.assert.calledWith(usePropertyStub, property.name);
        });
    });

    it("should trigger onChange property on each check action", () => {
        checkboxes.forEach(checkbox => {
            const checkboxNode = <HTMLInputElement>ReactDOM.findDOMNode(checkbox);
            testUtils.Simulate.change(checkboxNode);
        });
        sinon.assert.callCount(isPropertyCheckedStub, properties.length);
    });
});
