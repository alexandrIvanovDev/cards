import type { Meta, StoryObj } from '@storybook/react'

import { SignInForm } from './sign-in.tsx'

const meta = {
  title: 'Auth/SignInForm',
  component: SignInForm,
} satisfies Meta<typeof SignInForm>

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
