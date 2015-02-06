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
    describe("#new", () => {
        it("should pass through client ID to client", () => {
            var authorized_client = new AuthorizedClient();
            var client = (<any>authorized_client).client;

            assert.equal(client.app.clientId, constants.CLIENT_ID);
        });

        it("should pass through redirect URI to app", () => {
            var authorized_client = new AuthorizedClient();
            var client = (<any>authorized_client).client;

            assert.equal(client.app.redirectUri, constants.REDIRECT_URI);
        });

        it("should configure an oauth authenticator", () => {
            // Before initializing the AuthorizedClient, we stub useOauth.
            var client = Asana.Client.create({
                clientId: "client_id",
                redirectUri: "redirect_uri"
            });
            var oauthStub: SinonStub = sinon.stub(client, "useOauth");

            /* tslint:disable:no-unused-variable */
            var authorized_client = new AuthorizedClient(client);
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
            var authorized_client = new AuthorizedClient();
            var stub = sinon.stub(CredentialsManager, "isValidFromClient");

            authorized_client.isAuthorized();

            sinon.assert.calledWith(stub, (<any>authorized_client).client);
        });
    });

    describe("#authorizeIfExpired", () => {
        var authorized_client: AuthorizedClient;
        var client: Asana.Client;
        var authorizeStub: SinonStub;
        var isAuthorizedStub: SinonStub;

        beforeEach(() => {
            authorized_client = new AuthorizedClient();
            client = (<any>authorized_client).client;
            authorizeStub = sinon.stub(client, "authorize");
            isAuthorizedStub = sinon.stub(authorized_client, "isAuthorized");
        });

        it("should be a no-op if unexpired", () => {
            isAuthorizedStub.returns(true);
            var useOauthStub = sinon.stub(client, "useOauth");

            assert.becomes(authorized_client.authorizeIfExpired(), client);
            sinon.assert.notCalled(useOauthStub);
            sinon.assert.notCalled(authorizeStub);

        });

        it("should pass through authorization to client if expired", () => {
            isAuthorizedStub.returns(false);
            authorizeStub.returns(Promise.resolve(client));

            assert.becomes(authorized_client.authorizeIfExpired(), client);
            sinon.assert.called(authorizeStub);
        });

        it("should throw if client's authorization is unsuccessful", () => {
            isAuthorizedStub.returns(false);
            authorizeStub.returns(
                Promise.reject(new Error("Message thrown"))
            );

            assert.isRejected(authorized_client.authorizeIfExpired(), "Message thrown");
            sinon.assert.called(authorizeStub);
        });
    });

    describe("#get", () => {
        var authorized_client: AuthorizedClient;
        var client: Asana.Client;
        var authorizeStub: SinonStub;
        var getStub: SinonStub;

        beforeEach(() => {
            authorized_client = new AuthorizedClient();
            client = (<any>authorized_client).client;
            authorizeStub = sinon.stub(client, "authorize");
            getStub = sinon.stub(client.dispatcher, "get").returns("great");
        });

        it("should pass through request to dispatcher if authorized", (done) => {
            sinon.stub(authorized_client, "isAuthorized").returns(true);

            var promise: Promise<any>;
            assert.doesNotThrow(
                () => promise = authorized_client.get("arg1", "arg2", "arg3")
            );

            promise.then(function(data) {
                // Make sure we didn't accidentally authorize.
                sinon.assert.notCalled(authorizeStub);

                // Verify we've successfully passed through to the dispatcher.
                sinon.assert.calledWith(getStub, "arg1", "arg2", "arg3");
                assert.equal(data, "great");
                done();
            }).catch(function(err) {
                done(err);
            });
        });

        it("should authorize before requesting if unauthorized", (done) => {
            sinon.stub(authorized_client, "isAuthorized").returns(false);
            authorizeStub.returns(Promise.resolve(client));

            var promise: Promise<any>;
            assert.doesNotThrow(
                () => promise = authorized_client.get("arg1", "arg2", "arg3")
            );

            promise.then(function(data) {
                // Make sure we didn't accidentally authorize.
                sinon.assert.called(authorizeStub);
                assert(authorizeStub.calledBefore(getStub));

                // Verify we've successfully passed through to the dispatcher.
                sinon.assert.calledWith(getStub, "arg1", "arg2", "arg3");
                assert.equal(data, "great");
                done();
            }).catch(function(err) {
                done(err);
            });
        });
    });
});
