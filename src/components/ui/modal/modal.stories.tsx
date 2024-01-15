import { CSSProperties, useState } from 'react'

import type { Meta } from '@storybook/react'

import { Modal } from './'

import { Button } from '@/components/ui/button'
import { TextField } from '@/components/ui/textfield'
import { Typography } from '@/components/ui/typography'

const meta = {
  title: 'Components/Modal',
  component: Modal,
  tags: ['autodocs'],
} satisfies Meta<typeof Modal>

export default meta

export const WithText = {
  render: () => {
    const [open, setOpen] = useState(false)

    return (
      <>
        <Modal open={open} onOpenChange={setOpen} trigger={<Button>Open</Button>}>
          <>
            <Typography as="p" variant="body1">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniamdsa
            </Typography>
          </>
        </Modal>
      </>
    )
  },
}

export const Default = {
  render: () => {
    const [open, setOpen] = useState(false)

    const buttonStyles: CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      marginTop: 20,
    }

    return (
      <>
        <Modal open={open} onOpenChange={setOpen} trigger={<Button>Open</Button>} title="Modal">
          <>
            <Typography as="p" variant="body1">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniamdsa
            </Typography>
            <div style={buttonStyles}>
              <Button onClick={() => setOpen(false)}>Ok</Button>
            </div>
          </>
        </Modal>
      </>
    )
  },
}

// @ts-ignore
export const ExampleWithInput = {
  render: () => {
    const [open, setOpen] = useState(false)

    const buttonsWrapper: CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginTop: 20,
    }

    return (
      <>
        <Modal
          trigger={<Button>Open</Button>}
          open={open}
          onOpenChange={setOpen}
          title="Enter the data"
        >
          <>
            <TextField label="Email"></TextField>
            <TextField type="password" label="Password"></TextField>
            <div style={buttonsWrapper}>
              <Button variant="secondary" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setOpen(false)}>Send</Button>
            </div>
          </>
        </Modal>
      </>
    )
  },
}
