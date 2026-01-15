import { createContextLocalStore } from '@/shared/utils/createContextLocalStore'
import { PhoneInputStore } from './PhoneInputStore'

const { Provider, useStore } = createContextLocalStore(PhoneInputStore)

export {
  PhoneInputStore,
  Provider as PhoneInputStoreProvider,
  useStore as usePhoneInputStore,
}
