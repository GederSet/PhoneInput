import { action, makeObservable, observable } from 'mobx'
import { DrowdownStore } from '../../Dropdown/model'

type PhoneInputStatus = null | 'success' | 'error' | 'disabled'

export class PhoneInputStore {
  status: PhoneInputStatus
  dropdown = new DrowdownStore()

  constructor() {
    this.status = null

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
