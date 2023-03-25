import { Request as BaseRequest, Response } from 'express'
import { z } from 'zod'

import Controller from '../../Core/Controller'

import { body as SchemaBody } from './SignInSchema'
import SignInUseCase from '../../../BookRental/UseCases/SignInUseCase'

export type Request = BaseRequest<unknown, unknown, z.infer<typeof SchemaBody>>

export default class SignInController extends Controller {
  private readonly useCase: SignInUseCase

  constructor(useCase: SignInUseCase) {
    super()
    this.useCase = useCase
  }

  protected async handler(request: Request, response: Response): Promise<void> {
    const result = await this.useCase.execute({
      email: request.body.email,
      password: request.body.password,
    })
    response.json(result)
  }
}
