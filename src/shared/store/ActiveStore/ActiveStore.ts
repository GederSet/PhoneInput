import { action, makeObservable, observable } from 'mobx'

export class ActiveStore {
  isActive: boolean

  constructor(defaultValue = false) {
    this.isActive = defaultValue

    makeObservable(this, {
      isActive: observable,
      open: action.bound,
      close: action.bound,
    })
  }

  open() {
    this.isActive = true
  }

  close() {
    this.isActive = false
  }

  destroy() {}
}
