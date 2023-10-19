import { Meta, StoryObj } from '@storybook/react'

import { RadioGroup } from '@/components/ui/radio-group/radio-group.tsx'

const meta = {
  title: 'Components/RadioGroup',
  component: RadioGroup,
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof RadioGroup>

export default meta
type Story = StoryObj<typeof meta>

const options = [
  { value: 'javaScript', label: 'JavaScript' },
  { value: 'swift', label: 'Swift' },
  { value: 'go', label: 'Go' },
  { value: 'java', label: 'Java' },
  { value: 'python', label: 'Python' },
]

export const Primary: Story = {
  args: {
    radioButtons: options,
  },
}

export const Disabled: Story = {
  args: {
    radioButtons: options,
    disabled: true,
  },
}
