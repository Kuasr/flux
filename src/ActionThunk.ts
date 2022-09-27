import { Action } from "./Action";

export class ActionThunk {

    constructor(private readonly logicFunction: (action: Action) => void) {}

    public run(action: Action): void {
        return this.logicFunction(action)
    }

}
