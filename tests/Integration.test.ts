import chai from "chai";
import {Action, ActionThunk, Dispatcher, DispatchToken, Store} from "../src";
import {after, before} from "mocha";

const expect = chai.expect
const dispatcher: Dispatcher<Action> = new Dispatcher<Action>()

class ActionT extends Action{
    constructor() {
        super('action', 'action');
    }
}

class State {
    constructor(public value: Map<string, boolean>) {}
}

class DummyStore extends Store<State> {

    constructor(dispatcher: Dispatcher<Action>) {
        super(dispatcher);
    }

    getInitialState(): State {
        return new State(new Map<string, boolean>())
    }

    reduce(state: State, action: Action): any {
        if(action.type == 'action') return state.value
        return state
    }

}

const testIntegration = () => describe('Testing module', () => {
    let action: ActionT = new ActionT()
    let a = 0
    let thunk: ActionThunk<ActionT> = new ActionThunk((action: ActionT) => {
        if (action.type == 'action') a = 1
    })
    let token: DispatchToken

    before(() => {
        token = dispatcher.register(thunk)
        dispatcher.dispatch(action)
    })

    it('should be able to change the state', () => {
        expect(a == 1).to.be.true
    });
})

testIntegration()