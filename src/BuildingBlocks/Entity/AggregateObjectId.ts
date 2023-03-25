import IdentityObjectId from '../ValueObject/IdentityObjectId'
import Aggregate from './Aggregate'

export default abstract class AggregateObjectId<TProps> extends Aggregate<IdentityObjectId, TProps> {}
