import { formatPhoneByMask } from '@/shared/utils/formatPhoneByMask'
import { getInitialDigits } from '@/shared/utils/getInitialDigits'
import {
  ChangeEvent,
  KeyboardEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from 'react'

import { usePhoneInputStore } from '../components/PhoneInput/model'
import { PhoneInputType } from '../components/PhoneInput/ui/PhoneInput'

export const useActionsPhoneInput = ({
  masks,
  value,
  onChange,
  disabled,
}: PhoneInputType) => {
  const inputsRef = useRef<Array<HTMLInputElement | null>>([])
  const { dropdown, status, setStatus, digits, setDigits } =
    usePhoneInputStore()

  const { initialDigits, matchedOption } = useMemo(
    () => getInitialDigits(value, masks),
    [value, masks],
  )

  useEffect(() => {
    setDigits(initialDigits)
  }, [initialDigits, setDigits])

  useEffect(() => {
    if (disabled) {
      setStatus('disabled')
    } else if (status === 'disabled') {
      setStatus(null)
    }
  }, [disabled, status, setStatus])

  const emitChange = useCallback(
    (nextDigits: string[]) => {
      if (!onChange) {
        return
      }

      const rawDigits = nextDigits.join('')
      const normalizedDigits = rawDigits.replace(/\D/g, '')

      const { number: prefix, mask } = dropdown.activeOption
      const formattedValue = formatPhoneByMask(normalizedDigits, prefix, mask)

      onChange(formattedValue)
    },
    [onChange, dropdown],
  )

  useEffect(() => {
    if (dropdown.activeOption.key !== matchedOption.key) {
      dropdown.selectOption(matchedOption)
    }
  }, [dropdown, matchedOption, value])

  useEffect(() => {
    emitChange(initialDigits)
  }, [dropdown.activeOption, initialDigits, emitChange])

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

      const nextDigits = [...digits]
      nextDigits[index] = ''
      setDigits(nextDigits)
      emitChange(nextDigits)

      const prev = inputsRef.current[index - 1]
      if (prev) {
        prev.focus()
      }
    }

    if (key === 'Enter') {
      event.preventDefault()

      const template = dropdown.template
      const totalDigits = template.filter(item => item.type === 'number').length

      const filled = digits
        .slice(0, totalDigits)
        .filter(digit => digit !== '').length

      if (filled === totalDigits) {
        setStatus('success')
      } else {
        setStatus('error')
      }

      emitChange(digits)
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

    const nextDigits = [...digits]
    nextDigits[index] = newDigit
    setDigits(nextDigits)
    emitChange(nextDigits)

    const next = inputsRef.current[index + 1]
    if (next) {
      next.focus()
    }
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
