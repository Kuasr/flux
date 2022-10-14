import chai from "chai";
import {Store, Dispatcher} from '../src'
import Immutable from "immutable"

const expect = chai.expect

class FooStore extends Store<any> {
    getInitialState() {
        return Immutable.Map()
    }

    constructor(dispatcher: Dispatcher<any>) {
        super(dispatcher);
    }

    reduce(state: any, action: any) {
        switch (action.type) {
            case 'foo':
                return state.set('foo', action.foo);
            case 'bar':
                return state.set('bar', action.bar);
            case 'foobar':
                return state.set('foo', action.foo).set('bar', action.bar);
            case 'boom':
                return state.clear();
            default:
                return state;
        }
    }
}

const testStore = () => describe('Testing Store', () => {
    let dispatch: any;
    let store: any;

    beforeEach(() => {
        const dispatcher: Dispatcher<any> = new Dispatcher<any>();
        store = new FooStore(dispatcher);
        dispatch = dispatcher.dispatch.bind(dispatcher);
    });

    it('should respond to actions', () => {
        expect(store.getState().get('foo')).to.be.equal(undefined);
        expect(store.getState().has('foo')).to.be.equal(false);

        dispatch({
            type: 'foo',
            foo: 100,
        });

        expect(store.getState().get('foo')).to.be.equal(100);
        expect(store.getState().has('foo')).to.be.equal(true);
    });

    it('should only emit one change for multiple cache changes', () => {
        dispatch({
            type: 'foo',
            foo: 100,
        });

        expect(store.getState().get('foo')).to.be.equal(100);

        dispatch({
            type: 'foobar',
            foo: 200,
            bar: 400,
        });

        expect(store.getState().get('foo')).to.be.equal(200);
        expect(store.getState().get('bar')).to.be.equal(400);
    });

    it('should not emit for empty changes', () => {
        dispatch({
            type: 'foo',
            foo: 100,
        });

        expect(store.getState().get('foo')).to.be.equal(100);

        dispatch({
            type: 'foo',
            foo: 100,
        });

        expect(store.getState().get('foo')).to.be.equal(100);
    });

    it('should clear the cache', () => {
        dispatch({
            type: 'foo',
            foo: 100,
        });

        expect(store.getState().get('foo')).to.be.equal(100);

        dispatch({type: 'boom'});

        expect(store.getState().get('foo')).to.be.equal(undefined);
        expect(store.getState().has('foo')).to.be.equal(false);
    });
})

testStore()