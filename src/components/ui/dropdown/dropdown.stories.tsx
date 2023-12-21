import type { Meta, StoryObj } from '@storybook/react'

import { Dropdown, DropDownItem, DropDownItemWithIcon } from './'

import { DeleteIcon } from '@/assets/icons/Delete.tsx'
import { EditIcon } from '@/assets/icons/Edit.tsx'
import { LogoutIcon } from '@/assets/icons/Logout.tsx'
import { PlayIcon } from '@/assets/icons/Play.tsx'
import { ProfileIcon } from '@/assets/icons/Profile.tsx'
import { Avatar } from '@/components/ui/avatar'
import { ProfileInfo } from '@/components/ui/header/profile-info/profile-info.tsx'

const meta = {
  title: 'Components/DropDown',
  component: Dropdown,
  tags: ['autodocs'],
} satisfies Meta<typeof Dropdown>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: (
      <div>
        <DropDownItemWithIcon icon={<PlayIcon />} text={'Learn'} />
        <DropDownItemWithIcon icon={<EditIcon />} text={'Edit'} />
        <DropDownItemWithIcon icon={<DeleteIcon />} text={'Delete'} />
      </div>
    ),
  },
}

export const WithProfile: Story = {
  args: {
    trigger: (
      <button>
        <Avatar userName={'Alex'} />
      </button>
    ),
    children: (
      <div>
        <DropDownItem>
          <ProfileInfo name={'Alex'} email={'alexandr.1996@list.ru'} avatar={'hello'} />
        </DropDownItem>
        <DropDownItemWithIcon icon={<ProfileIcon />} text={'My profile'} />
        <DropDownItemWithIcon icon={<LogoutIcon />} text={'Sign out'} />
      </div>
    ),
  },
}
