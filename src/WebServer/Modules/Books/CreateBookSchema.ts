import { z } from 'zod'

export const body = z.object({
  title: z.string().trim().min(1),
  author: z.string().trim().min(1),
  summary: z.string().trim().min(1),
})

const CreateBookSchema = z.object({
  body,
})

export default CreateBookSchema
