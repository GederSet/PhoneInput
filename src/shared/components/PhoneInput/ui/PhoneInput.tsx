import { useLocalStore } from '@/shared/hooks/useLocalStore'
import React from 'react'
import { PhoneInputStore, PhoneInputStoreProvider } from '../model'
import PhoneInputDetail from './PhoneInputDetail/PhoneInputDetail'

export type MaskType = {
  key: string
  name: string
  flag: string
  number: string
  mask: string
}

export type PhoneInputType = {
  masks: MaskType[]
  value: string
  onChange?: (value: string) => void
}

const PhoneInput: React.FC<PhoneInputType> = ({ masks, value, onChange }) => {
  const store = useLocalStore(() => new PhoneInputStore(masks))

  return (
    <PhoneInputStoreProvider store={store}>
      <PhoneInputDetail masks={masks} value={value} onChange={onChange} />
    </PhoneInputStoreProvider>
  )
}

export default PhoneInput
