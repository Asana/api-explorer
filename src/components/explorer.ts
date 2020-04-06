/// <reference path="../asana.d.ts" />
/// <reference path="../resources/interfaces.ts" />
import Asana = require("asana");
import * as React from "react";
import url = require("url");
import _ = require("lodash");

import constants = require("../constants");
import Credentials = require("../credentials");
import ExtraParameterEntry = require("./extra_parameter_entry");
import JsonResponse = require("./json_response");
import PaginateEntry = require("./paginate_entry");
import ParameterEntry = require("./parameter_entry");
import PropertyEntry = require("./property_entry");
import ResourceEntry = require("./resource_entry");
import Resources = require("../resources");
import RouteEntry = require("./route_entry");
import update from "immutability-helper";

import ResourcesHelpers = require("../resources/helpers");

const r = React.createElement;

/**
 * If a client exists in props, use it. Otherwise, make a new one.
 * Fetch OAuth information from localStorage, and put in the client.
 *
 * @returns {Asana.Client}
 */
function initializeClient(initialClient?: Asana.Client): Asana.Client {
    const client = initialClient || Asana.Client.create({
        clientId: constants.CLIENT_ID,
        redirectUri: constants.REDIRECT_URI
    });
    client.useOauth({
        credentials: Credentials.getFromLocalStorage(),
        flowType: Asana.auth.PopupFlow
    });

    return client;
}

function _isWorkspaceParameter(parameter: Parameter): boolean {
    return parameter.name === "workspace" || parameter.name === "organization";
}

/**
 * The main API Explorer component.
 */
class Explorer extends React.Component<Explorer.Props, Explorer.State> {
    static create = React.createFactory(Explorer);

    constructor(props: Explorer.Props, context: any) {
        super(props, context);

        // Fetch the resource JSON given in the props, if any.
        const resource =
            ResourcesHelpers.resourceFromResourceName(
                this.props.initialResourceString || "") ||
            Resources.Users;

        // If the initial route is valid, use it. Otherwise, use a valid one.
        const action =
            ResourcesHelpers.actionFromResourcePath(
                resource, this.props.initialRoute || "") ||
            ResourcesHelpers.defaultActionFromResource(resource);

        const client = initializeClient(this.props.initialClient);

        this.state = {
            action: action,
            authState: Credentials.authStateFromClient(client),
            client: client,
            params: Explorer.emptyParams(),
            resource: resource,
            response: <JsonResponse.ResponseData>{
                action: undefined,
                route: undefined,
                routeUrl: undefined,
                rawResponse: undefined
            }
        };

        // In order to prevent blocked popups, we override the unauthorized trigger.
        client.dispatcher.handleUnauthorized = (): Promise<any> => {
            // @ts-ignore
            this.state.authState = Credentials.AuthState.Expired;

            // This isn't an authorization, so return accordingly.
            return Promise.resolve(false);
        };

        // These tasks require authentication, which will update state on failure.
        if (this.state.authState === Credentials.AuthState.Authorized) {
            this.fetchAndStoreWorkspaces();
        }
    }

    /**
     * Authorize the client, if it has expired, and force a re-rendering.
     */
    authorize = (): void => {
        if (this.state.client === undefined) {
            return;
        }
        this.state.client.authorize().then(client => {
            Credentials.storeFromClient(client);
            // @ts-ignore
            this.state.authState = Credentials.authStateFromClient(client);

            // After authorization, perform tasks that require authentication.
            this.fetchAndStoreWorkspaces();

            this.forceUpdate();
        });
    }

    /**
     * Fetches the user's workspaces via the API and stores response in state.
     */
    fetchAndStoreWorkspaces = (): void => {
        if (this.state.client === undefined) {
            return;
        }
        this.state.client.workspaces.findAll().then(workspaces => {
            this.setState({
                workspace: workspaces.data[0],
                workspaces: workspaces.data
            });
        });
    }

