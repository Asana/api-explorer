/// <reference path="../../src/resources/interfaces.ts" />
import chai = require("chai");
import * as ReactDOM from "react-dom";
import sinon = require("sinon");

import ResourceEntry = require("../../src/components/resource_entry");
import Resources = require("../../src/resources");
import * as ReactTestUtils from "react-dom/test-utils";
import ResourcesHelpers = require("../../src/resources/helpers");
import {SinonFakeServer, SinonStub} from "sinon";

var assert = chai.assert;
var testUtils = ReactTestUtils;

describe("ResourceEntryComponent", () => {
    var sand: SinonFakeServer;

    var initialResource: Resource;

    var onResourceChangeStub: SinonStub;

    var root: ResourceEntry;
    var selectResource: Element;

    beforeEach(() => {
        sand = sinon.fakeServer.create();

        initialResource = Resources.Events;

        onResourceChangeStub = sinon.stub();

        root = testUtils.renderIntoDocument(
            ResourceEntry.create({
                resource: initialResource,
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
            (<HTMLSelectElement>ReactDOM.findDOMNode(selectResource)).value,
            ResourcesHelpers.resourceNameFromResource(initialResource)
        );
    });

    it("should contain dropdown with other resources", () => {
        var children = <NodeListOf<ChildNode>>(ReactDOM.findDOMNode(selectResource) || {}).childNodes;
        var resourceNames = ResourcesHelpers.names();

        assert.equal(children.length, resourceNames.length);
        resourceNames.forEach((resourceName, idx) => {
            assert.equal(
                (<HTMLOptionElement>children.item(idx)).value,
                resourceName
            );
        });
    });

    it("should trigger onResourceChange property on resource change", () => {
        testUtils.Simulate.change(selectResource);
        sinon.assert.called(onResourceChangeStub);
    });
});
