import {
  PhoneInputStore,
  PhoneInputStoreProvider,
} from '@/shared/components/PhoneInput/model'
import '@/shared/styles/index.scss'
import PhoneInput from '../shared/components/PhoneInput/ui'

const App = () => {
  const store = new PhoneInputStore()
  const options = store.dropdown.getOptions

  const disabledStore = new PhoneInputStore()
  const disabledOptions = disabledStore.dropdown.getOptions
  disabledStore.setStatus('disabled')

  return (
    <>
      <PhoneInputStoreProvider store={store}>
        <PhoneInput
          masks={options}
          value='+7 800 555 35 - 35'
          onChange={console.log}
        />
      </PhoneInputStoreProvider>
      <PhoneInputStoreProvider store={disabledStore}>
        <PhoneInput
          masks={disabledOptions}
          value='+7 800 555 35 - 35'
          onChange={console.log}
        />
      </PhoneInputStoreProvider>
    </>
  )
}

export default App
