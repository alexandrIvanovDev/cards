import type { Meta, StoryObj } from '@storybook/react'

import { ProgressBar } from './'

const meta = {
  title: 'Components/ProgressBar',
  component: ProgressBar,
} satisfies Meta<typeof ProgressBar>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {}
