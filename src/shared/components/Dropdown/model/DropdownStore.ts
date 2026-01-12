import numbersData from '@/app/api/mocks/numbersData.json'
import { MaskToken } from '@/shared/types/maskToken'
import { convertStringToArray } from '@/shared/utils/convertStringToArray'
import { action, computed, makeObservable, observable } from 'mobx'
import { MaskType } from '../../PhoneInput/ui/PhoneInput'

type PrivateFields = '_activeOption' | '_options' | '_template'

export class DrowdownStore {
  private _activeOption: MaskType
  private _options: MaskType[]
  private _template: MaskToken[]

  constructor() {
    this._options = numbersData.data.items
    this._activeOption = this._options[0]
    this._template = convertStringToArray(this._options[0].mask)

    makeObservable<this, PrivateFields>(this, {
      _options: observable.ref,
      _activeOption: observable,
      _template: observable.ref,

      getOptions: computed,
      getActiveOption: computed,
      getTemplate: computed,

      setOption: action.bound,
      setTemplate: action.bound,
      selectOption: action.bound,
    })
  }

  get getOptions() {
    return this._options
  }

  get getActiveOption() {
    return this._activeOption
  }

  get getTemplate() {
    return this._template
  }

  setOption(option: MaskType) {
    this._activeOption = option
  }

  setTemplate(templateString: string) {
    this._template = convertStringToArray(templateString)
  }

  selectOption(option: MaskType) {
    this.setOption(option)
    this.setTemplate(option.mask)
  }
}
