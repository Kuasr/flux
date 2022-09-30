"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Dispatcher = void 0;
const DispatcherError_1 = require("./DispatcherError");
class Dispatcher {
    constructor() {
        this.thunks = {};
        this.isDispatching = false;
        this.isHandled = {};
        this.isPending = {};
        this.lastID = 1;
        this.TOKEN_PREFIX = 'ID_';
    }
    static use() {
        if (Dispatcher.instance)
            return Dispatcher.instance;
        return new Dispatcher();
    }
    register(thunk) {
        const id = this.TOKEN_PREFIX + this.lastID++;
        this.thunks[id] = thunk;
        return id;
    }
    unregister(id) {
        if (this.thunkNotExists(id))
            throw new DispatcherError_1.DispatcherError('Error on Dispatcher.unregister(...)', 'There are no thunks with token: ' + id);
        delete this.thunks[id];
    }
    waitFor(ids) {
        if (!this.isDispatching)
            throw new DispatcherError_1.DispatcherError('Error on Dispatcher.waitFor(...)', 'Must be invoked while dispatching');
        ids.map((id) => {
            if (this.isPendingAndNotHandled(id))
                throw new DispatcherError_1.DispatcherError('Error on Dispatcher.waitFor(...)', 'Circular dependency detected waiting for ' + id);
            if (this.thunkNotExists(id))
                throw new DispatcherError_1.DispatcherError('Error on Dispatcher.waitFor(...)', 'There are no thunks with token: ' + id);
            this.invokeActionThunk(id);
        });
    }
    dispatch(action) {
        if (this.isDispatching)
            throw new DispatcherError_1.DispatcherError('Error on Dispatcher.dispatch(...)', 'Cannot dispatch during another dispatch');
        this.startDispatching(action);
        try {
            this.dispatchAvailableThunks();
        }
        finally {
            this.stopDispatching();
        }
    }
    isBusy() {
        return !this.isDispatching;
    }
    thunkNotExists(id) {
        return this.thunks[id] == undefined;
    }
    isPendingAndNotHandled(id) {
        return this.isPending[id] && !this.isHandled[id];
    }
    invokeActionThunk(id) {
        this.isPending[id] = true;
        this.thunks[id].run(this.pendingAction);
        this.isHandled[id] = true;
    }
    dispatchAvailableThunks() {
        for (let token in this.thunks) {
            if (!this.isPending[token])
                this.invokeActionThunk(token);
        }
    }
    startDispatching(action) {
        for (let token in this.thunks) {
            this.isPending[token] = false;
            this.isHandled[token] = false;
        }
        this.pendingAction = action;
        this.isDispatching = true;
    }
    stopDispatching() {
        delete this.pendingAction;
        this.isDispatching = false;
    }
}
exports.Dispatcher = Dispatcher;
