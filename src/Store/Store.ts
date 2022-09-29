import {StoreKernel} from "./StoreKernel";
import {Action} from "../Action/Action";
import {ReduceStoreError} from "./ReduceStoreError";

export abstract class Store<State> extends StoreKernel {
    private state: State

    constructor() {
        super();
        this.state = this.getInitialState()
    }

    public getState(): State {
        return this.state
    }

    public abstract getInitialState(): State

    public abstract reduce(state: State, action: Action): State

    public areEqual(one: State, two: State): boolean {
        return one === two
    }

    protected invokeOnDispatch(action: Action) {
        this.changed = false

        const startingState: State = this.state
        const endingState: State = this.reduce(startingState, action)

        this.checkStateIsDefined(endingState)
        if (!this.areEqual(startingState, endingState)) this.updateState(endingState)
        if (this.changed) this.emitter.emit(this.changeEvent)
    }

    private checkStateIsDefined(state: State): void {
        if (state === undefined) throw new ReduceStoreError(this.className + '.reduce() returned undefined',
            'Use null if this was intentional')
    }

    private updateState(endingState: State) {
        this.state = endingState
        this.emitChange()
    }
}