    /**
     * Uses the state to return the properly-formatted request parameters.
     */
    requestParameters = () => {
        if (this.state.params === undefined) {
            return;
        }

        let params: any = {};

        if (this.state.params.includeFields.length > 0) {
            params = _.extend(params, {
                opt_fields: this.state.params.includeFields.join()
            });
        }
        params = _.extend(params, this.state.params.optionalParams);

        if (this.canPaginate()) {
            params = _.extend(params, this.state.params.paginateParams);
        }

        if (this.state.action === undefined) {
            return;
        }

        // Sometimes, the first required param is put into the URL directly, whereas
        // Other times we put the required params as a request parameter.
        const requiredParams = _.filter(this.state.action.params, "required");
        if (ResourcesHelpers.pathForActionContainsRequiredParam(this.state.action)) {
            // The first required param is put into the URL, so include later ones.
            if (requiredParams.length > 1) {
                _.forEach(
                    this.state.params.requiredParams,
                    (value: string, key: string) => {
                        if (requiredParams[0].name !== key) {
                            params[key] = value;
                        }
                    });
            }
        } else {
            // The first required param is not in the URL, so include them all.
            _.forEach(
                this.state.params.requiredParams,
                (value: string, key: string) => {
                    params[key] = value;
                });
        }

        // If an optional param is for workspace, then inject the chosen workspace.
        const hasOptionalWorkspaceParam = _.some(this.state.action.params,
            (param: any) => !param.required && _isWorkspaceParameter(param));
        if (hasOptionalWorkspaceParam && this.state.workspace !== undefined) {
            params = _.extend(params, {workspace: this.state.workspace.gid});
        }

        // The user should be able to override any above, so add extra params last.
        params = _.extend(params, this.state.params.extraParams);

        return params;
    }

    /**
     * Uses the state to return the URL for the current request.
     * Puts the first required parameter (if any) in the URL.
     *
     * @returns {string}
     */
    requestUrl = (): string => {

        if (this.state.action === undefined) {
            return "";
        }

        if (this.state.params === undefined) {
            return "";
        }

        let paramValue = "-1";

        const requiredParam = _.find(this.state.action.params, "required");
        if (requiredParam !== undefined) {
            paramValue = this.state.params.requiredParams[requiredParam.name];

            // If we don't have the paramValue, and check if it's a workspace.
            if (paramValue === undefined && _isWorkspaceParameter(requiredParam)) {
                // Since we lazy-load workspaces, make sure it has been loaded.
                if (this.state.workspace !== undefined) {
                    paramValue = this.state.workspace.gid;
                }
            }
        }

        return ResourcesHelpers.pathForAction(this.state.action, paramValue);
    }

    /**
     * Uses the state to return the URL with parameters for the current request.
     * @returns {string}
     */
    requestUrlWithFullParams = (): string => {
        const baseUrl = this.requestUrl();

        // Add the optional parameters to the URL.
        const parsed = url.parse(baseUrl);
        parsed.query = this.requestParameters();

        // Format the URL and use commas for readability.
        return url.format(parsed).replace(/%2C/g, ",");
    }

    /**
     * Updates the resource state following an onChange event.
     */
    onChangeResourceState = (event?: React.FormEvent): void => {
        if (!event) {
            return;
        }

        const resource = ResourcesHelpers.resourceFromResourceName(
            (<HTMLSelectElement>event.target).value);
        const hasChanged = resource !== this.state.resource;

        // If the resource has changed, also reset relevant parts of state.
        const action = !hasChanged ?
            this.state.action : ResourcesHelpers.defaultActionFromResource(resource);
        const params = !hasChanged ? this.state.params : this.resetParams();

        this.setState({
            action: action,
            params: params,
            resource: resource
        });
    }

    /**
     * Updates the action state following an onChange event.
     */
    onChangeActionState = (event?: React.FormEvent): void => {
        if (this.state.resource === undefined) {
            return;
        }

        if (!event) {
            return;
        }

        const action = ResourcesHelpers.actionFromResourceAndName(
            this.state.resource, (<HTMLSelectElement>event.target).value);
        const hasChanged = action !== this.state.action;

        // If the action has changed, also reset relevant parts of state.
        const params = !hasChanged ? this.state.params : this.resetParams();

        this.setState({
            action: action,
            params: params
        });
    }

