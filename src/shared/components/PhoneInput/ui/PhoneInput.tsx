import { observer, useLocalStore } from 'mobx-react-lite'
import React, { ChangeEvent, KeyboardEvent, useRef } from 'react'
import Dropdown from '../../Dropdown/ui'
import ErrorIcon from '../../Icons/ErrorIcon'
import SuccessIcon from '../../Icons/SuccessIcon'
import PhoneNumber from '../../PhoneNumber'
import { PhoneInputStore, usePhoneInputStore } from '../model'
import s from './PhoneInput.module.scss'

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
}

const PhoneInput: React.FC<PhoneInputType> = ({ masks, value }) => {
  const inputsRef = useRef<Array<HTMLInputElement | null>>([])
  const { dropdown } = usePhoneInputStore()
  const { status } = useLocalStore(() => new PhoneInputStore())

  const handleKeyDown = (
    event: KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    const { key } = event

    // if (/^\d$/.test(key)) {
    //   const current = event.currentTarget

    //   if (current.value !== '') {
    //     event.preventDefault()
    //     current.value = key

    //     const next = inputsRef.current[index + 1]
    //     if (next) {
    //       next.focus()
    //     }

    //     return
    //   }
    // }

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
    }
  }

  const handleChange = (
    event: ChangeEvent<HTMLInputElement>,
    index: number
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
  }

  const renderPhone = () => {
    let digitIndex = 0
    const template = dropdown.getTemplate

    return template.map((item, index) => {
      if (item.type === 'number') {
        const currentIndex = digitIndex
        digitIndex += 1

        return (
          <PhoneNumber
            key={currentIndex}
            ref={(el) => {
              inputsRef.current[currentIndex] = el
            }}
            placeholder={item.value}
            onKeyDown={(event) => handleKeyDown(event, currentIndex)}
            onChange={(event) => handleChange(event, currentIndex)}
          />
        )
      }

      return (
        <div key={`sep-${index}`} className={s.root__separator}>
          {item.value}
        </div>
      )
    })
  }

  return (
    <div className={s.root}>
      <h2 className={s.root__title}>Введите номер телефона</h2>
      <div className={s.root__body}>
        <Dropdown options={masks} />
        {renderPhone()}
      </div>
      {status && status !== 'disabled' && (
        <div className={s.root__rows}>
          {status === 'success' ? <SuccessIcon /> : <ErrorIcon />}
          <div className={s.root__notify}>
            {status === 'success'
              ? 'Номер телефона введен верно'
              : 'Неправильный номер телефона'}
          </div>
        </div>
      )}
    </div>
  )
}

export default observer(PhoneInput)
