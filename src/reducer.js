import { createReducer } from 'simred'

const reducerFunctions = (history) => {
  const locationChange = () => (location, action) => {
    return { location, action }
  }

  const callHistoryMethod = (state) => (method, ...args) => {
    history[method](...args)

    return state
  }

  const push = (state) => (...args) => callHistoryMethod(state)('push', ...args)
  const replace = (state) => (...args) => callHistoryMethod(state)('replace', ...args)
  const go = (state) => (...args) => callHistoryMethod(state)('go', ...args)
  const goBack = (state) => (...args) => callHistoryMethod(state)('goBack', ...args)
  const goForward = (state) => (...args) => callHistoryMethod(state)('goForward', ...args)

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