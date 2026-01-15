import React from 'react'

import { ErrorIcon, SuccessIcon } from '../../../Icons'
import s from '../PhoneInputDetail/PhoneInputDetail.module.scss'

type Status = null | 'success' | 'error' | 'disabled'

type PhoneInputStatusProps = {
  status: Status
}

const PhoneInputStatus: React.FC<PhoneInputStatusProps> = ({ status }) => {
  if (!status || status === 'disabled') {
    return null
  }

  return (
    <div className={s.root__rows}>
      {status === 'success' ? <SuccessIcon /> : <ErrorIcon />}
      <div className={s.root__notify}>
        {status === 'success'
          ? 'Номер телефона введен верно'
          : 'Неправильный номер телефона'}
      </div>
    </div>
  )
}

export default PhoneInputStatus
