/// <reference path="../src/asana.d.ts" />
import Asana = require("asana");
import sinon = require("sinon");

import Receiver = require("../src/receiver");

describe("Receiver", () => {
    describe("#run", () => {
        it("should pass through call to the client's runReceiver", () => {
            var receiverStub = sinon.stub(Asana.auth.PopupFlow, "runReceiver");

            Receiver.run();
            sinon.assert.called(receiverStub);
        });
    });
});
