import chai from "chai";
import {Action, ActionThunk, Dispatcher, DispatchToken} from "../src";
import {before} from "mocha";

const expect = chai.expect
const dispatcher = Dispatcher.use()
let tested: boolean = false
let thunk: ActionThunk = new ActionThunk((action:Action) => tested = true)
let action: Action = new Action('ACTION', true)

const testDispatcher = () => describe('Testing Dispatcher singleton', () => {
    it('should return a new dispatcher', () => { expect(dispatcher instanceof Dispatcher) })
    it('should be the same instance', () => {
        const newDispatcher = Dispatcher.use()
        expect(dispatcher === newDispatcher)
    })
})

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

})

testDispatcher()
testRegister()
testUnregister()