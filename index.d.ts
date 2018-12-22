import {
  createBrowserHistory as CreateBrowserHistory ,
  createHashHistory as CreateHashHistory,
  createMemoryHistory as CreateMemoryHistory,
  createLocation as CreateLocation,
  locationsAreEqual as LocationsAreEqual,
  parsePath as ParsePath,
  createPath as CreatePath,
  History
} from 'history'

import * as React from 'react'

declare namespace SimredReactRouter {
  class ConnectedReactRouter extends React.Component<{ history: History }> { }

  export const createBrowserHistory: typeof CreateBrowserHistory;
  export const createHashHistory: typeof CreateHashHistory;
  export const createMemoryHistory: typeof CreateMemoryHistory;
  export const createLocation: typeof CreateLocation;
  export const locationsAreEqual: typeof LocationsAreEqual;
  export const parsePath: typeof ParsePath;
  export const createPath: typeof CreatePath;
  export const createConnectedRouter: (nameInState: string) => typeof ConnectedReactRouter
  export const createRouterReducer: (history: History) => any
}

export = SimredReactRouter
