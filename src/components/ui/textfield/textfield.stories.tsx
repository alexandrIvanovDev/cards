import { ChangeEvent, useState } from 'react'

import type { Meta, StoryObj } from '@storybook/react'

import { TextField } from './'

const meta = {
  title: 'Components/TextField',
  component: TextField,
  tags: ['autodocs'],
  argTypes: {
    // variant: {
    //   options: ['primary', 'secondary', 'tertiary', 'link'],
    //   control: { type: 'radio' },
    // },
  },
} satisfies Meta<typeof TextField>

export default meta
type Story = StoryObj<typeof meta>

export const TextType: Story = {
  args: {
    type: 'text',
    label: 'Input',
    placeholder: 'Placeholder',
  },
}

export const TextTypeDisabled: Story = {
  args: {
    type: 'text',
    label: 'Input',
    disabled: true,
  },
}

export const PasswordType: Story = {
  args: {
    type: 'password',
    label: 'Input',
    placeholder: 'Placeholder',
  },
}

export const PasswordTypeDisabled: Story = {
  args: {
    type: 'password',
    label: 'Input',
    disabled: true,
  },
}

export const SearchType: Story = {
  render: args => {
    const [value, setValue] = useState('')

    const onValueChange = (e: ChangeEvent<HTMLInputElement>) => {
      setValue(e.currentTarget.value)
    }

    const clearValue = () => setValue('')

    return (
      <TextField
        type="search"
        label="Input"
        value={value}
        onChange={onValueChange}
        clearValue={clearValue}
        {...args}
      />
    )
  },
}

export const SearchTypeDisabled: Story = {
  args: {
    type: 'search',
    label: 'Input',
    disabled: true,
  },
}

export const WithError: Story = {
  args: {
    type: 'text',
    value: 'Input',
    error: 'Some error!',
  },
}
