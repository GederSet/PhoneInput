import React, { ChangeEvent, KeyboardEvent } from 'react'

import { MaskToken } from '@/shared/types/maskToken'

import PhoneNumber from '../../../PhoneNumber'
import s from '../PhoneInputDetail/PhoneInputDetail.module.scss'

type PhoneInputDigitsProps = {
  template: MaskToken[]
  initialDigits: string[]
  inputsRef: React.RefObject<Array<HTMLInputElement | null>>
  onKeyDown: (event: KeyboardEvent<HTMLInputElement>, index: number) => void
  onChange: (event: ChangeEvent<HTMLInputElement>, index: number) => void
}

const PhoneInputDigits: React.FC<PhoneInputDigitsProps> = ({
  template,
  initialDigits,
  inputsRef,
  onKeyDown,
  onChange,
}) => {
  let digitIndex = 0

  return (
    <>
      {template.map((item, index) => {
        if (item.type === 'number') {
          const currentIndex = digitIndex
          digitIndex += 1

          return (
            <PhoneNumber
              key={currentIndex}
              inputRef={el => {
                if (!inputsRef.current) return
                inputsRef.current[currentIndex] = el
              }}
              placeholder={item.value}
              defaultValue={initialDigits?.[currentIndex] ?? ''}
              onKeyDown={event => onKeyDown(event, currentIndex)}
              onChange={event => onChange(event, currentIndex)}
            />
          )
        }

        return (
          <div key={`sep-${index}`} className={s.root__separator}>
            {item.value}
          </div>
        )
      })}
    </>
  )
}

export default PhoneInputDigits
