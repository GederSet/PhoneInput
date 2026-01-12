import {
  PhoneInputStore,
  PhoneInputStoreProvider,
} from '@/shared/components/PhoneInput/model'
import '@/shared/styles/index.scss'
import PhoneInput from '../shared/components/PhoneInput/ui'
//test
const App = () => {
  const store = new PhoneInputStore()
  const options = store.dropdown.getOptions

  return (
    <>
      <PhoneInputStoreProvider store={store}>
        <PhoneInput masks={options} value='+71234567890' />
      </PhoneInputStoreProvider>
    </>
  )
}

export default App
