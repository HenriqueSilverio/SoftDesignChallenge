/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable class-methods-use-this */

import PrismaRepository from './PrismaRepository'
import IdentityObjectId from '../../BuildingBlocks/ValueObject/IdentityObjectId'

export default abstract class PrismaMongoRepository<TEntity> extends PrismaRepository<IdentityObjectId, TEntity> {
  public async nextIdentity(): Promise<IdentityObjectId> {
    return IdentityObjectId.create()
  }
}
