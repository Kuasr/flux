"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActionThunk = void 0;
class ActionThunk {
    constructor(logicFunction) {
        this.logicFunction = logicFunction;
    }
    run(action) {
        return this.logicFunction(action);
    }
}
exports.ActionThunk = ActionThunk;
