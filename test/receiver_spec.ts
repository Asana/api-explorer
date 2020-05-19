/// <reference path="../src/asana.d.ts" />
import Asana = require("asana");
import sinon = require("sinon");

import Receiver = require("../src/receiver");
import {SinonFakeServer} from "sinon";

describe("Receiver", () => {
  var sand: SinonFakeServer;

  beforeEach(() => {
    sand = sinon.fakeServer.create();
  });

  afterEach(() => {
    sand.restore();
  });

  describe("#run", () => {
    it("should pass through call to the client's runReceiver", () => {
      var receiverStub = sinon.stub(Asana.auth.PopupFlow, "runReceiver");

      Receiver.run();
      sinon.assert.called(receiverStub);
    });
  });
});
