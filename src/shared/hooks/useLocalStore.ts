import * as React from 'react'
import { ILocalStore } from '../interfaces/ILocalStore'

export const useLocalStore = <S extends ILocalStore = any>(
  creator: () => S,
  effect?: any
): S => {
  const isFirstRender = React.useRef(true)
  const [store, setStore] = React.useState(creator)

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

    setStore((prevStore) => {
      prevStore.destroy()

      return creator()
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [effect])

  return store
}
