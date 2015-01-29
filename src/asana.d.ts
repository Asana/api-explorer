// Type definitions for node-asana
// Project: https://github.com/asana/node-asana/
// Note: These type definitions are incomplete; only used sections of the API will be defined.

declare module Asana {

    //
    // Asana.Client API
    // ----------------------------------------------------------------------
    interface AsanaClient {
        (dispatcher: AsanaDispatcher, options: any): AsanaClient;
        create(options: any): AsanaClient;
        create(): AsanaClient;
    }

    //
    // Asana.Dispatcher API
    // ----------------------------------------------------------------------
    interface AsanaDispatcher {
    }

    //
    // Asana.auth API
    // ----------------------------------------------------------------------
    interface AsanaAuth {
    }

    //
    // Asana.errors API
    // ----------------------------------------------------------------------
    interface AsanaErrors {
    }

    //
    // Asana.resources API
    // ----------------------------------------------------------------------
    interface AsanaResources {
    }

    //
    // Asana Exports
    // ----------------------------------------------------------------------
    interface Exports {
        Client: AsanaClient;
        Dispatcher: AsanaDispatcher;
        auth: AsanaAuth;
        errors: AsanaErrors;
        resources: AsanaResources;
    }
}

declare module "asana" {
    var exports: Asana.Exports;
    export = exports;
}

