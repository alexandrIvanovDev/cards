// @ts-ignore
import range from 'lodash.range'

export const returnPaginationRange = (
  totalPages: number,
  currentPage: number,
  siblings: number
) => {
  let totalPageNumInArray = 7 + siblings

  if (totalPageNumInArray >= totalPages) {
    return range(1, totalPages + 1)
  }

  const leftSiblingsIndex = Math.max(currentPage - siblings, 1)
  const rightSiblingsIndex = Math.min(currentPage + siblings, totalPages)
  const showLeftDots = leftSiblingsIndex > 2
  const showRightDots = rightSiblingsIndex < totalPages - 2

  if (!showLeftDots && showRightDots) {
    const leftItemsCount = 3 + 2 * siblings
    const leftRange = range(1, leftItemsCount + 1)

    return [...leftRange, '...', totalPages]
  } else if (showLeftDots && !showRightDots) {
    const rightItemsCount = 3 + 2 * siblings
    const rightRange = range(totalPages - rightItemsCount + 1, totalPages + 1)

    return [1, '...', ...rightRange]
  } else {
    const middleRange = range(leftSiblingsIndex, rightSiblingsIndex + 1)

    return [1, '...', ...middleRange, '...', totalPages]
  }
}
