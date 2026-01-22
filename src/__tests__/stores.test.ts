import { DrowdownStore } from '@/shared/components/Dropdown/model'
import { PhoneInputStore } from '@/shared/components/PhoneInput/model'
import { OpenStore } from '@/shared/store/OpenStore'

const phoneInputMasks = [
  {
    key: 'ru',
    name: 'Россия',
    flag: '🇷🇺',
    number: '+7',
    mask: '(***) - *** - ** - **',
  },
] as const

describe('PhoneInputStore', () => {
  test('инициализируется со статусом null и dropdown-стором', () => {
    const store = new PhoneInputStore([...phoneInputMasks])

    expect(store.status).toBeNull()
    expect(store.dropdown).toBeInstanceOf(DrowdownStore)
    expect(store.digits).toEqual([])
  })

  test('обновляет статус через setStatus', () => {
    const store = new PhoneInputStore([...phoneInputMasks])

    store.setStatus('success')
    expect(store.status).toBe('success')

    store.setStatus('error')
    expect(store.status).toBe('error')
  })

  test('обновляет digits через setDigits', () => {
    const store = new PhoneInputStore([...phoneInputMasks])

    expect(store.digits).toEqual([])

    const nextDigits = ['1', '2', '3']
    store.setDigits(nextDigits)

    expect(store.digits).toEqual(nextDigits)
  })
})

describe('DrowdownStore', () => {
  test('инициализируется опциями из numbersData и первой активной опцией', () => {
    const options = [
      {
        key: 'ru',
        name: 'Россия',
        flag: '🇷🇺',
        number: '+7',
        mask: '(***) - *** - ** - **',
      },
      {
        key: 'us',
        name: 'США',
        flag: '🇺🇸',
        number: '+1',
        mask: '(***) - *** - ****',
      },
    ]

    const store = new DrowdownStore(options)

    expect(store.options).toHaveLength(options.length)
    expect(store.activeOption).toEqual(options[0])
  })

  test('selectOption переключает активную опцию и шаблон маски', () => {
    const options = [
      {
        key: 'ru',
        name: 'Россия',
        flag: '🇷🇺',
        number: '+7',
        mask: '(***) - *** - ** - **',
      },
      {
        key: 'us',
        name: 'США',
        flag: '🇺🇸',
        number: '+1',
        mask: '(***) - *** - ****',
      },
    ]

    const store = new DrowdownStore(options)

    const initialTemplate = store.template

    const nextOption = options[1]
    store.selectOption(nextOption)

    expect(store.activeOption).toEqual(nextOption)
    expect(store.template).not.toEqual(initialTemplate)
  })
})

describe('OpenStore', () => {
  test('управляет флагом isOpen и переключает его', () => {
    const store = new OpenStore()

    expect(store.isOpen).toBe(false)

    store.open()
    expect(store.isOpen).toBe(true)

    store.close()
    expect(store.isOpen).toBe(false)

    store.toggle()
    expect(store.isOpen).toBe(true)

    store.toggle()
    expect(store.isOpen).toBe(false)
  })
})
