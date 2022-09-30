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

Start by looking through the [guides and examples](./examples) on Github. For more resources and API docs check out [facebook.github.io/flux](https://facebook.github.io/flux).