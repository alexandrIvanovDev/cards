import type { Meta, StoryObj } from '@storybook/react'

import { Card } from './'

import { Typography } from '@/components/ui/typography'

const meta = {
  title: 'Components/Card',
  component: Card,
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: <Typography variant="h1">Card</Typography>,
  },
}
