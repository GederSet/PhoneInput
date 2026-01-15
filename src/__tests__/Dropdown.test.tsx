import Dropdown from '@/shared/components/Dropdown/ui'
import { MaskType } from '@/shared/components/PhoneInput/ui/PhoneInput'
import '@testing-library/jest-dom'
import { fireEvent, render } from '@testing-library/react'

const masks: MaskType[] = [
  {
    key: 'ru',
    name: 'Россия',
    flag: '🇷🇺',
    number: '+7',
    mask: '(***) - *** - ** - **',
  },
]

describe('Dropdown', () => {
  test('открывает список опций при клике по боксу', () => {
    const handleSelect = jest.fn()

    const { container } = render(
      <Dropdown
        options={masks}
        activeOption={masks[0]}
        status={null}
        onSelect={handleSelect}
      />,
    )

    const shell = container.querySelector('.root__shell')
    expect(shell).not.toHaveClass('root__shell_open')

    const box = container.querySelector('.root__box') as HTMLElement
    expect(box).toBeInTheDocument()

    fireEvent.click(box)
    expect(shell).toHaveClass('root__shell_open')

    const firstItem = container.querySelector('.root__item') as HTMLElement
    expect(firstItem).toBeInTheDocument()

    fireEvent.click(firstItem)
    expect(handleSelect).toHaveBeenCalledWith(masks[0])
    expect(shell).not.toHaveClass('root__shell_open')
  })
})
