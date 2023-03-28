import JWT from 'jsonwebtoken'

import IdentityObjectId from '../../BuildingBlocks/ValueObject/IdentityObjectId'

import Password from '../User/Password'
import User from '../User/User'

import DecodedToken from './DecodedToken'
import Gate from './Gate'

describe('Gate', () => {
  const gate = new Gate('secret')

  const user = new User(IdentityObjectId.create(), {
    email: 'test@mail.com',
    password: Password.fromHash('$2b$10$GQtDOkAybsuKHasCS99V7uPG86CHvmtn0hqFfIre6YIhbCAmm1PSC'),
  })

  test('Gate.signIn', async () => {
    const token = await gate.signIn(user)

    const decoded = JWT.decode(token) as DecodedToken

    expect(decoded.userID).toBe(user.identity.props.uuid.valueOf())
  })

  test('Gate.verify', async () => {
    const token = await gate.signIn(user)

    const verified = await gate.verify(token) as DecodedToken

    expect(verified.userID).toBe(user.identity.props.uuid.valueOf())
  })
})
