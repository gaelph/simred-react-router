import * as React from 'react'
import { Router } from 'react-router'
import { connect } from 'react-simred'

import SimredReactContext from 'react-simred/lib/context'

export const createConnectedRouter = (nameInState) => {

  class ConnectedRouter extends React.Component {
    constructor(props) {
      super(props)

      this.state = {
        inTimeTravelling: false
      }

      this.handleLocationChange = (function (location, action) {
        // Dispatch onLocationChanged except when we're in time travelling
        if (!this.state.inTimeTravelling && props.onLocationChanged) {
          props.onLocationChanged(location, action)
        } else {
          this.setState({ inTimeTravelling: false })
        }
      }).bind(this)

      // Listen to history changes
      this.unlisten = props.history.listen(this.handleLocationChange)
      // Dispatch a location change action for the initial location
      // handleLocationChange(props.history.location, props.history.action)
    }

    static getDerivedStateFromProps(props, state) {

      const { location, history } = props
      if (!location || !history) return state

        const {
          pathname: pathnameInStore,
          search: searchInStore,
          hash: hashInStore
        } = location

        const {
          pathname: pathnameInHistory,
          search: searchInHistory,
          hash: hashInHistory
        } = history.location

        // If we do time travelling, the location in store is changed but location in history is not changed
        if (pathnameInHistory !== pathnameInStore || searchInHistory !== searchInStore || hashInHistory !== hashInStore) {
          state.inTimeTravelling = true
          // Update history's location to match store's location
          props.history.push({
            pathname: pathnameInStore,
            search: searchInStore,
            hash: hashInStore,
          })
        }

      return state
    }

    componentDidMount() {
      const { history } = this.props
      this.handleLocationChange(history.location, history.action)
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

    /* istanbul ignore if */
    if (ContextToUse == null) {
      throw new Error('Conext cannot be null')
    }

    return (
      <ContextToUse.Consumer>
        {ctx => ctx ? <ConnectedRouter store={ctx.store} {...props} /> : <></>}
      </ContextToUse.Consumer>
    )
  }

  return connect(mapStateToProps, mapActionsToProps)(ConnectedRouter)
}