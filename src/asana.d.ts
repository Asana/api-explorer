// Type definitions for node-asana
// Project: https://github.com/asana/node-asana/
// Note: These type definitions are incomplete; only used sections of the API will be defined.

declare module Asana {

    // This is an external library, so we can't enforce PascalCased class and interface names.
    /* tslint:disable:class-name */

    //
    // Asana.Client API
    // ----------------------------------------------------------------------
    class Client {
        constructor(dispatcher: Dispatcher, options?: any);
        create(options?: any): Client;
    }

    //
    // Asana.Dispatcher API
    // ----------------------------------------------------------------------
    class Dispatcher {
    }

    //
    // Asana.auth API
    // ----------------------------------------------------------------------
    interface auth {
    }

    //
    // Asana.errors API
    // ----------------------------------------------------------------------
    interface errors {
    }

    //
    // Asana.resources API
    // ----------------------------------------------------------------------
    interface resources {
    }

    //
    // Asana Exports
    // ----------------------------------------------------------------------
    interface Exports {
        Client: Client;
        Dispatcher: Dispatcher;
        auth: auth;
        errors: errors;
        resources: resources;
    }
}

declare module "asana" {
    var exports: Asana.Exports;
    export = exports;
}

