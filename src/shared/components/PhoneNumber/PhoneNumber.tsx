import { validateInput } from '@/shared/utils/validateInput'
import cn from 'classnames'
import { ChangeEvent, forwardRef, KeyboardEvent } from 'react'
import { usePhoneInputStore } from '../PhoneInput/model'
import s from './PhoneNumber.module.scss'

type PhoneNumberProps = {
  placeholder: string
  onKeyDown?: (event: KeyboardEvent<HTMLInputElement>) => void
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void
  defaultValue?: string
}

const PhoneNumber = forwardRef<HTMLInputElement, PhoneNumberProps>(
  ({ onKeyDown, onChange, placeholder, defaultValue }, ref) => {
    const { status } = usePhoneInputStore()

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      validateInput(event)
      onChange?.(event)
    }

    return (
      <input
        ref={ref}
        className={cn(s.root, status && s[`root_${status}`])}
        placeholder={placeholder}
        defaultValue={defaultValue}
        onKeyDown={onKeyDown}
        onChange={handleChange}
        inputMode='numeric'
        disabled={status === 'disabled'}
      />
    )
  }
)

export default PhoneNumber
