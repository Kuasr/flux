"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoreKernel = void 0;
const fbemitter_1 = require("fbemitter");
const ActionThunk_1 = require("../Action/ActionThunk");
const StoreError_1 = require("./StoreError");
class StoreKernel {
    constructor(dispatcher) {
        this.className = this.constructor.name;
        this.changed = false;
        this.changeEvent = 'change';
        this.dispatcher = dispatcher;
        this.emitter = new fbemitter_1.EventEmitter();
        this.dispatchToken = this.dispatcher.register(this.initialThunk());
    }
    addListener(dispatchListener) {
        return this.emitter.addListener(this.changeEvent, dispatchListener);
    }
    getDispatcher() {
        return this.dispatcher;
    }
    getDispatchToken() {
        return this.dispatchToken;
    }
    hasChanged() {
        if (!this.dispatcher.isBusy())
            throw new StoreError_1.StoreError(this.className + '.hasChanged() error', 'This method must be invoked while dispatching');
        return this.changed;
    }
    emitChange() {
        if (!this.dispatcher.isBusy())
            throw new StoreError_1.StoreError(this.className + '.emitChange() error', 'This method must be invoked while dispatching');
        this.changed = true;
    }
    invokeOnDispatch(action) {
        this.changed = false;
        if (this.changed)
            this.emitter.emit(this.changeEvent);
    }
    initialThunk() {
        return new ActionThunk_1.ActionThunk((action) => this.invokeOnDispatch(action));
    }
}
exports.StoreKernel = StoreKernel;
