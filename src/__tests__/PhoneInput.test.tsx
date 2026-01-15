import { MaskType } from '@/shared/components/PhoneInput/ui/PhoneInput'
import PhoneInputDetail from '@/shared/components/PhoneInput/ui/PhoneInputDetail'
import '@testing-library/jest-dom'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import React from 'react'
import {
  PhoneInputStore,
  PhoneInputStoreProvider,
} from '../shared/components/PhoneInput/model'

const masks: MaskType[] = [
  {
    key: 'ru',
    name: 'Россия',
    flag: '🇷🇺',
    number: '+7',
    mask: '(***) - *** - ** - **',
  },
]

const renderWithStore = (
  ui: React.ReactElement,
  store: PhoneInputStore = new PhoneInputStore(masks),
) => {
  return render(
    <PhoneInputStoreProvider store={store}>{ui}</PhoneInputStoreProvider>,
  )
}

describe('PhoneInput', () => {
  test('вызывает onChange с форматированным значением при монтировании', async () => {
    const handleChange = jest.fn()

    renderWithStore(
      <PhoneInputDetail
        masks={masks}
        value="+71234567890"
        onChange={handleChange}
      />,
    )

    await waitFor(() => {
      expect(handleChange).toHaveBeenCalled()
    })

    const lastCall =
      handleChange.mock.calls[handleChange.mock.calls.length - 1]?.[0]

    expect(lastCall).toBe('+7 (123) - 456 - 78 - 90')
  })

  test('устанавливает статус success при Enter, если все инпуты заполнены', async () => {
    const store = new PhoneInputStore(masks)

    renderWithStore(
      <PhoneInputDetail
        masks={masks}
        value="+71234567890"
        onChange={jest.fn()}
      />,
      store,
    )

    const inputs = screen.getAllByRole('textbox')
    const lastInput = inputs[inputs.length - 1]

    fireEvent.keyDown(lastInput, { key: 'Enter', code: 'Enter', charCode: 13 })

    await waitFor(() => {
      expect(
        screen.getByText('Номер телефона введен верно'),
      ).toBeInTheDocument()
    })
  })

  test('устанавливает статус error при Enter, если не все инпуты заполнены', async () => {
    const store = new PhoneInputStore(masks)

    renderWithStore(
      <PhoneInputDetail masks={masks} value="+71" onChange={jest.fn()} />,
      store,
    )

    const inputs = screen.getAllByRole('textbox')
    const lastInput = inputs[inputs.length - 1]

    fireEvent.keyDown(lastInput, { key: 'Enter', code: 'Enter', charCode: 13 })

    await waitFor(() => {
      expect(
        screen.getByText('Неправильный номер телефона'),
      ).toBeInTheDocument()
    })
  })
})
