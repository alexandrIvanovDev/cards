import type { Meta, StoryObj } from '@storybook/react'

import { EditProfileForm } from './edit-profile.tsx'

const meta = {
  title: 'Auth/EditProfileForm',
  component: EditProfileForm,
} satisfies Meta<typeof EditProfileForm>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    name: 'Alex',
    onSubmit: data => {
      // @ts-ignore
      alert(JSON.stringify(data))
    },
  },
}
