import { createReducer } from 'simred'

const reducerFunctions = (history) => {
  const locationChange = (state, actions, location, action) => {
    return { location, action }
  }

  const callHistoryMethod = (state, actions, method, ...args) => {
    history[method](...args)

    return state
  }

  const push = (state, actions, ...args) => callHistoryMethod(state, actions, 'push', ...args)
  const replace = (state, actions, ...args) => callHistoryMethod(state, actions, 'replace', ...args)
  const go = (state, actions, ...args) => callHistoryMethod(state, actions, 'go', ...args)
  const goBack = (state, actions, ...args) => callHistoryMethod(state, actions, 'goBack', ...args)
  const goForward = (state, actions, ...args) => callHistoryMethod(state, actions, 'goForward', ...args)

  return {
    locationChange,
    callHistoryMethod,
    push,
    replace,
    go,
    goBack,
    goForward
  }
}

export const createRouterReducer = (history) => createReducer(
  {
    ...reducerFunctions(history)
  },
  {
    location: history.location,
    action: history.action
  }
)