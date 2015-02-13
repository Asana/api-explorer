/* tslint:disable:no-unused-variable */
import mock_dom = require("../mock_dom");
/* tslint:enable:no-unused-variable */

import chai = require("chai");
import react = require("react/addons");
import sinon = require("sinon");

import RouteEntry = require("../../src/components/route_entry");

var assert = chai.assert;
var testUtils = react.addons.TestUtils;

describe("RouteEntryComponent", () => {
    var sand: SinonSandbox;

    var root: RouteEntry.Component;
    var inputRoute: React.HTMLComponent;

    var initial_route = "/this/route/";
    var onFormSubmitStub: SinonStub;
    var onRouteChangeStub: SinonStub;

    beforeEach(() => {
        sand = sinon.sandbox.create();

        onFormSubmitStub = sinon.stub();
        onRouteChangeStub = sinon.stub();

        root = testUtils.renderIntoDocument<RouteEntry.Component>(
            RouteEntry.create({
                route: initial_route,
                onFormSubmit: onFormSubmitStub,
                onRouteChange: onRouteChangeStub
            })
        );
        inputRoute = testUtils.findRenderedDOMComponentWithClass(
            root,
            "input-route"
        );
    });

    afterEach(() => {
        sand.restore();
    });

    it("should contain initial route in the input field", () => {
        assert.equal(
            (<HTMLInputElement>inputRoute.getDOMNode()).value,
            initial_route
        );
    });

    it("should trigger onFormSubmit property on submit", () => {
        testUtils.Simulate.submit(root.getDOMNode());
        sinon.assert.called(onFormSubmitStub);
    });

    it("should trigger onRouteChange property on route change", () => {
        testUtils.Simulate.change(inputRoute, {
            target: { value: "/this/other/route" }
        });
        sinon.assert.called(onRouteChangeStub);
    });
});
