import { action, makeObservable, observable } from 'mobx'
import { DrowdownStore } from '../../Dropdown/model'
import type { MaskType } from '../../PhoneInput/ui/PhoneInput'

type PhoneInputStatus = null | 'success' | 'error' | 'disabled'

export class PhoneInputStore {
  status: PhoneInputStatus
  dropdown: DrowdownStore

  constructor(options: MaskType[]) {
    this.status = null
    this.dropdown = new DrowdownStore(options)

    makeObservable(this, {
      status: observable,
      setStatus: action.bound,
    })
  }

  setStatus(status: PhoneInputStatus) {
    this.status = status
  }

  destroy() {}
}
