export const formatPhoneByMask = (
  digits: string,
  prefix: string,
  mask: string
): string => {
  if (!digits.length) {
    return prefix
  }

  let result = ''
  let digitIndex = 0

  for (const char of mask) {
    if (char === '*') {
      if (digitIndex < digits.length) {
        result += digits[digitIndex]
        digitIndex += 1
      } else {
        break
      }
    } else {
      result += char
    }
  }

  const localFormatted = result

  return localFormatted ? `${prefix} ${localFormatted}` : prefix
}
