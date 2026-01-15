import { ChangeEvent } from 'react'

export function validateInput(event: ChangeEvent<HTMLInputElement>) {
  const onlyDigits = event.target.value.replace(/\D/g, '')
  event.target.value = onlyDigits
}
