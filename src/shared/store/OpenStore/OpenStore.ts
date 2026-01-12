import { action, makeObservable, observable } from 'mobx'

export class OpenStore {
  isOpen: boolean

  constructor(defaultValue = false) {
    this.isOpen = defaultValue

    makeObservable(this, {
      isOpen: observable,
      open: action.bound,
      close: action.bound,
      toggle: action.bound,
    })
  }

  open() {
    this.isOpen = true
  }

  close() {
    this.isOpen = false
  }

  toggle() {
    this.isOpen = !this.isOpen
  }

  destroy() {}
}
