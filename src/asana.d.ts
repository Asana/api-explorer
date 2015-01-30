// Type definitions for node-asana
// Project: https://github.com/asana/node-asana/
// Note: These type definitions are incomplete; only used sections of the API will be defined.

declare module "asana" {

    export class Client {
        constructor(dispatcher: Dispatcher, options?: any);
        static create(options?: any): Client;
        useOauth(options?: any): Client;
        authorize(): Promise<Client>;
        users: resources.Users;
        dispatcher: Dispatcher;
    }

    export class Dispatcher {
        get(path: string, query: any, dispatchOptions: any): Promise<any>;
    }

    export module auth {
        // TODO: Fill in credentials interface.
        export interface Credentials {

        }

        export class PopupFlow {
            constructor(options?: any);
            static runReceiver(): void;
        }
    }

    export module errors {
    }

    export module resources {
        export class Users {
            constructor(dispatcher: Dispatcher);
            me(params?: any): Promise<any>;
        }
    }
}
