import chai from "chai";
import {Action, ActionThunk, Dispatcher, DispatchToken} from "../src";
import {after, before} from "mocha";

const expect = chai.expect
const dispatcher = new Dispatcher<Action>();
let tested: boolean = false
const thunk: ActionThunk<Action> = new ActionThunk((action:Action) => tested = true)
const TYPE: string = 'ACTION'
const action: Action = new Action(TYPE, true)


const testRegister = () => describe('Testing Dispatcher.register(...)', () => {
    let token: DispatchToken

    it('should be able to register new thunks', () => {
        token = dispatcher.register(thunk)
        expect(typeof token === 'string')
    })
    it('should return a token with format ID_int', () => { expect(token == 'ID_1') })

    after(() => { dispatcher.unregister(token) });
})

const testUnregister = () => describe('Testing Dispatcher.unregister(...)', () => {
    let token: DispatchToken

    before(() => {
        token = dispatcher.register(thunk)
    })

    it('should be able to unregister thunks', () => {
        dispatcher.unregister(token)
        expect(() => dispatcher.unregister(token))
            .to.throw('There are no thunks with token: ' + token)
    })
})

const testDispatch = () => describe('Testing Dispatcher.dispatch(...)', () => {
    let token: DispatchToken
    const actionThunk: ActionThunk<Action> = new ActionThunk((action: Action) => {
        if (action.type == TYPE) tested = true
    })
    
    before(() => {
        tested = false
        token = dispatcher.register(actionThunk)
        dispatcher.dispatch(action)
    })

    it('should be able to be run by matching an action thunk', () => {
        expect(() => tested == true)
    })

    after(() => {
        tested = false
        dispatcher.unregister(token)
    })
})

const testWaitFor = () => describe('Testing Dispatcher.waitFor(...)', () => {
    let token: DispatchToken
    let secondToken: DispatchToken

    const dummyAction: Action = new Action('SECOND_ACTION', true)
    const dummyThunk: ActionThunk<Action> = new ActionThunk((action: Action) => { if (action.type == 'SECOND_ACTION') tested = false })

    const actionThunk: ActionThunk<Action> = new ActionThunk((action: Action) => {
        if (action.type == TYPE) {
            dispatcher.waitFor([token])
            tested = true
        }
    })

    before(() => {
        tested = false
        token = dispatcher.register(dummyThunk)
        secondToken = dispatcher.register(actionThunk)
    })

    it('should be able to wait for action dispatch', () => {
        dispatcher.dispatch(action)
        expect(() => tested == false)

        dispatcher.dispatch(dummyAction)
        expect(() => tested == true)
    })

    after(() => {
        tested = false
        dispatcher.unregister(token)
        dispatcher.unregister(secondToken)
    })
})

testRegister()
testUnregister()
testDispatch()
testWaitFor()