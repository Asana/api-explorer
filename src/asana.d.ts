// Type definitions for node-asana
// Project: https://github.com/asana/node-asana/
// Note: These type definitions are incomplete; only used sections of the API will be defined.

declare module "asana" {

    export class Client {
        constructor(dispatcher: Dispatcher, options?: any);
        static create(options?: any): Client;
    }

    export class Dispatcher {
    }

    export module auth {
        export class PopupFlow {
            constructor(options?: any);
            static runReceiver(): void;
        }
    }

    export module errors {
    }

    export module resources {
    }
}
