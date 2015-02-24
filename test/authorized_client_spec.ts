/// <reference path="../src/asana.d.ts" />
import Asana = require("asana");
import chai = require("chai");
import chaiAsPromised = require("chai-as-promised");
import sinon = require("sinon");
import Promise = require("bluebird");

import AuthorizedClient = require("../src/authorized_client");
import CredentialsManager = require("../src/credentials_manager");
import constants = require("../src/constants");

chai.use(chaiAsPromised);
var assert = chai.assert;

describe("AuthorizedClient", () => {
  var sand: SinonSandbox;

  beforeEach(() => {
    sand = sinon.sandbox.create();
  });

  afterEach(() => {
    sand.restore();
  });

  describe("#new", () => {
    it("should pass through client ID to client", () => {
      var authorizedClient = new AuthorizedClient();
      var client = (<any>authorizedClient).client;

      assert.equal(client.app.clientId, constants.CLIENT_ID);
    });

    it("should pass through redirect URI to app", () => {
      var authorizedClient = new AuthorizedClient();
      var client = (<any>authorizedClient).client;

      assert.equal(client.app.redirectUri, constants.REDIRECT_URI);
    });

    it("should configure an oauth authenticator", () => {
      // Before initializing the AuthorizedClient, we stub useOauth.
      var client = Asana.Client.create({
        clientId: "client_id",
        redirectUri: "redirect_uri"
      });
      var oauthStub: SinonStub = sand.stub(client, "useOauth");

      /* tslint:disable:no-unused-variable */
      var authorizedClient = new AuthorizedClient(client);
      /* tslint:enable:no-unused-variable */

      sinon.assert.calledWithMatch(oauthStub, sinon.match({
          credentials: null,
          flowType: Asana.auth.PopupFlow
        })
      );
    });
  });

  describe("#isAuthorized", () => {
    it("should pass through authorization check to credentials", () => {
      var authorizedClient = new AuthorizedClient();
      var stub = sand.stub(CredentialsManager, "isValidFromClient");

      authorizedClient.isAuthorized();

      sinon.assert.calledWith(stub, (<any>authorizedClient).client);
    });
  });

  describe("#hasPreviouslyAuthorized", () => {
    it("should pass through authorization check to credentials", () => {
      var authorizedClient = new AuthorizedClient();
      var stub = sand.stub(CredentialsManager, "isPossiblyValidFromClient");

      authorizedClient.hasPreviouslyAuthorized();

      sinon.assert.calledWith(stub, (<any>authorizedClient).client);
    });
  });

  describe("#authorizeIfExpired", () => {
    var authorizedClient: AuthorizedClient;
    var client: Asana.Client;
    var authorizeStub: SinonStub;
    var isAuthorizedStub: SinonStub;

    beforeEach(() => {
      authorizedClient = new AuthorizedClient();
      client = (<any>authorizedClient).client;
      authorizeStub = sand.stub(client, "authorize");
      isAuthorizedStub = sand.stub(authorizedClient, "isAuthorized");
    });

    it("should be a no-op if unexpired", () => {
      isAuthorizedStub.returns(true);
      var useOauthStub = sand.stub(client, "useOauth");

      assert.becomes(authorizedClient.authorizeIfExpired(), client);
      sinon.assert.notCalled(useOauthStub);
      sinon.assert.notCalled(authorizeStub);

    });

    it("should pass through authorization to client if expired", () => {
      isAuthorizedStub.returns(false);
      authorizeStub.returns(Promise.resolve(client));

      assert.becomes(authorizedClient.authorizeIfExpired(), client);
      sinon.assert.called(authorizeStub);
    });

    it("should throw if client's authorization is unsuccessful", () => {
      isAuthorizedStub.returns(false);
      authorizeStub.returns(
        Promise.reject(new Error("Message thrown"))
      );

      assert.isRejected(
        authorizedClient.authorizeIfExpired(),
        "Message thrown"
      );
      sinon.assert.called(authorizeStub);
    });
  });

  describe("#get", () => {
    var authorizedClient: AuthorizedClient;
    var client: Asana.Client;
    var authorizeStub: SinonStub;
    var getStub: SinonStub;

    beforeEach(() => {
      authorizedClient = new AuthorizedClient();
      client = (<any>authorizedClient).client;
      authorizeStub = sand.stub(client, "authorize");
      getStub = sand.stub(client.dispatcher, "get").returns("great");
    });

    it("should pass through request to dispatcher if authorized", (cb) => {
      sand.stub(authorizedClient, "isAuthorized").returns(true);

      var promise: Promise<any>;
      assert.doesNotThrow(
        () => promise = authorizedClient.get("arg1", "arg2", "arg3")
      );

      promise.then(function(data) {
        // Make sure we didn't accidentally authorize.
        sinon.assert.notCalled(authorizeStub);

        // Verify we've successfully passed through to the dispatcher.
        sinon.assert.calledWith(getStub, "arg1", "arg2", "arg3");
        assert.equal(data, "great");
        cb();
      }).catch(function(err) {
        cb(err);
      });
    });

    it("should authorize before requesting if unauthorized", (cb) => {
      sand.stub(authorizedClient, "isAuthorized").returns(false);
      authorizeStub.returns(Promise.resolve(client));

      var promise: Promise<any>;
      assert.doesNotThrow(
        () => promise = authorizedClient.get("arg1", "arg2", "arg3")
      );

      promise.then(function(data) {
        // Make sure we didn't accidentally authorize.
        sinon.assert.called(authorizeStub);
        assert(authorizeStub.calledBefore(getStub));

        // Verify we've successfully passed through to the dispatcher.
        sinon.assert.calledWith(getStub, "arg1", "arg2", "arg3");
        assert.equal(data, "great");
        cb();
      }).catch(function(err) {
        cb(err);
      });
    });
  });
});
