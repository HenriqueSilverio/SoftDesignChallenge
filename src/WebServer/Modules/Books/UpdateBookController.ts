import { Response } from 'express'

import Controller from '../../Core/Controller'
import AuthenticatedRequest from '../../Core/AuthenticatedRequest'

import UpdateBookSchema from './UpdateBookSchema'
import UpdateBookUseCase from '../../../BookRental/UseCases/UpdateBookUseCase'

export default class UpdateBookController extends Controller {
  private readonly useCase: UpdateBookUseCase

  constructor(useCase: UpdateBookUseCase) {
    super()
    this.useCase = useCase
  }

  protected async handler(request: AuthenticatedRequest, response: Response): Promise<void> {
    const { params, body } = await UpdateBookSchema.parseAsync(request)

    const result = await this.useCase.execute({
      id: params.id,
      ...body,
    })

    response.json(result)
  }
}
