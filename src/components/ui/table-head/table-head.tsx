import { clsx } from 'clsx'
import { useTranslation } from 'react-i18next'

import s from './table-head.module.scss'

import { ArrowDownIcon } from '@/assets/icons/ArrowDown.tsx'
import { Table } from '@/components/ui/table'
import { Typography } from '@/components/ui/typography'
import { Order } from '@/feature/deck/services/deck.types.ts'

export type Columns = {
  fieldName: string
  label: string
  sortable?: boolean
}

export type Sort = {
  field: string
  order: Order
} | null

type Props = {
  columns: Array<Columns>
  sort?: Sort
  setSort?: (value: Sort) => void
}

export const TableHead = ({ columns, sort, setSort }: Props) => {
  const { t } = useTranslation()

  const handleSort = (field: string, sortable?: boolean) => {
    if (!setSort || !sortable) {
      return
    }

    if (sort?.field !== field) {
      return setSort({ field, order: 'asc' })
    }

    if (sort.order === 'desc') {
      return setSort(null)
    }

    return setSort({ field, order: sort.order === 'asc' ? 'desc' : 'asc' })
  }

  return (
    <Table.Head className={s.tableHeader}>
      <Table.Row>
        {columns.map(cell => {
          const classes = {
            headCell: clsx(s.headCell, !cell.sortable && s.notSortable),
            icon: clsx(s.icon, sort?.order === 'asc' && s.reversedIcon),
          }

          return (
            <Table.HeadCell
              className={classes.headCell}
              onClick={() => handleSort(cell.fieldName, cell.sortable)}
              key={cell.fieldName}
            >
              <div className={s.cell}>
                <Typography variant={'subtitle2'}>{t(cell.label)}</Typography>
                {sort && sort.field === cell.fieldName && (
                  <ArrowDownIcon className={classes.icon} />
                )}
              </div>
            </Table.HeadCell>
          )
        })}
      </Table.Row>
    </Table.Head>
  )
}
