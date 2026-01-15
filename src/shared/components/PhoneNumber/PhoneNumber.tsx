import { validateInput } from '@/shared/utils/validateInput'
import cn from 'classnames'
import { ChangeEvent, KeyboardEvent, Ref } from 'react'
import { usePhoneInputStore } from '../PhoneInput/model'
import s from './PhoneNumber.module.scss'

type PhoneNumberProps = {
  placeholder: string
  inputRef?: Ref<HTMLInputElement>
  onKeyDown?: (event: KeyboardEvent<HTMLInputElement>) => void
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void
  defaultValue?: string
}

const PhoneNumber: React.FC<PhoneNumberProps> = ({
  inputRef,
  onKeyDown,
  onChange,
  placeholder,
  defaultValue,
}) => {
  const { status } = usePhoneInputStore()

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    validateInput(event)
    onChange?.(event)
  }

  return (
    <input
      ref={inputRef}
      className={cn(s.root, status ? s[`root_${status}`] : undefined)}
      placeholder={placeholder}
      defaultValue={defaultValue}
      onKeyDown={onKeyDown}
      onChange={handleChange}
      inputMode="numeric"
      disabled={status === 'disabled'}
    />
  )
}

export default PhoneNumber
