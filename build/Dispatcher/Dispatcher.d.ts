import { Action } from "../Action/Action";
import { ActionThunk } from "../Action/ActionThunk";
import { DispatchToken } from "./DispatchToken";
export declare class Dispatcher<T extends Action> {
    private thunks;
    private isDispatching;
    private isHandled;
    private isPending;
    private lastID;
    private pendingAction?;
    private readonly TOKEN_PREFIX;
    register(thunk: ActionThunk<T>): DispatchToken;
    unregister(id: DispatchToken): void;
    waitFor(ids: Array<DispatchToken>): void;
    dispatch(action: T): void;
    isBusy(): boolean;
    private thunkNotExists;
    private isPendingAndNotHandled;
    private invokeActionThunk;
    private dispatchAvailableThunks;
    private startDispatching;
    private stopDispatching;
}
