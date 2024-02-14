import { useState } from 'react'

import type { Meta, StoryObj } from '@storybook/react'

import { Dropdown, DropDownItem, DropDownItemWithIcon } from './'

import { DeleteIcon } from '@/assets/icons/Delete.tsx'
import { EditIcon } from '@/assets/icons/Edit.tsx'
import { LogoutIcon } from '@/assets/icons/Logout.tsx'
import { PlayIcon } from '@/assets/icons/Play.tsx'
import { ProfileIcon } from '@/assets/icons/Profile.tsx'
import { ProfileInfo } from '@/components/header/profile-info/profile-info.tsx'
import { Avatar } from '@/components/ui/avatar'

const meta = {
  title: 'Components/DropDown',
  component: Dropdown,
  tags: ['autodocs'],
} satisfies Meta<typeof Dropdown>

export default meta
type Story = StoryObj<typeof meta>

// @ts-ignore
export const Default: Story = {
  render: () => {
    const [open, setOpen] = useState(false)

    return (
      <Dropdown open={open} setOpen={setOpen}>
        <DropDownItemWithIcon icon={<PlayIcon />} text={'Learn'} />
        <DropDownItemWithIcon icon={<EditIcon />} text={'Edit'} />
        <DropDownItemWithIcon icon={<DeleteIcon />} text={'Delete'} />
      </Dropdown>
    )
  },
}

// @ts-ignore
export const WithProfile: Story = {
  render: () => {
    const [open, setOpen] = useState(false)

    return (
      <Dropdown
        open={open}
        setOpen={setOpen}
        trigger={
          <button>
            <Avatar userName={'Alex'} />
          </button>
        }
      >
        <div>
          <DropDownItem>
            <ProfileInfo name={'Alex'} email={'alexandr.1996@list.ru'} avatar={'hello'} />
          </DropDownItem>
          <DropDownItemWithIcon icon={<ProfileIcon />} text={'My profile'} />
          <DropDownItemWithIcon icon={<LogoutIcon />} text={'Sign out'} />
        </div>
      </Dropdown>
    )
  },
}
