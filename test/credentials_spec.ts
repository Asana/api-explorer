import chai = require("chai");
import sinon = require("sinon");

import Credentials = require("../src/credentials");
import constants = require("../src/constants");
import helpers = require("./helpers");
import {SinonSandbox} from "sinon";

var assert = chai.assert;

var MINUTE_IN_MS = 1000 * 60;

describe("Credentials", () => {
  var sand: SinonSandbox;

  beforeEach(() => {
    sand = sinon.sandbox.create();

    sand.clock = sinon.useFakeTimers();
  });

  afterEach(() => {
    sand.clock.restore();

    sand.restore();
  });

  describe("#authStateFromClient", () => {
    it("should return AuthState.Unauthorized with null credentials", () => {
      var client = helpers.createOauthClient(undefined);
      assert.equal(
        Credentials.authStateFromClient(client),
        Credentials.AuthState.Unauthorized);
    });

    it("should return AuthState.Expired with expired credentials", () => {
      var client = helpers.createOauthClient(
        helpers.createCredentials(Date.now())
      );
      sand.clock.tick(500);
      assert.equal(
        Credentials.authStateFromClient(client),
        Credentials.AuthState.Expired);
    });

    it("should return AuthState.Expired with soon-to-expire credentials", () => {
      var client = helpers.createOauthClient(
        helpers.createCredentials(Date.now() + 2 * MINUTE_IN_MS)
      );

      assert.equal(
        Credentials.authStateFromClient(client),
        Credentials.AuthState.Expired);
    });

    it("should return AuthState.Authorized with long-to-expire credentials", () => {
      var client = helpers.createOauthClient(
        helpers.createCredentials(Date.now() + 20 * MINUTE_IN_MS)
      );

      assert.equal(
        Credentials.authStateFromClient(client),
        Credentials.AuthState.Authorized);
    });
  });

  describe("localStorage", () => {
    var oldStorage: Storage;
    var localStorage: Storage;

    beforeEach(() => {
      // We need to mock localStorage, which is a browser-only api.
      // So we create a fake storage, and then mock methods within it.
      oldStorage = Credentials.localStorage;
      localStorage = helpers.createFakeStorage();
      Credentials.localStorage = localStorage;
    });

    afterEach(() => {
      // We want test isolation, so we restore the original localStorage.
      Credentials.localStorage = oldStorage;
    });

    describe("#getFromLocalStorage", () => {
      it("should return null when localStorage is empty", () => {
        var getItemStub = sand.stub(localStorage, "getItem");
        var parseStub = sand.spy(JSON, "parse");

        getItemStub.returns(null);
        assert.equal(Credentials.getFromLocalStorage(), null);

        sinon.assert.called(getItemStub);
        sinon.assert.calledWith(parseStub, "null");
      });

      it("should fetch result when localStorage is not empty", () => {
        var getItemStub = sand.stub(localStorage, "getItem");
        var parseStub = sand.stub(JSON, "parse");

        getItemStub.returns("hi");
        Credentials.getFromLocalStorage();

        sinon.assert.called(getItemStub);
        sinon.assert.calledWith(parseStub, "hi");
      });
    });

    describe("#storeFromClient", () => {
      it("should throw when no credentials are in the client", () => {
        var client = helpers.createOauthClient(undefined);

        assert.throws(
          () => Credentials.storeFromClient(client),
          "no credentials in the client"
        );
      });

      it("should store credentials from the client", () => {
        var credentials = helpers.createCredentials(Date.now());
        var client = helpers.createOauthClient(credentials);
        var setItemStub = sand.stub(localStorage, "setItem");

        Credentials.storeFromClient(client);

        sinon.assert.calledWithExactly(
          setItemStub,
          constants.LOCALSTORAGE_KEY,
          JSON.stringify(credentials)
        );
      });

      it("should add expiry timestamp to credentials", () => {
        var credentials = helpers.createCredentials(Date.now());
        var client = helpers.createOauthClient(credentials);

        Credentials.storeFromClient(client);

        assert.equal(
          credentials.expiry_timestamp,
          Date.now() + credentials.expires_in * 1000
        );
      });
    });
  });
});
