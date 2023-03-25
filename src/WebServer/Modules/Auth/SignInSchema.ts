import { z } from 'zod'

export const body = z.object({
  email: z.string().trim().email(),
  password: z.string().trim().min(6),
})

const SignInSchema = z.object({
  body,
})

export default SignInSchema