    /**
     * Returns a function to handle the onChange event for a given paramType.
     * @param paramType
     * @returns {function(React.FormEvent): void}
     */
    onChangePropertyChecked = (paramType: string) => {
        return (event?: React.FormEvent) => {
            if (!event) {
                return;
            }

            const target = <HTMLInputElement>event.target;
            const params: any = this.state.params;

            if (target.checked) {
                params[paramType].push(target.value);
            } else {
                params[paramType] = _.without(params[paramType], target.value);
            }

            this.setState({
                params: params
            });
        };
    }

    /**
     * Updates the paginate state following an onChange event.
     */
    onChangePaginateState = (limitOrOffset: string) => {
        return (event?: React.FormEvent) => {
            if (!event) {
                return;
            }

            const target = <HTMLInputElement>event.target;

            // If this won't validate (e.g. negative limit value), don't set state.
            if (!target.checkValidity()) {
                return false;
            }

            // If the user removes the value, we want to disable that parameter.
            if (target.value === "") {
                if (this.state.params === undefined) {
                    return;
                }
                this.setState(update(this.state, <any>{
                    params: {
                        paginateParams: {
                            $set: _.omit(this.state.params.paginateParams, limitOrOffset)
                        }
                    }
                }));
            } else {
                this.setState(update(this.state, <any>{
                    params: {
                        paginateParams:
                            _.zipObject([limitOrOffset], [{$set: target.value}])
                    }
                }));
            }
        };
    }

    /**
     * Returns a function to handle the onChange event for a given parameter.
     * @param parameter
     * @returns {function(React.FormEvent): void}
     */
    onChangeParameterState = (parameter: Parameter) => {
        return (event?: React.FormEvent) => {
            if (!event) {
                return;
            }

            const target = <HTMLInputElement>event.target;

            if (_isWorkspaceParameter(parameter)) {
                const workspace = _.find(this.state.workspaces,
                    (workspace: any) => workspace.gid.toString() === target.value);

                this.setState({
                    workspace: workspace
                });
            } else {
                const paramType = parameter.required ?
                    "requiredParams" : "optionalParams";

                // Update or remove the parameter accordingly.
                this.setState(update(this.state, <any>{
                    params: _.zipObject([paramType], [{
                        $set: target.value === "" ?
                            _.omit((<any>this.state.params)[paramType], parameter.name) :
                            _.extend(
                                (<any>this.state.params)[paramType],
                                _.zipObject([parameter.name], [target.value]))
                    }])
                }));
            }
        };
    }

    /**
     * Given a list of extra parameters, put them in the state.
     */
    syncExtraParameters = (parameters: ExtraParameterEntry.ExtraParameter[]) => {
        // Reduce from list of extra params to key-value object to store in state.
        const extraParams = _.reduce(
            parameters,
            (result: any, parameter: ExtraParameterEntry.ExtraParameter) => {
                if (parameter.key !== "" && parameter.value !== "") {
                    result[parameter.key] = parameter.value;
                }
                return result;
            },
            {}
        );

        this.setState(update(this.state, <any>{
            params: {
                extraParams: {
                    $set: extraParams
                }
            }
        }));
    }

    /**
     * Determines the user state status for a submit request. Based on this,
     * we determine whether the user can submit a request.
     */
    userStateStatus = (): Explorer.UserStateStatus => {
        if (this.state.action === undefined) {
            throw new Error("Boo");
        }

        if (this.state.params === undefined) {
            throw new Error("Boo");
        }
        // Ensure the user is authenticated.
        if (this.state.authState !== Credentials.AuthState.Authorized) {
            return Explorer.UserStateStatus.ErrorNotAuthorized;
        }

        // Currently, we only submit GET requests. This may be revisited later.
        if (this.state.action.method !== "GET") {
            return Explorer.UserStateStatus.ErrorUnsupportedMethodType;
        }

        // Ensure we've successfully loaded the workspaces.
        if (this.state.workspaces === undefined) {
            return Explorer.UserStateStatus.ErrorAwaitingWorkspaces;
        }

        // Ensure all required parameters are set.
        const requiredParams = _.filter(this.state.action.params, "required");
        if (requiredParams.length !== _.size(this.state.params.requiredParams)) {
            // If the only missing required param is workspace, we're okay.
            const numMissing =
                requiredParams.length - _.size(this.state.params.requiredParams);
            if (!_.some(requiredParams, _isWorkspaceParameter) || numMissing !== 1) {
                return Explorer.UserStateStatus.ErrorUnsetRequiredParams;
            }
        }

        // At this point, we've passed all constraints.
        return Explorer.UserStateStatus.Okay;
    }

