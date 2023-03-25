/* eslint-disable class-methods-use-this */

import { Request, Response } from 'express'

import Controller from '../../Core/Controller'

export default class NotFoundController extends Controller {
  protected handler(request: Request, response: Response): void {
    response.status(404).json({
      message: `Not Found ${request.path}`,
    })
  }
}
