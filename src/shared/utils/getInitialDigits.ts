import type { MaskType } from '../components/PhoneInput/ui/PhoneInput'
import { convertStringToArray } from './convertStringToArray'
import { sanitizeValue } from './sanitizeValue'

export const getInitialDigits = (
  value: string,
  options: MaskType[]
): { initialDigits: string[]; matchedOption: MaskType } => {
  const sanitizedValue = sanitizeValue(value)

  let matchedOption = options[0]
  let matchedPrefix = ''

  options.forEach((option) => {
    const { number } = option

    if (
      sanitizedValue.startsWith(number) &&
      number.length > matchedPrefix.length
    ) {
      matchedOption = option
      matchedPrefix = number
    }
  })

  const localDigits = sanitizedValue
    .slice(matchedPrefix.length)
    .replace(/\D/g, '')

  const template = convertStringToArray(matchedOption.mask)
  const digitSlots = template.filter((token) => token.type === 'number').length
  const normalizedDigits = localDigits.slice(0, digitSlots)
  const initialDigits = normalizedDigits.split('')

  return { initialDigits, matchedOption }
}
