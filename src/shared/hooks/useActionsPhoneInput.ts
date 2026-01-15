import { formatPhoneByMask } from '@/shared/utils/formatPhoneByMask'
import { getInitialDigits } from '@/shared/utils/getInitialDigits'
import {
  ChangeEvent,
  KeyboardEvent,
  useCallback,
  useEffect,
  useRef,
} from 'react'

import { usePhoneInputStore } from '../components/PhoneInput/model'
import { PhoneInputType } from '../components/PhoneInput/ui/PhoneInput'

export const useActionsPhoneInput = ({
  masks,
  value,
  onChange,
}: PhoneInputType) => {
  const inputsRef = useRef<Array<HTMLInputElement | null>>([])
  const { dropdown, status, setStatus } = usePhoneInputStore()

  const { initialDigits, matchedOption } = getInitialDigits(value, masks)

  const emitChange = useCallback(() => {
    if (!onChange) {
      return
    }

    const rawDigits = inputsRef.current
      .map(input => input?.value ?? '')
      .join('')
    const digits = rawDigits.replace(/\D/g, '')

    const { number: prefix, mask } = dropdown.activeOption
    const formattedValue = formatPhoneByMask(digits, prefix, mask)

    onChange(formattedValue)
  }, [onChange, dropdown])

  useEffect(() => {
    if (dropdown.activeOption.key !== matchedOption.key) {
      dropdown.selectOption(matchedOption)
    }

    emitChange()
  }, [dropdown, matchedOption, value, emitChange])

  const handleKeyDown = (
    event: KeyboardEvent<HTMLInputElement>,
    index: number,
  ) => {
    const { key } = event

    if (key === 'ArrowRight') {
      event.preventDefault()
      const next = inputsRef.current[index + 1]
      if (next) {
        next.focus()
      }
    }

    if (key === 'ArrowLeft') {
      event.preventDefault()
      const prev = inputsRef.current[index - 1]
      if (prev) {
        prev.focus()
      }
    }

    if (key === 'Backspace') {
      event.preventDefault()
      const current = event.currentTarget

      if (current.value !== '') {
        current.value = ''
      }

      const prev = inputsRef.current[index - 1]
      if (prev) {
        prev.focus()
      }

      emitChange()
    }

    if (key === 'Enter') {
      event.preventDefault()

      const template = dropdown.template
      const totalDigits = template.filter(item => item.type === 'number').length

      const filled = inputsRef.current
        .slice(0, totalDigits)
        .filter(input => input && input.value !== '').length

      if (filled === totalDigits) {
        setStatus('success')
      } else {
        setStatus('error')
      }

      emitChange()
    }
  }

  const handleChange = (
    event: ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const current = event.currentTarget
    const { value, selectionStart } = current

    if (!value) {
      return
    }

    const pos =
      typeof selectionStart === 'number' && selectionStart > 0
        ? selectionStart - 1
        : value.length - 1

    const newDigit = value[pos]

    if (!/\d/.test(newDigit)) {
      return
    }

    current.value = newDigit

    const next = inputsRef.current[index + 1]
    if (next) {
      next.focus()
    }

    emitChange()
  }

  return {
    inputsRef,
    dropdown,
    status,
    initialDigits,
    handleKeyDown,
    handleChange,
  }
}
