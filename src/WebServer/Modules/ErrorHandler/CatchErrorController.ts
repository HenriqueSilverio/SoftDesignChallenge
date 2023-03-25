/* eslint-disable class-methods-use-this */

import { NextFunction, Request, Response } from 'express'

import ErrorController from '../../Core/ErrorController'

export default class CatchErrorController extends ErrorController {
  protected handler(error: unknown, request: Request, response: Response, next: NextFunction): void {
    if (response.headersSent) {
      next(error)
      return
    }
    response.status(500).json({
      message: 'Internal Server Error',
    })
  }
}
