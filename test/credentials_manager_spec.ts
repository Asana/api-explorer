import chai = require("chai");
import sinon = require("sinon");

import CredentialsManager = require("../src/credentials_manager");
import constants = require("../src/constants");
import helpers = require("./helpers");

var assert = chai.assert;

var MINUTE_IN_MS = 1000 * 60;

describe("CredentialsManager", () => {
    var sand: SinonSandbox;

    beforeEach(() => {
        sand = sinon.sandbox.create();
    });

    afterEach(() => {
        sand.restore();
    });

    describe("#isValidFromClient", () => {
        beforeEach(() => {
            this.clock = sinon.useFakeTimers();
        });

        afterEach(() => {
            this.clock.restore();
        });

        it("should fail with null credentials", () => {
            var client = helpers.createOauthClient(null);
            assert.isFalse(CredentialsManager.isValidFromClient(client));
        });

        it("should fail with expired credentials", () => {
            var client = helpers.createOauthClient(
                helpers.createCredentials(Date.now())
            );
            this.clock.tick(500);
            assert.isFalse(CredentialsManager.isValidFromClient(client));
        });

        it("should fail with soon-to-expire credentials", () => {
            var client = helpers.createOauthClient(
                helpers.createCredentials(Date.now() + 2 * MINUTE_IN_MS)
            );

            assert.isFalse(CredentialsManager.isValidFromClient(client));
        });

        it("should succeed with long-to-expire credentials", () => {
            var client = helpers.createOauthClient(
                helpers.createCredentials(Date.now() + 20 * MINUTE_IN_MS)
            );

            assert.isTrue(CredentialsManager.isValidFromClient(client));
        });
    });

    describe("localStorage", () => {
        var oldStorage: Storage;
        var localStorage: Storage;

        beforeEach(() => {
            // We need to mock localStorage, which is a browser-only api.
            // So we create a fake storage, and then mock methods within it.
            oldStorage = CredentialsManager.localStorage;
            localStorage = helpers.createFakeStorage();
            CredentialsManager.localStorage = localStorage;
        });

        afterEach(() => {
            // We want test isolation, so we restore the original localStorage.
            CredentialsManager.localStorage = oldStorage;
        });

        describe("#getFromLocalStorage", () => {
            it("should return null when localStorage is empty", () => {
                var getItemStub = sand.stub(localStorage, "getItem");
                var parseStub = sand.spy(JSON, "parse");

                getItemStub.returns(null);
                assert.equal(CredentialsManager.getFromLocalStorage(), null);

                sinon.assert.called(getItemStub);
                sinon.assert.calledWith(parseStub, null);
            });

            it("should fetch result when localStorage is not empty", () => {
                var getItemStub = sand.stub(localStorage, "getItem");
                var parseStub = sand.stub(JSON, "parse");

                getItemStub.returns("hi");
                CredentialsManager.getFromLocalStorage();

                sinon.assert.called(getItemStub);
                sinon.assert.calledWith(parseStub, "hi");
            });
        });

        describe("#storeFromClient", () => {
            it("should throw when no credentials are in the client", () => {
                var client = helpers.createOauthClient(null);

                assert.throws(
                    () => CredentialsManager.storeFromClient(client),
                    "no credentials in the client"
                );
            });

            it("should store credentials from the client", () => {
                var credentials = helpers.createCredentials(Date.now());
                var client = helpers.createOauthClient(credentials);
                var setItemStub = sand.stub(localStorage, "setItem");

                CredentialsManager.storeFromClient(client);

                sinon.assert.calledWithExactly(
                    setItemStub,
                    constants.LOCALSTORAGE_KEY,
                    JSON.stringify(credentials)
                );
            });

            it("should add expiry timestamp to credentials", () => {
                var credentials = helpers.createCredentials(Date.now());
                var client = helpers.createOauthClient(credentials);

                CredentialsManager.storeFromClient(client);

                assert.equal(
                    credentials.expiry_timestamp,
                    Date.now() + credentials.expires_in * 1000
                );
            });
        });
    });
});

