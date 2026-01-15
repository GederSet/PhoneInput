import { MaskToken } from '../types/maskToken'

export function convertStringToArray(mask: string) {
  let i = 1
  const resultArray: MaskToken[] = []
  const filteredString = mask.split(' ').join('').split('')

  filteredString.forEach(char => {
    if (char === '*') {
      const label = String(i % 10)
      resultArray.push({
        type: 'number',
        value: label,
      })
      i++
    } else {
      resultArray.push({
        type: 'string',
        value: char,
      })
    }
  })

  return resultArray
}
