import JWT, { Jwt, JwtPayload } from 'jsonwebtoken'

import User from '../User/User'

export type DecodedJWT = Jwt | JwtPayload | string | undefined

export type EncodedJWT = string | undefined

export default class Gate {
  private readonly secret: string

  constructor(secret: string) {
    this.secret = secret
  }

  public async verify(token: string): Promise<DecodedJWT> {
    return new Promise((resolve, reject) => {
      JWT.verify(token, this.secret, (error, decoded) => {
        if (error) {
          reject(error)
        }
        resolve(decoded)
      })
    })
  }

  public async signIn(user: User): Promise<EncodedJWT> {
    return new Promise((resolve, reject) => {
      const identity = user.identity.valueOf()

      const data = {
        userID: identity.uuid,
      }

      const opts = {
        expiresIn: '1h',
      }

      JWT.sign(data, this.secret, opts, (error, token) => {
        if (error) {
          return reject(error)
        }
        return resolve(token)
      })
    })
  }
}
