import { action, makeObservable, observable } from 'mobx'
import { DrowdownStore } from '../../Dropdown/model'
import type { MaskType } from '../../PhoneInput/ui/PhoneInput'

type PhoneInputStatus = null | 'success' | 'error' | 'disabled'

export class PhoneInputStore {
  status: PhoneInputStatus
  dropdown: DrowdownStore
  digits: string[]

  constructor(options: MaskType[]) {
    this.status = null
    this.dropdown = new DrowdownStore(options)
    this.digits = []

    makeObservable(this, {
      status: observable,
      digits: observable.ref,
      setStatus: action.bound,
      setDigits: action.bound,
    })
  }

  setStatus(status: PhoneInputStatus) {
    this.status = status
  }

  setDigits(digits: string[]) {
    this.digits = digits
  }

  destroy() {}
}
