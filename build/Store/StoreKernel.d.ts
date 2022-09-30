import { EventEmitter } from 'fbemitter';
import { Dispatcher } from "../Dispatcher/Dispatcher";
import { Action } from "../Action/Action";
import { DispatchListener } from "./DispatchListener";
import { EventSubscription } from "./EventSubscription";
import { DispatchToken } from "../Dispatcher/DispatchToken";
export declare abstract class StoreKernel {
    private readonly dispatchToken;
    protected changed: boolean;
    protected changeEvent: string;
    protected className: any;
    protected dispatcher: Dispatcher;
    protected emitter: EventEmitter;
    protected constructor();
    addListener(dispatchListener: DispatchListener): EventSubscription;
    getDispatchToken(): DispatchToken;
    hasChanged(): boolean;
    protected emitChange(): void;
    protected invokeOnDispatch(action: Action): void;
    protected abstract onDispatch(action: Action): void;
    private initialThunk;
}
