/// <reference path="../src/asana.d.ts" />
import Asana = require("asana");
import chai = require("chai");
import chaiAsPromised = require("chai-as-promised");
import sinon = require("sinon");
import Promise = require("bluebird");

import AuthorizedClient = require("../src/authorized_client");
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
            var oauthStub: SinonSpy = sinon.stub(client, "useOauth");

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
        it("should return true with credentials", () => {
            var authorized_client = new AuthorizedClient();
            sinon.stub(authorized_client, "credentials").returns("very real");

            assert.isTrue(authorized_client.isAuthorized());
        });

        it("should return false with no credentials", () => {
            var authorized_client = new AuthorizedClient();
            sinon.stub(authorized_client, "credentials").returns(null);

            assert.isFalse(authorized_client.isAuthorized());
        });
    });

    describe("#authorize", () => {
        var authorized_client: AuthorizedClient;
        var client: Asana.Client;
        var authorizeStub: SinonStub;

        beforeEach(() => {
            authorized_client = new AuthorizedClient();
            client = (<any>authorized_client).client;
            authorizeStub = sinon.stub(client, "authorize");
        });

        it("should pass through authorization to client", () => {
            authorizeStub.returns(Promise.resolve(client));

            assert.becomes(authorized_client.authorize(), client);
            sinon.assert.called(authorizeStub);
        });

        it("should throw if client's authorization is unsuccessful", () => {
            authorizeStub.returns(
                Promise.reject(new Error("Message thrown"))
            );

            assert.isRejected(authorized_client.authorize(), "Message thrown");
            sinon.assert.called(authorizeStub);
        });
    });

    describe("#get", () => {
        var authorized_client: AuthorizedClient;
        var dispatcher: Asana.Dispatcher;
        var getStub: SinonStub;

        beforeEach(() => {
            authorized_client = new AuthorizedClient();
            dispatcher = (<any>authorized_client).client.dispatcher;
            getStub = sinon.stub(dispatcher, "get");
        });

        it("should throw if unauthorized", () => {
            sinon.stub(authorized_client, "isAuthorized").returns(false);

            assert.throw(
                () => authorized_client.get("arg1", "arg2", "arg3"),
                "Client is not authorized to perform a request."
            );
            sinon.assert.notCalled(getStub);
        });

        it("should pass through request to dispatcher if authorized", () => {
            sinon.stub(authorized_client, "isAuthorized").returns(true);

            assert.doesNotThrow(
                () => authorized_client.get("arg1", "arg2", "arg3")
            );
            sinon.assert.calledWith(getStub, "arg1", "arg2", "arg3");
        });
    });
});
