import { z } from 'zod'

export const params = z.object({
  id: z.string().trim().uuid(),
})

const DeleteBookSchema = z.object({
  params,
})

export default DeleteBookSchema
