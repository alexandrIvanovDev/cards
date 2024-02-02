import { z } from 'zod'

export const genericNameConstraint = z
  .string()
  .trim()
  .min(3, { message: 'Name must be longer than or equal to 3 characters' })

export const genericPasswordConstraint = z
  .string()
  .min(3, { message: 'String must contain at least 3 character(s)' })

export const genericEmailConstraint = z.string().email()

export const genericAvatarConstraint = z.string().optional()

const MAX_FILE_SIZE = 1000000
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']

export const genericFileConstraints = z
  .any()
  .refine(file => file?.size <= MAX_FILE_SIZE, `Max image size is 1MB.`)
  .refine(
    file => ACCEPTED_IMAGE_TYPES.includes(file?.type),
    'Only .jpg, .jpeg, .png and .webp formats are supported.'
  )
