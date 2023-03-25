import EntityObjectId from '../../BuildingBlocks/Entity/EntityObjectId'
import IdentityObjectId from '../../BuildingBlocks/ValueObject/IdentityObjectId'

export interface Props {
  userID: IdentityObjectId,
  bookID: IdentityObjectId,
  rentedAt: Date,
  returnedAt?: Date | null,
}

export default class Rental extends EntityObjectId<Props> {}
