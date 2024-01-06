import type { Meta, StoryObj } from '@storybook/react'

import { SignInForm } from '@/components/auth/sign-in/sign-in.tsx'

const meta = {
  title: 'Auth/SignInForm',
  component: SignInForm,
} satisfies Meta<typeof SignInForm>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    onSubmit: data => {
      alert(JSON.stringify(data))
    },
  },
}
