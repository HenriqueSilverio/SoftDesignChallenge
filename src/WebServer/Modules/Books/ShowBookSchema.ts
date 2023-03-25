import { z } from 'zod'

export const params = z.object({
  id: z.string().trim().uuid(),
})

const ShowBookSchema = z.object({
  params,
})

export default ShowBookSchema
