import { Sort } from '@/components/ui/table-head/table-head.tsx'

export const getSortedString = (sort: Sort) => {
  if (sort?.field && sort.order) {
    return `${sort.field}-${sort.order}`
  } else {
    return null
  }
}
