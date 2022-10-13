import { StoreKernel } from "./StoreKernel";
import { Action } from "../Action/Action";
import {Dispatcher} from "../Dispatcher/Dispatcher";
export declare abstract class Store<State> extends StoreKernel {
    private state;
    protected constructor(dispatcher: Dispatcher<Action>);
    getState(): State;
    abstract getInitialState(): State;
    abstract reduce(state: State, action: Action): State;
    areEqual(one: State, two: State): boolean;
    protected invokeOnDispatch(action: Action): void;
    private checkStateIsDefined;
    private updateState;
}
