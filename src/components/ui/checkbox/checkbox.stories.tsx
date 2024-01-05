import { useState } from 'react'

import type { Meta, StoryObj } from '@storybook/react'

import { Checkbox } from './'

const meta = {
  title: 'Components/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof Checkbox>

export default meta
type Story = StoryObj<typeof meta>

export const Checked: Story = {
  args: {
    checked: true,
    onChange: () => {},
    label: 'Check',
  },
}

export const Unchecked: Story = {
  args: {
    checked: false,
    onChange: () => {},
    label: 'Check',
  },
}

export const Disabled: Story = {
  args: {
    checked: true,
    onChange: () => {},
    disabled: true,
    label: 'Check',
  },
}

export const Default = {
  render: () => {
    const [isChecked, setIsChecked] = useState(false)

    return (
      <Checkbox checked={isChecked} onChange={() => setIsChecked(!isChecked)} label="Checkbox" />
    )
  },
}
