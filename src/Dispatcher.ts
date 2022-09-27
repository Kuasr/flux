import { Action } from "./Action";
import { ActionThunk } from "./ActionThunk";
import { DispatchPool } from "./DispatchPool";
import { DispatchToken } from "./DispatchToken";
import { DispatcherError } from "./DispatcherError";

export class Dispatcher {

    private static instance: Dispatcher

    private thunks: DispatchPool<ActionThunk> = {}
    private isDispatching: boolean = false
    private isHandled: DispatchPool<boolean> = {}
    private isPending: DispatchPool<boolean> = {}
    private lastID: number = 1
    private pendingAction?: Action

    private readonly TOKEN_PREFIX: string = 'ID_'

    private constructor() {}

    public static use(): Dispatcher {
        if (Dispatcher.instance) return Dispatcher.instance
        return new Dispatcher()
    }

    public register(thunk: ActionThunk): DispatchToken {
        const id: DispatchToken = this.TOKEN_PREFIX + this.lastID++
        this.thunks[id] = thunk
        return id
    }

    public unregister(id: DispatchToken): void {
        if (this.thunkNotExists(id)) throw new DispatcherError('Error on Dispatcher.unregister(...)', 'There are no thunks with token: ' + id)
        delete this.thunks[id]
    }

    public waitFor(ids: Array<DispatchToken>): void {
        if(!this.isDispatching) throw new DispatcherError('Error on Dispatcher.waitFor(...)', 'Must be invoked while dispatching')
        ids.map( (id: DispatchToken) => {
            if (this.isPendingAndNotHandled(id)) throw new DispatcherError('Error on Dispatcher.waitFor(...)', 'Circular dependency detected waiting for ' + id )
            if (this.thunkNotExists(id)) throw new DispatcherError('Error on Dispatcher.waitFor(...)', 'There are no thunks with token: ' + id)
            this.runPendingAction(id);
        })
    }

    public dispatch(action: Action): void {
        if (this.isDispatching) throw new DispatcherError('Error on Dispatcher.dispatch(...)', 'Cannot dispatch during another dispatch')
        this.startDispatching(action)
    }

    private thunkNotExists(id: DispatchToken): boolean {
        return this.thunks[id] == undefined
    }

    private isPendingAndNotHandled(id: string) {
        return this.isPending[id] && !this.isHandled[id];
    }

    private runPendingAction(id: DispatchToken): void {
        this.isPending[id] = true
        this.thunks[id].run(this.pendingAction!)
        this.isHandled[id] = true
    }

    private startDispatching(action: Action): void {
        for (let token in this.thunks) {
            this.isPending[token] = false
            this.isHandled[token] = false
        }
        this.pendingAction = action
        this.isDispatching = true
    }

    private stopDispatching(): void {
        delete this.pendingAction
        this.isDispatching = false
    }
}

