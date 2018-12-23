import * as React from 'react'

import Enzyme, { shallow, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({adapter: new Adapter()})

import { createConnectedRouter } from '../src/index'
import { createRouterReducer } from '../src/index'
import { createMemoryHistory } from '../src/index'

import Simred from 'simred'

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

      const res = mount((
        <Provider store={store}>
          <ConnectedRouter history={history}>
            <Route path="/" render={props => <div>rendered</div>} />
          </ConnectedRouter>
        </Provider>
      ))

      expect(res.html()).toEqual("<div>rendered</div>")
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

      const res = mount((
        <Provider store={store}>
          <ConnectedRouter history={history}>
            <Switch>
              <Route path="/other" render={props => <div>other</div>} />
              <Route path="/" render={props => <Redirect to="/other" />} />
            </Switch>
          </ConnectedRouter>
        </Provider>
      ))

      const pathname = store.getState().router.location.pathname
      const render = res.html()

      expect(pathname).toEqual("/other")
      expect(render).toEqual("<div>other</div>")
    }

    expect(render).not.toThrow()
  })

  it('pushes', function () {
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

      const res = mount((
        <Provider store={store}>
          <ConnectedRouter history={history}>
            <Switch>
              <Route exact path="/other" render={props => <div>other</div>} />
              <Route exact path="/" render={props => <div>slash</div>} />
            </Switch>
          </ConnectedRouter>
        </Provider>
      ))

      const pathname = store.getState().router.location.pathname
      expect(res.containsMatchingElement(<div>slash</div>))
      // const render = res.html()

      expect(pathname).toEqual("/")
      // expect(render).toEqual("<div>slash</div>")

      store.actions.router.push('/other')
      console.log(res.containsMatchingElement(<div>other</div>))
    }

    expect(render).not.toThrow()
  })

  it('goes back', function () {
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

      const res = mount((
        <Provider store={store}>
          <ConnectedRouter history={history}>
            <Switch>
              <Route exact path="/other" render={props => <div>other</div>} />
              <Route exact path="/" render={props => <div>slash</div>} />
            </Switch>
          </ConnectedRouter>
        </Provider>
      ))

      const pathname = store.getState().router.location.pathname
      expect(res.containsMatchingElement(<div>slash</div>)).toBeTruthy()
      console.log(res.html())

      expect(pathname).toEqual("/")
      // expect(render).toEqual("<div>slash</div>")

      const routerActions = store.actions.router

      routerActions.push('/other')
      routerActions.goBack()
      routerActions.goForward()
      routerActions.go(0)
      routerActions.replace('/other')
      console.log(res.html())

      res.unmount()
    }

    expect(render).not.toThrow()
  })
})