import { Response, NextFunction } from 'express'

import Controller from '../../Core/Controller'
import AuthenticatedRequest from '../../Core/AuthenticatedRequest'

import AuthenticateUseCase from '../../../BookRental/UseCases/AuthenticateUseCase'

export default class AuthenticateController extends Controller {
  private readonly useCase: AuthenticateUseCase

  constructor(useCase: AuthenticateUseCase) {
    super()
    this.useCase = useCase
  }

  protected async handler(request: AuthenticatedRequest, response: Response, next: NextFunction): Promise<void> {
    try {
      const header = request.headers.authorization
      const token = header && header.split(' ')[1]

      if (!token) {
        response.status(401).json({
          message: 'Unable to check your identity!',
        })
        return
      }

      const result = await this.useCase.execute({
        jwt: token,
      })

      if (!result.success || !result.user) {
        response.status(401).json({
          message: "Probably, you're not supposed to be here!",
        })
        return
      }

      request.user = result.user
      next()
      return
    } catch {
      response.status(401).json({
        message: "Probably you're not supposed to be here!",
      })
    }
  }
}
