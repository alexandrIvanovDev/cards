import type { Meta, StoryObj } from '@storybook/react'

import { SignUpForm } from '@/components/auth/sign-up'

const meta = {
  title: 'Auth/SignUpForm',
  component: SignUpForm,
} satisfies Meta<typeof SignUpForm>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    onSubmit: data => {
      alert(JSON.stringify(data))
    },
  },
}
