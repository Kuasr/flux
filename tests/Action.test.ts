import {Action} from '../src';

import * as chai from 'chai';

const expect = chai.expect

const type = 'ACTION'
const payload = {"class": "Action"}
const action = new Action(type, payload)

const testConstructor = () => describe('Testing Action constructor', () => {
    it('should be an instance of Action', () => expect(action instanceof Action))
    it('should be able to return type', () => expect(action.type).to.equal(type))
    it('should be able to return payload', () => expect(action.payload).to.equal(payload))
})

testConstructor()