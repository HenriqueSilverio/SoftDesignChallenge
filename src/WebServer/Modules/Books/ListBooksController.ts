import { Response } from 'express'

import Controller from '../../Core/Controller'
import AuthenticatedRequest from '../../Core/AuthenticatedRequest'

import ListBooksSchema from './ListBooksSchema'
import ListBooksUseCase from '../../../BookRental/UseCases/ListBooksUseCase'

export default class ListBooksController extends Controller {
  private readonly useCase: ListBooksUseCase

  constructor(useCase: ListBooksUseCase) {
    super()
    this.useCase = useCase
  }

  protected async handler(request: AuthenticatedRequest, response: Response): Promise<void> {
    const { query } = ListBooksSchema.parse(request)

    const result = await this.useCase.execute({
      search: query.search,
    })

    response.json(result)
  }
}
