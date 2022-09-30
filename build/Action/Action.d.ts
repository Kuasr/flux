export declare type ActionPayload = Object;
export declare class Action {
    readonly type: string;
    readonly payload: ActionPayload;
    constructor(type: string, payload: ActionPayload);
}
