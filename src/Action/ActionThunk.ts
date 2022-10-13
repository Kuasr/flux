import { Action } from "./Action";

export class ActionThunk<T extends Action> {

    constructor(private readonly logicFunction: (action: T) => void) {}

    public run(action: T): void {
        return this.logicFunction(action)
    }

}
