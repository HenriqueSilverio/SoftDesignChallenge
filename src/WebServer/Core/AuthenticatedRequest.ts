import { Request } from 'express'

import User from '../../BookRental/User/User'

export default interface AuthenticatedRequest extends Request {
  user: User
}
