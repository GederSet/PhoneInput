import { validateInput } from '@/shared/utils/validateInput'
import cn from 'classnames'
import { useLocalStore } from 'mobx-react-lite'
import { ChangeEvent, forwardRef, KeyboardEvent } from 'react'
import { PhoneInputStore } from '../PhoneInput/model'
import s from './PhoneNumber.module.scss'

type PhoneNumberProps = {
  placeholder: string
  onKeyDown?: (event: KeyboardEvent<HTMLInputElement>) => void
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void
}

const PhoneNumber = forwardRef<HTMLInputElement, PhoneNumberProps>(
  ({ onKeyDown, onChange, placeholder }, ref) => {
    const { status } = useLocalStore(() => new PhoneInputStore())

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      validateInput(event)
      onChange?.(event)
    }

    return (
      <input
        ref={ref}
        className={cn(s.root, status && s[`root_${status}`])}
        placeholder={placeholder}
        onKeyDown={onKeyDown}
        onChange={handleChange}
        inputMode='numeric'
        disabled={status === 'disabled'}
      />
    )
  }
)

export default PhoneNumber
