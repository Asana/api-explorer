/// <reference path="../src/asana.d.ts" />
import Asana = require("asana");
import sinon = require("sinon");

import Receiver = require("../src/receiver");
import {SinonSandbox} from "sinon";

describe("Receiver", () => {
  var sand: SinonSandbox;

  beforeEach(() => {
    sand = sinon.sandbox.create();
  });

  afterEach(() => {
    sand.restore();
  });

  describe("#run", () => {
    it("should pass through call to the client's runReceiver", () => {
      var receiverStub = sand.stub(Asana.auth.PopupFlow, "runReceiver");

      Receiver.run();
      sinon.assert.called(receiverStub);
    });
  });
});
