import { z } from 'zod'

export const params = z.object({
  id: z.string().trim().uuid(),
})

export const body = z
  .object({
    title: z.string().trim().min(1),
    author: z.string().trim().min(1),
    summary: z.string().trim().min(1),
  })
  .partial()
  .refine(
    (obj: Record<string | number | symbol, unknown>) => (
      Object.values(obj).some((v) => v !== undefined)
    ),
    { message: 'At least one of the fields must be defined' },
  )

const UpdateBookSchema = z.object({
  params,
  body,
})

export default UpdateBookSchema
