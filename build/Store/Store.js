"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Store = void 0;
const StoreKernel_1 = require("./StoreKernel");
const ReduceStoreError_1 = require("./ReduceStoreError");
class Store extends StoreKernel_1.StoreKernel {
    constructor(dispatcher) {
        super(dispatcher);
        this.state = this.getInitialState();
    }
    getState() {
        return this.state;
    }
    areEqual(one, two) {
        return one === two;
    }
    invokeOnDispatch(action) {
        this.changed = false;
        const startingState = this.state;
        const endingState = this.reduce(startingState, action);
        this.checkStateIsDefined(endingState);
        if (!this.areEqual(startingState, endingState))
            this.updateState(endingState);
        if (this.changed)
            this.emitter.emit(this.changeEvent);
    }
    checkStateIsDefined(state) {
        if (state === undefined)
            throw new ReduceStoreError_1.ReduceStoreError(this.className + '.reduce() returned undefined', 'Use null if this was intentional');
    }
    updateState(endingState) {
        this.state = endingState;
        this.emitChange();
    }
}
exports.Store = Store;
