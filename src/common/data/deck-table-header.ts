import { Columns } from '@/components/ui/table-head'

export const deckTableHeader: Array<Columns> = [
  { fieldName: 'question', label: 'Question', sortable: true },
  { fieldName: 'answer', label: 'Answer', sortable: true },
  { fieldName: 'updated', label: 'Last Updated', sortable: true },
  { fieldName: 'grade', label: 'Grade', sortable: true },
  { fieldName: 'controls', label: '', sortable: false },
]
