import * as React from 'react'

import { createConnectedRouter } from '../src/index'
import { createRouterReducer } from '../src/index'
import { createMemoryHistory } from '../src/index'

import Simred from 'simred'

import { renderToString } from 'react-dom/server'
import { Provider } from 'react-simred'

import { Route, Switch, Redirect } from 'react-router'

describe('Connected Router', function () {
  it('renders without crashing', function () {
    const render = () => {
      const history = createMemoryHistory({
        initialEntries: ['/'], // The initial URLs in the history stack
        initialIndex: 0, // The starting index in the history stack
        keyLength: 6, // The length of location.key
        // A function to use to confirm navigation with the user. Required
        // if you return string prompts from transition hooks (see below)
        getUserConfirmation: null
      })

      const store = Simred.createStore({
        router: createRouterReducer(history)
      })

      const ConnectedRouter = createConnectedRouter('router')

      const res = renderToString((
        <Provider store={store}>
          <ConnectedRouter history={history}>
            <Route path="/" render={props => <div>rendered</div>} />
          </ConnectedRouter>
        </Provider>
      ))

      console.log(res)
      console.log(store.getState().router)
    }

    expect(render).not.toThrow()

  })

  it('redirects', function () {
    const render = () => {
      const history = createMemoryHistory({
        initialEntries: ['/'], // The initial URLs in the history stack
        initialIndex: 0, // The starting index in the history stack
        keyLength: 6, // The length of location.key
        // A function to use to confirm navigation with the user. Required
        // if you return string prompts from transition hooks (see below)
        getUserConfirmation: null
      })

      const store = Simred.createStore({
        router: createRouterReducer(history)
      })

      const ConnectedRouter = createConnectedRouter('router')

      const res = renderToString((
        <Provider store={store}>
          <ConnectedRouter history={history}>
            <Switch>
              <Route path="/other" render={props => <div>other</div>} />
              <Route path="/" render={props => <Redirect to="/other" />} />
            </Switch>
          </ConnectedRouter>
        </Provider>
      ))

      console.log(res)
      console.log(store.getState().router)
    }

    expect(render).not.toThrow()

  })
})