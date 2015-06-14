// Type definitions for node-asana
// Project: https://github.com/asana/node-asana/
// Note: These type definitions are incomplete; only used sections of the API will be defined.
/* tslint:disable variable-name */

declare module "asana" {

  export class Client {
    constructor(dispatcher: Dispatcher, options?: any);
    dispatcher: Dispatcher;
    workspaces: resources.Workspaces;
    static create(options?: any): Client;
    useOauth(options?: any): Client;
    authorize(): Promise<Client>;
  }

  export class Dispatcher {
    authenticator: auth.Authenticator;
    get(path: string, query: any, dispatchOptions: any): Promise<any>;
    handleUnauthorized(): Promise<any>;
    url(path: string): string;
  }

  export module auth {
    interface Credentials {
      access_token: string;
      expires_in: number;
      expiry_timestamp?: number;
    }

    class Authenticator {
    }

    class OauthAuthenticator extends Authenticator {
      credentials: Credentials;
    }

    class PopupFlow {
      constructor(options?: any);
      static runReceiver(): void;
    }
  }

  export module errors {
  }

  export module resources {
    interface Resources<T> {
      data: T[];
    }
    interface Workspace {
      id: number;
      name: string;
    }

    class Workspaces {
      findAll(): Promise<Resources<Workspace>>;
    }
  }
}
