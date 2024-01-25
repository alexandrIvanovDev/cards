import { FC } from 'react'

import { clsx } from 'clsx'

import s from './table-head.module.scss'

import { ArrowDownIcon } from '@/assets/icons/ArrowDown.tsx'
import { Table } from '@/components/ui/table'
import { Typography } from '@/components/ui/typography'
import { Order } from '@/services/cards.types.ts'

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

export const TableHead: FC<Props> = ({ columns, sort, setSort }) => {
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
    <Table.Head>
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
                <Typography variant={'subtitle2'}>{cell.label}</Typography>
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
