import IdentityObjectId from '../../BuildingBlocks/ValueObject/IdentityObjectId'
import UUID from '../../BuildingBlocks/ValueObject/UUID'
import Password from './Password'
import User from './User'
import UserRepository from './UserRepository'
import PrismaMongoRepository from '../../DataAccess/Prisma/PrismaMongoRepository'

export default class PrismaMongoUserRepository extends PrismaMongoRepository<User> implements UserRepository {
  public async add(entity: User): Promise<void> {
    await Promise.resolve([this, entity])
    throw new Error('Method not implemented.')
  }

  public async get(identity: IdentityObjectId): Promise<User | null> {
    await Promise.resolve([this, identity])
    throw new Error('Method not implemented.')
  }

  public async getAll(): Promise<Array<User>> {
    await Promise.resolve([this])
    throw new Error('Method not implemented.')
  }

  public async findByUUID(uuid: UUID): Promise<User | null> {
    const found = await this.db.user.findUnique({
      where: {
        uuid: uuid.valueOf(),
      },
    })

    if (found === null) {
      return found
    }

    const identity = IdentityObjectId.create(found.id, found.uuid)

    const props = {
      email: found.email,
      password: Password.fromHash(found.password),
    }

    const user = new User(identity, props)

    return user
  }

  public async findByEmail(email: string): Promise<User | null> {
    const found = await this.db.user.findUnique({
      where: {
        email,
      },
    })

    if (found === null) {
      return found
    }

    const identity = IdentityObjectId.create(found.id, found.uuid)

    const props = {
      email: found.email,
      password: Password.fromHash(found.password),
    }

    const user = new User(identity, props)

    return user
  }

  public async remove(entity: User): Promise<void> {
    await Promise.resolve([this, entity])
    throw new Error('Method not implemented.')
  }

  public async removeAll(): Promise<void> {
    await Promise.resolve([this])
    throw new Error('Method not implemented.')
  }
}
