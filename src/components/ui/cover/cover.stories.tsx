import type { Meta, StoryObj } from '@storybook/react'

import { Cover } from './'

const meta = {
  title: 'Components/Cover',
  component: Cover,
  tags: ['autodocs'],
} satisfies Meta<typeof Cover>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    cover: null,
  },
}

export const WithCover: Story = {
  args: {
    cover:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTP2sra99acjVbephTMYzMoCa7egLzzEOZBLg&usqp=CAU',
  },
}
