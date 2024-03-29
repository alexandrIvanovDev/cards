import type { Meta, StoryObj } from '@storybook/react'

import { ForgotPasswordForm } from './forgot-password.tsx'

const meta = {
  title: 'Auth/ForgotPasswordForm',
  component: ForgotPasswordForm,
} satisfies Meta<typeof ForgotPasswordForm>

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
