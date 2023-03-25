import {
  ErrorRequestHandler,
  RequestHandler,
} from 'express'

export type Handler =
  | RequestHandler
  | ErrorRequestHandler

export default interface Middleware {
  getHandler(): Handler
}
