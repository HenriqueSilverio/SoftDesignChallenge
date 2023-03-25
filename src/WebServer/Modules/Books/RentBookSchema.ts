import { z } from 'zod'

export const params = z.object({
  id: z.string().trim().uuid(),
})

const RentBookSchema = z.object({
  params,
})

export default RentBookSchema
