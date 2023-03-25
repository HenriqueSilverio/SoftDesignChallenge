import { Response } from 'express'

import Controller from '../../Core/Controller'
import AuthenticatedRequest from '../../Core/AuthenticatedRequest'

import RentBookSchema from './RentBookSchema'
import RentBookUseCase from '../../../BookRental/UseCases/RentBookUseCase'

export default class RentBookController extends Controller {
  private readonly useCase: RentBookUseCase

  constructor(useCase: RentBookUseCase) {
    super()
    this.useCase = useCase
  }

  protected async handler(request: AuthenticatedRequest, response: Response): Promise<void> {
    const { params } = await RentBookSchema.parseAsync(request)

    const result = await this.useCase.execute({
      user: request.user,
      bookID: params.id,
    })

    response.json(result)
  }
}
