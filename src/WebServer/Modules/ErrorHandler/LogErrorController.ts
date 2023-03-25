/* eslint-disable no-console */
/* eslint-disable class-methods-use-this */

import { NextFunction, Request, Response } from 'express'

import ErrorController from '../../Core/ErrorController'

export default class LogErrorController extends ErrorController {
  protected handler(error: unknown, request: Request, response: Response, next: NextFunction): void {
    console.error(error)
    next(error)
  }
}
