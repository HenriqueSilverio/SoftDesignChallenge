import Repository from '../../BuildingBlocks/Repository/Repository'
import IdentityObjectId from '../../BuildingBlocks/ValueObject/IdentityObjectId'
import User from './User'

export default interface UserRepository extends Repository<IdentityObjectId, User> {
  findByEmail(email: string): Promise<User | null>
}
