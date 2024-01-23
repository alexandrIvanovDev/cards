import { Meta, StoryObj } from '@storybook/react'

import { Rating } from './rating.tsx'

const meta = {
  title: 'Components/Rating',
  component: Rating,
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof Rating>

export default meta
type Story = StoryObj<typeof meta>

export const WithoutRating: Story = {
  args: {
    rating: 0,
  },
}

export const WithRating: Story = {
  args: {
    rating: 3,
  },
}
