import { Action } from "./Action";
export declare class ActionThunk<T extends Action> {
    private readonly logicFunction;
    constructor(logicFunction: (action: T) => void);
    run(action: T): void;
}
