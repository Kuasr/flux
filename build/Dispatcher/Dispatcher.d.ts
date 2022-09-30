import { Action } from "../Action/Action";
import { ActionThunk } from "../Action/ActionThunk";
import { DispatchToken } from "./DispatchToken";
export declare class Dispatcher {
    private static instance;
    private thunks;
    private isDispatching;
    private isHandled;
    private isPending;
    private lastID;
    private pendingAction?;
    private readonly TOKEN_PREFIX;
    private constructor();
    static use(): Dispatcher;
    register(thunk: ActionThunk): DispatchToken;
    unregister(id: DispatchToken): void;
    waitFor(ids: Array<DispatchToken>): void;
    dispatch(action: Action): void;
    isBusy(): boolean;
    private thunkNotExists;
    private isPendingAndNotHandled;
    private invokeActionThunk;
    private dispatchAvailableThunks;
    private startDispatching;
    private stopDispatching;
}
