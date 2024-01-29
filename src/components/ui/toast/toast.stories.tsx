import type { Meta, StoryObj } from '@storybook/react'
import { toast } from 'react-toastify'

import { Toast } from './toast.tsx'

import { Button } from '@/components/ui/button'

const meta = {
  title: 'Components/Toast',
  component: Toast,
  tags: ['autodocs'],
} satisfies Meta<typeof Toast>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => {
    const showMessage = () => {
      toast('Default message')
    }

    return (
      <>
        <Button onClick={showMessage}>Show message</Button>
        <Toast />
      </>
    )
  },
}

export const Success: Story = {
  render: () => {
    const showMessage = () => {
      toast.success('Success')
    }

    return (
      <>
        <Button onClick={showMessage}>Show message</Button>
        <Toast />
      </>
    )
  },
}

export const Error: Story = {
  render: () => {
    const showMessage = () => {
      toast.error('Error')
    }

    return (
      <>
        <Button onClick={showMessage}>Show message</Button>
        <Toast />
      </>
    )
  },
}

export const Info: Story = {
  render: () => {
    const showMessage = () => {
      toast.info('Info')
    }

    return (
      <>
        <Button onClick={showMessage}>Show message</Button>
        <Toast />
      </>
    )
  },
}
