import { Response } from 'express'

import Controller from '../../Core/Controller'
import AuthenticatedRequest from '../../Core/AuthenticatedRequest'

import CreateBookSchema from './CreateBookSchema'
import CreateBookUseCase from '../../../BookRental/UseCases/CreateBookUseCase'

export default class CreateBookController extends Controller {
  private readonly useCase: CreateBookUseCase

  constructor(useCase: CreateBookUseCase) {
    super()
    this.useCase = useCase
  }

  protected async handler(request: AuthenticatedRequest, response: Response): Promise<void> {
    const { body } = await CreateBookSchema.parseAsync(request)

    const { title, author, summary } = body

    const result = await this.useCase.execute({
      title,
      author,
      summary,
    })

    response.json(result)
  }
}
