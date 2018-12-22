import * as React from 'react'
import { Router } from 'react-router'
import { connect } from 'react-simred'

import SimredReactContext from 'react-simred/lib/context'

export const createConnectedRouter = (nameInState) => {

  class ConnectedRouter extends React.Component {
    constructor(props) {
      super(props)

      this.inTimeTravelling = false

      const { history, store } = props

      store.subscribe((state) => {
        const routerState = state[nameInState]

        const {
          pathname: pathnameInStore,
          search: searchInStore,
          hash: hashInStore
        } = routerState.location
        
        const {
          pathname: pathnameInHistory,
          search: searchInHistory,
          hash: hashInHistory
        } = history.location

        // If we do time travelling, the location in store is changed but location in history is not changed
        if (pathnameInHistory !== pathnameInStore || searchInHistory !== searchInStore || hashInHistory !== hashInStore) {
          this.inTimeTravelling = true
          // Update history's location to match store's location
          props.history.push({
            pathname: pathnameInStore,
            search: searchInStore,
            hash: hashInStore,
          })
        }
      })

      const handleLocationChange = (location, action) => {
        // Dispatch onLocationChanged except when we're in time travelling
        if (!this.inTimeTravelling) {
          props.onLocationChanged(location, action)
        } else {
          this.inTimeTravelling = false
        }
      }

      // Listen to history changes
      this.unlisten = props.history.listen(handleLocationChange)
      // Dispatch a location change action for the initial location
      handleLocationChange(props.history.location, props.history.action)
    }

    componentWillUnmount() {
      this.unlisten()
      // this.unsubscribe()
    }

    render() {
      const { history, children } = this.props
      
      return (
        <Router history={history}>
          {children}
        </Router>
      )
    }
  }

  const mapStateToProps = (state) => {
    const routerState = state[nameInState]

    const { location, action } = routerState

    return { location, action }
  }

  const mapActionsToProps = (actions) => {
    const { locationChange } = actions[nameInState]

    return { onLocationChanged: locationChange }
  }

  const ConnectedRouterWithContext = (props) => {
    const ContextToUse = props.context || SimredReactContext

    if (ContextToUse == null) {
      throw new Error('Conext cannot be null')
    }

    return (
      <ContextToUse.Consumer>
        {({ store }) => <ConnectedRouter store={store} {...props} />}
      </ContextToUse.Consumer>
    )
  }

  return connect(mapStateToProps, mapActionsToProps)(ConnectedRouterWithContext)
}