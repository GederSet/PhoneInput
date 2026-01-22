import * as React from 'react'
import { ILocalStore } from '../interfaces/ILocalStore'

export const useLocalStore = <S extends ILocalStore, E = unknown>(
  creator: () => S,
  effect?: E,
): S => {
  const isFirstRender = React.useRef<boolean>(true)
  const [store, setStore] = React.useState<S>(() => creator())

  React.useEffect(() => {
    return () => {
      store.destroy()
    }
  }, [store])

  React.useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false

      return
    }

    setStore(prevStore => {
      prevStore.destroy()

      return creator()
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [effect])

  return store
}
