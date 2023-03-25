import IdentityObjectId from '../ValueObject/IdentityObjectId'
import Entity from './Entity'

export default abstract class EntityObjectId<TProps> extends Entity<IdentityObjectId, TProps> {}
