import { z } from 'zod'

export const query = z.object({
  search: z.string().trim().min(1).optional(),
})

const ListBooksSchema = z.object({
  query,
})

export default ListBooksSchema