    /**
     * Send a get request to the API using the current state's route, and
     * update the state after receiving a response.
     */
    onSubmitRequest = (event: React.FormEvent): void => {
        if (this.state.client === undefined) {
            throw new Error("Boo");
        }

        event.preventDefault();

        // Sanity check: we should never reach this state, but this is safer.
        if (!this.canSubmitRequest()) {
            throw new Error("We cannot submit this request.");
        }

        const dispatcher = this.state.client.dispatcher;
        const route = this.requestUrl();
        const routeFull = this.requestUrlWithFullParams();
        const routeFullUrl = dispatcher.url(routeFull);
        const params = this.requestParameters();

        // Set intermediate state to signify loading.
        this.setState({
            response: <JsonResponse.ResponseData>{
                action: this.state.action,
                isLoading: true,
                route: routeFull,
                routeUrl: routeFullUrl
            }
        });

        // Dispatch request and update after response is received.
        dispatcher.get(route, params, null).then((response: any) => {
            this.setState({
                response: <JsonResponse.ResponseData>{
                    action: this.state.action,
                    rawResponse: response,
                    route: routeFull,
                    routeUrl: routeFullUrl
                }
            });
        }).catch((e: any) => {
            this.setState({
                response: <JsonResponse.ResponseData>{
                    action: this.state.action,
                    error: e,
                    rawResponse: e.value,
                    route: routeFull,
                    routeUrl: routeFullUrl
                }
            });
        }).finally(() => {
            // Store possibly-updated credentials for later use.
            if (this.state.client !== undefined) {
                Credentials.storeFromClient(this.state.client);
            }
        });
    }

    render() {
        if (!this.state.response) {
            return;
        }

        return r("div", {
            className: "api-explorer",
            children: [
                r("h1", {}, "API Explorer"),
                this.maybeRenderAuthorizationLink(),
                this.renderRequestEntryForm(),
                [
                    r("hr", null),
                    JsonResponse.create({
                        response: this.state.response
                    })
                ]
            ]
        });
    }

    private canPaginate(): boolean {
        // TODO: Also can't paginate on users over personal projects domain.
        if (this.state.action === undefined) {
            throw new Error("Boo");
        }

        return (this.state.action.collection || false) &&
            !this.state.action.collection_cannot_paginate;
    }

    private canSubmitRequest(): boolean {
        return this.userStateStatus() === Explorer.UserStateStatus.Okay;
    }

    private resetParams(): Explorer.ParamData {
        if (this.state.params === undefined) {
            throw new Error("Boo");
        }

        const params = Explorer.emptyParams();

        // Don't reset extra parameters, since those aren't route dependent.
        params.extraParams = this.state.params.extraParams;

        return params;
    }

    private maybeRenderAuthorizationLink() {
        let message = "";
        let messageClass = "";

        switch (this.state.authState) {
            case Credentials.AuthState.Authorized:
                return null;
            case Credentials.AuthState.Unauthorized:
                message = "Click to authorize API explorer";
                messageClass = "button authorize-link";
                break;
            case Credentials.AuthState.Expired:
                message = "Your authorization token has expired. Click here to refresh it!";
                messageClass = "button button--red authorize-link";
                break;
            default:
                break;
        }

        return r("p", {},
            r("a", {
                className: messageClass,
                href: "#",
                onClick: this.authorize
            }, message)
        );
    }

    private maybeRenderErrorMessage() {
        let message = "";
        switch (this.userStateStatus()) {
            case Explorer.UserStateStatus.Okay:
                return null;
            case Explorer.UserStateStatus.ErrorNotAuthorized:
                message = "You are not authorized to make a request.";
                break;
            case Explorer.UserStateStatus.ErrorUnsupportedMethodType:
                message = "Only GET requests can be submitted in the API Explorer.";
                break;
            case Explorer.UserStateStatus.ErrorAwaitingWorkspaces:
                message = "Workspaces are currently loading.";
                break;
            case Explorer.UserStateStatus.ErrorUnsetRequiredParams:
                message = "You must set all required parameters.";
                break;
            default:
                break;
        }

        return r("div", {
            className: "error-msg"
        }, message);
    }

