import {EventEmitter} from 'fbemitter'

import {Dispatcher} from "../Dispatcher/Dispatcher";
import {ActionThunk} from "../Action/ActionThunk";
import {Action} from "../Action/Action";
import {DispatchListener} from "./DispatchListener";
import {EventSubscription} from "./EventSubscription";
import {DispatchToken} from "../Dispatcher/DispatchToken";
import {StoreError} from "./StoreError";

export abstract class StoreKernel {

    private readonly dispatchToken: DispatchToken

    protected changed: boolean
    protected changeEvent: string
    protected className: any
    protected dispatcher: Dispatcher<any>
    protected emitter: EventEmitter

    protected constructor(dispatcher: Dispatcher<any>) {
        this.className = this.constructor.name
        this.changed = false
        this.changeEvent = 'change'
        this.dispatcher = dispatcher
        this.emitter = new EventEmitter()
        this.dispatchToken = this.dispatcher.register(this.initialThunk())
    }

    public addListener(dispatchListener: DispatchListener): EventSubscription {
        return this.emitter.addListener(this.changeEvent, dispatchListener)
    }

    public getDispatcher(): Dispatcher<any> {
        return this.dispatcher
    }

    public getDispatchToken(): DispatchToken {
        return this.dispatchToken
    }

    public hasChanged(): boolean {
        if (!this.dispatcher.isBusy()) throw new StoreError(this.className + '.hasChanged() error', 'This method must be invoked while dispatching')
        return this.changed
    }

    protected emitChange(): void {
        if (!this.dispatcher.isBusy()) throw new StoreError(this.className + '.emitChange() error', 'This method must be invoked while dispatching')
        this.changed = true
    }

    protected invokeOnDispatch(action: Action): void {
        this.changed = false
        if (this.changed) this.emitter.emit(this.changeEvent)
    }

    private initialThunk(): ActionThunk<any> {
        return new ActionThunk((action: Action) => this.invokeOnDispatch(action))
    }
}

