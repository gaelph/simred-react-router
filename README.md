# simred-react-router [![NPM version](https://badge.fury.io/js/simred-react-router.svg)](https://npmjs.org/package/simred-react-router)  ![Build Status](https://img.shields.io/badge/build-passing-brightgreen.svg) ![Tests](https://img.shields.io/badge/tests-4%2F4-brightgreen.svg) ![Coverage](https://img.shields.io/badge/coverage-100%25-brightgreen.svg)

> React Router bindings to Simred state manager.  

If you do not know what Simred is, checkout [the project's GitHub page](https://github.com/gaelph/simred)

It exposes all functions from the `history` package:
- createBrowserHistory
- createMemoryHistory
- ...

And two more functions:

### `createRouterReducer(history: History): Reducer`
Creates a Simred reducer for the router from the history (`BrowserHistoy`, `MemoryHistory`, or `HashHistory`)

### `createConnectedRouter(routerReducerKey: string): Router
Creates a `Router` Component connected to the Simred store.  
The `routerReducerKey` argument is the key in the root reducer holding the router reducer.

**Example:**
```js
import { createRouterReducer, createConnectedRouter, createMemoryHistory } from 'simred-react-router'
const history = createMemoryHistory

const rootReducer = {
  // "router" is the routerReducerKey to pass to createConnectedRouter
  router: createRouterReducer(history)
}

const ConnectedRouter = createConnectedRouter('router')
```
OR
```js
import { createRouterReducer, createConnectedRouter, createMemoryHistory } from 'simred-react-router'
const history = createMemoryHistory

const rootReducer = {
  // "myGreatRouter" is the routerReducerKey to pass to createConnectedRouter
  myGreatRouter: createRouterReducer(history)
}

const ConnectedRouter = createConnectedRouter('myGreatRouter')
```


## Installation

```sh
$ npm install --save simred-react-router
```

## Usage

```js
import Simred from 'simred'
import { createConnectedRouter, createRouterReducer, createBrowserHistory } from 'simred-react-router'
import { Switch, Route } from 'react-router'
import { Provider } from 'react-simred'
import * as React from 'react'
import { renderDOM } from 'react-dom'

// The same history object needs to be passed to both the reducer and the component
const history = createBrowserHistory()

// Add a RouterReducer to Simred's root reducer
const rootReducer = {
  router: createRouterReducer(history)
}

const store = Simred.createStore(rootReducer)
// Create a Router connected to Simred
// Passing the key of the RouterReducer in the rootReducer 
const Router = createConnectedRouter('router')

// the ConnectedRouter is a HOC around react-router's own component
// and works the same
renderDOM((
  <Provider store={store}>
    <Router history={history}>
      <Switch>
        <Route path="/" render={() => <div>Home</div>} />
        <Route path="/users" render={() => <div>Users</div>} />
      </Switch>
    </Router>
  </Provider>
))
```

## License

MIT © [Gaël PHILIPPE](https://github.com/gaelph)
