import { useState } from 'react'

import type { Meta, StoryObj } from '@storybook/react'

import { Sort, TableHead } from './'

import { Table } from '@/components/ui/table'

const meta = {
  title: 'Components/TableHead',
  component: TableHead,
  tags: ['autodocs'],
} satisfies Meta<typeof TableHead>

export default meta
type Story = StoryObj<typeof meta>

const props = {
  columns: [
    { fieldName: 'name', label: 'Name', sortable: true },
    { fieldName: 'cardsCount', label: 'Cards', sortable: true },
    { fieldName: 'updated', label: 'Last Updated', sortable: true },
    { fieldName: 'author.name', label: 'Created by', sortable: true },
    { fieldName: 'icons', label: '', sortable: false },
  ],
}

// @ts-ignore
export const Default: Story = {
  render: args => {
    const [sort, setSort] = useState<Sort>({ field: 'updated', order: 'desc' })

    return (
      <Table.Root>
        <TableHead {...args} sort={sort} setSort={setSort} />
      </Table.Root>
    )
  },
  args: {
    ...props,
  },
}
