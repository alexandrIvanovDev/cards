import { z } from 'zod'

function getConstraint(field: string) {
  return z
    .string()
    .trim()
    .min(3, { message: `${field} must be longer than or equal to 3 characters` })
}

export const genericNameConstraint = getConstraint('Name')

export const genericPasswordConstraint = getConstraint('Password')

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

export const genericQuestionConstraint = getConstraint('Question')

export const genericAnswerConstraint = getConstraint('Answer')
