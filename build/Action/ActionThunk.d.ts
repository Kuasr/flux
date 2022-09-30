import { Action } from "./Action";
export declare class ActionThunk {
    private readonly logicFunction;
    constructor(logicFunction: (action: Action) => void);
    run(action: Action): void;
}
