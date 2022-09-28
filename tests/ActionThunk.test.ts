import * as chai from 'chai'
import {ActionThunk} from "../build";
import {Action} from "../src";
import {after, before} from "mocha";

const expect = chai.expect

let callbackPassed = false
const action = new Action('ACTION', true)
const func = (action: Action) => { if(action.payload == true) callbackPassed = true }
const thunk = new ActionThunk(func)

const testConstructor = () => describe('Testing ActionThunk constructor', () => {
    it('should be an instance of ActionThunk', () => expect(thunk instanceof ActionThunk))
})

const testRun = () => describe('Testing ActionThunk.run(...)', () => {
    before(() => {
        callbackPassed = false
        thunk.run(action)
    })

    it('should be able to running the thunk', () => expect(callbackPassed == true).to.true)

    after(() => callbackPassed = true)
})

testConstructor()
testRun()