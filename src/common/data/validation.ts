import { z } from 'zod'

export const genericNameConstraint = z
  .string()
  .trim()
  .min(3, { message: 'Name must be longer than or equal to 3 characters' })

export const genericPasswordConstraint = z
  .string()
  .min(3, { message: 'String must contain at least 3 character(s)' })

export const genericEmailConstraint = z.string().email()

export const genericAvatarConstraint = z.string().email()
