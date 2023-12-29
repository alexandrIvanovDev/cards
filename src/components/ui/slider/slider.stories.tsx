import { useState } from 'react'

import type { Meta, StoryObj } from '@storybook/react'

import { Slider } from './'

const meta = {
  title: 'Components/Slider',
  component: Slider,
  tags: ['autodocs'],
} satisfies Meta<typeof Slider>

export default meta
type Story = StoryObj<typeof meta>

const props = {
  min: 0,
  max: 15,
  defaultValue: [2, 10],
  minStepsBetweenThumbs: 2,
  onChange: () => {},
}

export const Default: Story = {
  render: args => {
    const [value, setValue] = useState(props.defaultValue)

    const onValueChange = (value: Array<number>) => {
      setValue(value)
    }

    return <Slider {...args} onValueChange={onValueChange} defaultValue={value} />
  },
  args: {
    ...props,
  },
}
