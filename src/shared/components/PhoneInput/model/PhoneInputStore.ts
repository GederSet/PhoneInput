import { makeObservable, observable } from 'mobx'
import { DrowdownStore } from '../../Dropdown/model'

type PhoneInputStatus = null | 'success' | 'error' | 'disabled'

export class PhoneInputStore {
  readonly status: PhoneInputStatus
  dropdown = new DrowdownStore()

  constructor() {
    this.status = null

    makeObservable(this, {
      status: observable,
    })
  }

  destroy() {}
}
