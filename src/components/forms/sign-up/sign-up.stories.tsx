import type { Meta, StoryObj } from '@storybook/react'

import { SignUpForm } from './sign-up.tsx'

const meta = {
  title: 'Auth/SignUpForm',
  component: SignUpForm,
} satisfies Meta<typeof SignUpForm>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    onSubmit: data => {
      // @ts-ignore
      alert(JSON.stringify(data))
    },
  },
}
