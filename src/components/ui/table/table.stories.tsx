import type { Meta, StoryObj } from '@storybook/react'

import { Table } from './'

const meta = {
  title: 'Components/Table',
  component: Table.Root,
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof Table.Root>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: (
      <>
        <Table.Head>
          <Table.Row>
            <Table.HeadCell>Name</Table.HeadCell>
            <Table.HeadCell>Cards</Table.HeadCell>
            <Table.HeadCell>Last updated</Table.HeadCell>
            <Table.HeadCell>Created by</Table.HeadCell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          <Table.Row>
            <Table.Cell>Pack name</Table.Cell>
            <Table.Cell>4</Table.Cell>
            <Table.Cell>12.10.2004</Table.Cell>
            <Table.Cell>Alex</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Pack name</Table.Cell>
            <Table.Cell>4</Table.Cell>
            <Table.Cell>12.10.2004</Table.Cell>
            <Table.Cell>Ivan</Table.Cell>
          </Table.Row>
        </Table.Body>
      </>
    ),
  },
}
