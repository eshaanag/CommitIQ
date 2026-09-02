type TextWidthMeasurer = (text: string) => number

const ELLIPSIS = '...'

export function fitTextToWidth(
  text: string,
  maxWidth: number,
  measureWidth: TextWidthMeasurer
): string {
  if (!text || maxWidth === Number.POSITIVE_INFINITY) return text
  if (!Number.isFinite(maxWidth) || maxWidth <= 0) return ''

  const textWidth = measureWidth(text)
  if (Number.isFinite(textWidth) && textWidth <= maxWidth) return text

  const ellipsisWidth = measureWidth(ELLIPSIS)
  if (!Number.isFinite(ellipsisWidth) || ellipsisWidth > maxWidth) return ''

  const characters = Array.from(text)
  let lowerBound = 0
  let upperBound = characters.length

  while (lowerBound < upperBound) {
    const midpoint = Math.ceil((lowerBound + upperBound) / 2)
    const candidate = `${characters.slice(0, midpoint).join('')}${ELLIPSIS}`
    const candidateWidth = measureWidth(candidate)

    if (Number.isFinite(candidateWidth) && candidateWidth <= maxWidth) {
      lowerBound = midpoint
    } else {
      upperBound = midpoint - 1
    }
  }

  return `${characters.slice(0, lowerBound).join('')}${ELLIPSIS}`
}
