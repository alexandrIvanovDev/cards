import type { Meta, StoryObj } from '@storybook/react'

import { EditProfileForm } from '@/components/auth/edit-profile'

const meta = {
  title: 'Auth/EditProfileForm',
  component: EditProfileForm,
} satisfies Meta<typeof EditProfileForm>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    onSubmit: data => {
      alert(JSON.stringify(data))
    },
  },
}
