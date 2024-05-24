<p align="center">
  <img src="img/Kuasr%20Flux%20Banner.png" alt="Kuasr Flux Logotype">
</p>

<p align="center">
  Kuasr Flux™ is a library that implements flux architecture designed by <a href="https://github.com/facebook/flux">Meta</a> with some modifications used in Kuasr's projects. <br>
  <br>
  <a href="https://github.com/kuasr/flux/blob/master/LICENSE">
    <img src="https://img.shields.io/github/license/Kuasr/flux" alt="Licence Badge" />
  </a>
  <a href="https://www.npmjs.com/package/kuasr-flux">
    <img src="https://img.shields.io/github/package-json/v/Kuasr/flux?style=flat" alt="Current npm package version." />
  </a>
</p>

<hr>

<img src="img/Flux%20pattern.png" alt="Flux pattern" style="width: 100%;">


# Kuasr Flux overview

The flux pattern is an architecture whose main objective is to generate a unidirectional data flow controlled by a centralized dispatcher, which allows the state of the interface components to be updated dynamically and efficiently.

## Flux parts

- Dispatcher
- Store
- Action
- ActionThunk
- View

## Dispatcher
The dispatcher is the centralized orchestrator. Theis labor is to manage all the actions and make them reach to the registered stores. There is only one single dispatcher per application.

## Store
Stores are objects that save the data of the application. Stores only receive data when the dispatcher sends actions. Components or another objects cannot modify the state inside the stores. When a store's state changes it must emit an event. There are many stores per application.

## Action
Actions are data transfer objects of the application. They are used to send data from the dispatcher to the final destinations like views or external services. Actions have two attributes, the type and the payload:

```typescript
{
    type: string = 'USER::MODIFY_EMAIL'
    payload: Object = {
        id: number = 1,
        email: string = 'daniel@kuasr.com'
    }
}
```

## Action Thunk
Action Thunks are basically logic functions that are stored in the dispatcher and are run when an action is dispatched. They are most used to save an action payload into a store.

## View
Views are objects that display data saved in the stores. They are usually components of a framework, usually React components or even web components. When a view uses data from a store it must also subscribe to change events from that store. Then when the store emits a change the view can get the new data and re-render. Some actions are dispatched from views as the user interacts with parts of the interface.

# Getting started
You can install Kuasr Flux running the command `npm install kuasr-flux` in your project. You can use the dispatcher by the following line of code:

```typescript
const dispatcher: Dispatcher = Dispatcher.use()
```

To save the state you need to create a new class that extends `Store`:
```typescript
class UserStore extends Store<UserState> {
    
    getInitialState(): UserState {
        return UserState.empty();
    }
    
    reduce(state: UserState, action: Action): UserState {
        const user: User = action.payload.user
        if (action.type == 'USER::MODIFY_EMAIL') state.setEmail(user.id, user.email)
        if (action.type == 'USER::ADD_USER') state.addUser(user)
        return state
    }
    
}
```

Now you can register `ActionThunk` like this:

```typescript
import {DispatchToken} from "./DispatchToken";

const modifyEmailThunk: ActionThunk = new ActionThunk( (action: Action) => {
    if (action.type == 'USER::MODIFY_EMAIL') userStore.reduce(action.payload)
})

const token: DispatchToken = dispatcher.register(modifyEmailThunk)
```

Then you can dispatch actions using `Dispatcher`:
```typescript
const action: Action = new Action('USER::MODIFY_EMAIL', user)

dispatcher.dispatch(action)
```

You can use `waitFor()` to run an `ActionThunk` only when passed `ActionThunks` have been run:

```typescript
const modifyEmailToken: DispatchToken = dispatcher.register(modifyEmailThunk)

const sendMailThunk: ActionThunk = new ActionThunk( (action: Action) => {
    if (action.type == 'USER::SEND_MAIL') {
        dispatcher.waitFor([modifyEmailToken])
        mailService.sendMail(action.payload)
    }
})
const sendMailToken: DispatchToken = dispatcher.register(sendMailThunk)
```

# License
Copyright 2024 Kuasr. Licensed [MIT](https://github.com/kuasr/flux/blob/master/LICENSE).
