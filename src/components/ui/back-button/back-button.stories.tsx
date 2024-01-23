import type { Meta, StoryObj } from '@storybook/react'

import { BackButton } from './'

const meta = {
  title: 'Components/BackButton',
  component: BackButton,
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof BackButton>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
