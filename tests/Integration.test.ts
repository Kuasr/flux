import chai from "chai";
import {Action, ActionThunk, Dispatcher, DispatchToken, Store} from "../src";
import {after, before} from "mocha";
import Immutable from "immutable";

const expect = chai.expect
const dispatcher: Dispatcher<Action> = new Dispatcher<Action>()

class ActionT extends Action{
    constructor() {
        super('action', true);
    }
}

class State {
    constructor(public value: Immutable.Map<string, boolean>) {}
}

class DummyStore extends Store<State> {

    constructor(dispatcher: Dispatcher<Action>) {
        super(dispatcher);
    }

    getInitialState(): State {
        return new State(Immutable.Map<string, boolean>())
    }

    reduce(state: State, action: ActionT): State {
        if(action.type == 'action') return new State(Immutable.Map<string,boolean>().set('action', true))
        return state
    }

}

const testIntegration = () => describe('Testing module', () => {
    let action: ActionT = new ActionT()
    let store: DummyStore = new DummyStore(dispatcher)


    before(() => {
        dispatcher.dispatch(action)
    })

    it('should be able to change the state', () => {
        expect(store.getState().value.get('action') == true).to.be.true
    });
})

testIntegration()