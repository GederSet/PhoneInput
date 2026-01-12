import { useLocalStore } from '@/shared/hooks/useLocalStore'
import { ActiveStore } from '@/shared/store/ActiveStore'
import { OpenStore } from '@/shared/store/OpenStore'
import cn from 'classnames'
import { observer } from 'mobx-react-lite'
import React from 'react'
import ArrowIcon from '../../Icons/ArrowIcon'
import { usePhoneInputStore } from '../../PhoneInput/model'
import { MaskType } from '../../PhoneInput/ui/PhoneInput'
import s from './Dropdown.module.scss'

type DropdownProps = {
  options: MaskType[]
}

const Dropdown: React.FC<DropdownProps> = ({ options }) => {
  const { dropdown, status } = usePhoneInputStore()

  const openStore = useLocalStore(() => new OpenStore())
  const activeStore = useLocalStore(() => new ActiveStore())

  const dropdownRef = React.useRef<HTMLDivElement | null>(null)

  const handleOpen = () => {
    openStore.toggle()
    activeStore.open()
  }

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!dropdownRef.current) return

      if (!dropdownRef.current.contains(event.target as Node)) {
        openStore.close()
        activeStore.close()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div className={s.root} ref={dropdownRef}>
      <div
        onClick={handleOpen}
        className={cn(
          s.root__box,
          activeStore.isActive && s.root__box_active,
          status && s[`root__box_${status}`]
        )}
      >
        <div className={s.root__prefix}>
          {dropdown.getActiveOption.flag} {dropdown.getActiveOption.number}
        </div>
        <div
          className={cn(
            s.root__arrow,
            openStore.isOpen && s.root__arrow_rotate
          )}
        >
          <ArrowIcon />
        </div>
      </div>
      <div
        className={cn(s.root__shell, openStore.isOpen && s.root__shell_open)}
      >
        <div className={s.root__wrapper}>
          <div className={s.root__body}>
            {options.map((option) => {
              return (
                <div
                  key={option.key}
                  onClick={() => dropdown.selectOption(option)}
                  className={s.root__item}
                >
                  {option.flag} {option.number} <span>{option.name}</span>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default observer(Dropdown)
