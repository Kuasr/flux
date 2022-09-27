import { Action } from "./Action";
import { ActionThunk } from "./ActionThunk";
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
    private thunkNotExists;
    private isPendingAndNotHandled;
    private runPendingAction;
    private startDispatching;
    private stopDispatching;
}
