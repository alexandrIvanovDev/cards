import { Columns } from '@/components/ui/table-head'

export const decksListTableHeader: Array<Columns> = [
  { fieldName: 'name', label: 'Name', sortable: true },
  { fieldName: 'cardsCount', label: 'Cards', sortable: true },
  { fieldName: 'updated', label: 'Last Updated', sortable: true },
  { fieldName: 'author.name', label: 'Created by', sortable: true },
  { fieldName: 'icons', label: '', sortable: false },
]
