import { Response } from 'express'

import Controller from '../../Core/Controller'
import AuthenticatedRequest from '../../Core/AuthenticatedRequest'

import ShowBookSchema from './ShowBookSchema'
import ShowBookUseCase from '../../../BookRental/UseCases/ShowBookUseCase'

export default class ShowBookController extends Controller {
  private readonly useCase: ShowBookUseCase

  constructor(useCase: ShowBookUseCase) {
    super()
    this.useCase = useCase
  }

  protected async handler(request: AuthenticatedRequest, response: Response): Promise<void> {
    const { params } = await ShowBookSchema.parseAsync(request)

    const { id } = params

    const result = await this.useCase.execute({ id })

    response.json(result)
  }
}