    private renderRequestEntryForm() {
        if (!this.state.resource) {
            throw new Error("Resource is undefined");
        }

        if (!this.state.action) {
            throw new Error("Action is undefined");
        }

        if (!this.state.params) {
            throw new Error("Params is undefined");
        }

        return r("form", {
            className: "request-entry-form",
            onSubmit: this.onSubmitRequest,
            children: [
                r("div", {},
                    ResourceEntry.create({
                        resource: this.state.resource,
                        onResourceChange: this.onChangeResourceState
                    }),
                    RouteEntry.create({
                        action: this.state.action,
                        currentRequestUrl: this.requestUrlWithFullParams(),
                        onActionChange: this.onChangeActionState,
                        resource: this.state.resource
                    })
                ),
                r("div", {},
                    this.state.action.method !== "GET" ? "" :
                        // Show the user include/expand properties for GET requests only.
                        r("div", {
                                className: "row"
                            },
                            r("div", {
                                    className: "column-6"
                                },
                                PropertyEntry.create({
                                    classSuffix: "include",
                                    text: r("h3", {}, "Include Fields"),
                                    properties: this.state.resource.properties,
                                    useProperty: property => {
                                        if (!this.state.params) {
                                            return false;
                                        }

                                        return _.includes(this.state.params.includeFields, property);
                                    },
                                    isPropertyChecked: this.onChangePropertyChecked("includeFields")
                                })
                            ),
                        ),

                    r("div", {
                            className: "row"
                        },
                        r("div", {
                                className: "column-6"
                            },
                            PaginateEntry.create({
                                canPaginate: this.canPaginate(),
                                onPaginateChange: this.onChangePaginateState,
                                paginateParams: this.state.params.paginateParams,
                                text: r("h3", {}, "Paginate parameters")
                            })
                        ),

                        r("div", {
                                className: "column-6"
                            },
                            ParameterEntry.create({
                                text: r("h3", {}, "Attribute parameters"),
                                parameters: this.state.action.params || [],
                                onParameterChange: this.onChangeParameterState,
                                workspace: this.state.workspace,
                                workspaces: this.state.workspaces
                            })
                        )
                    ),
                    ExtraParameterEntry.create({
                        text: r("h3", {}, "Extra parameters"),
                        syncExtraParameters: this.syncExtraParameters
                    })
                ),
                r("div", {},
                    this.maybeRenderErrorMessage(),
                    r("p", {},
                        r("button", {
                            className: "button submit-request",
                            disabled: !this.canSubmitRequest(),
                            type: "submit"
                        }, "Submit")
                    )
                )
            ]
        });
    }
}

module Explorer {
    export function emptyParams(): ParamData {
        return {
            includeFields: [],
            requiredParams: {},
            optionalParams: {},
            extraParams: {},
            paginateParams: {
                limit: constants.INITIAL_PAGINATION_LIMIT
            }
        };
    }

    export interface ParamData {
        includeFields: string[];
        requiredParams: any;
        optionalParams: any;
        extraParams: any;
        paginateParams: {
            limit?: number;
            offset?: string;
        };
    }

    export interface Props {
        initialClient?: Asana.Client;
        initialResourceString?: string;
        initialRoute?: string;
    }

    /**
     * Possible states that the user can be in, given the current state/params.
     */
    export enum UserStateStatus {
        Okay,
        ErrorNotAuthorized,
        ErrorUnsupportedMethodType,
        ErrorAwaitingWorkspaces,
        ErrorUnsetRequiredParams
    }

    export interface State {
        action?: Action;
        authState?: Credentials.AuthState;
        client?: Asana.Client;
        params?: ParamData;
        resource?: Resource;
        response?: JsonResponse.ResponseData;
        workspace?: Asana.resources.Workspace;
        workspaces?: Asana.resources.Workspace[];
    }
}

export = Explorer;
