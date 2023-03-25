import {
  ErrorRequestHandler,
  Request,
  Response,
  NextFunction,
} from 'express'

import Middleware from './Middleware'

export default abstract class ErrorController implements Middleware {
  protected abstract handler(...args: Parameters<ErrorRequestHandler>): Promise<void> | void

  public getHandler(): ErrorRequestHandler {
    return (error: unknown, request: Request, response: Response, next: NextFunction): void => {
      Promise.resolve(this.handler(error, request, response, next))
        .catch(next)
    }
  }
}
