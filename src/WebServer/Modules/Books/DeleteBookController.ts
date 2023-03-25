import { Response } from 'express'

import Controller from '../../Core/Controller'
import AuthenticatedRequest from '../../Core/AuthenticatedRequest'

import DeleteBookSchema from './DeleteBookSchema'
import DeleteBookUseCase from '../../../BookRental/UseCases/DeleteBookUseCase'

export default class DeleteBookController extends Controller {
  private readonly useCase: DeleteBookUseCase

  constructor(useCase: DeleteBookUseCase) {
    super()
    this.useCase = useCase
  }

  protected async handler(request: AuthenticatedRequest, response: Response): Promise<void> {
    const { params } = await DeleteBookSchema.parseAsync(request)

    const { id } = params

    const result = await this.useCase.execute({ id })

    response.json(result)
  }
}
