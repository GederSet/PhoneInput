import { createContext, useContext } from 'react'
import { ILocalStore } from '../interfaces/ILocalStore'

export const createContextLocalStore = <
  T extends ILocalStore,
  A extends unknown[] = [],
>(
  Constructor: new (...args: A) => T,
) => {
  const Context = createContext<T | null>(null)

  const Provider = ({
    children,
    store,
  }: React.PropsWithChildren<{ store: T }>) => {
    return <Context.Provider value={store}>{children}</Context.Provider>
  }

  const useStore = () => {
    const context = useContext(Context)

    if (!context) {
      throw new Error(`${Constructor.name} not in Provider`)
    }

    return context
  }

  return {
    Provider,
    useStore,
  }
}
