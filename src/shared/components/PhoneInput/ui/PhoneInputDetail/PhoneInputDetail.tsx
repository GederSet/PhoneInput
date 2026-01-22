import { observer } from 'mobx-react-lite'
import React from 'react'

import { useActionsPhoneInput } from '@/shared/hooks/useActionsPhoneInput'
import Dropdown from '../../../Dropdown/ui'
import { PhoneInputType } from '../PhoneInput'
import PhoneInputDigits from '../PhoneInputDigits/PhoneInputDigits'
import PhoneInputStatus from '../PhoneInputStatus/PhoneInputStatus'
import s from './PhoneInputDetail.module.scss'

const PhoneInputDetail: React.FC<PhoneInputType> = props => {
  const { masks } = props

  const {
    inputsRef,
    dropdown,
    status,
    initialDigits,
    handleKeyDown,
    handleChange,
  } = useActionsPhoneInput(props)

  const template = dropdown.template

  return (
    <div className={s?.root}>
      <h2 className={s?.root__title}>Введите номер телефона</h2>
      <div className={s?.root__body}>
        <Dropdown
          options={masks}
          activeOption={dropdown.activeOption}
          status={status}
          onSelect={dropdown.selectOption}
        />
        <PhoneInputDigits
          template={template}
          initialDigits={initialDigits}
          inputsRef={inputsRef}
          onKeyDown={handleKeyDown}
          onChange={handleChange}
        />
      </div>
      <PhoneInputStatus status={status} />
    </div>
  )
}

export default observer(PhoneInputDetail)
