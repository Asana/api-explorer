// Type definitions for node-asana
// Project: https://github.com/asana/node-asana/
// Note: These type definitions are incomplete; only used sections of the API will be defined.

interface Asana {
    Client: Asana.Client;
    Dispatcher: Asana.Dispatcher;
    auth: Asana.Auth;
    errors: Asana.Errors;
    resources: Asana.Resources;
}

declare module Asana {
    interface Client {
        (dispatcher: Asana.Dispatcher, options: any): Asana.Client;
        create(options: any): Asana.Client;
        create(): Asana.Client;
    }
    interface Dispatcher {
    }
    interface Auth {
    }
    interface Errors {
    }
    interface Resources {
    }
}

declare var asana: Asana;

declare module "asana" {
    export = asana;
}

