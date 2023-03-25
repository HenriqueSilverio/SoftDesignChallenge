import IdentityObjectId from '../../BuildingBlocks/ValueObject/IdentityObjectId'
import UUID from '../../BuildingBlocks/ValueObject/UUID'

import PrismaMongoRepository from '../../DataAccess/Prisma/PrismaMongoRepository'

import Book from '../Book/Book'

import Rental from './Rental'
import RentalRepository from './RentalRepository'

export default class PrismaMongoRentalRepository extends PrismaMongoRepository<Rental> implements RentalRepository {
  public async findActiveOf(book: Book): Promise<Rental | null> {
    const rented = await this.db.rental.findFirst({
      select: {
        id: true,
        uuid: true,
        rentedAt: true,
        returnedAt: true,
        user: true,
        book: true,
      },
      where: {
        book: {
          id: book.identity.props.id.valueOf(),
        },
        OR: [
          {
            returnedAt: null,
          },
          {
            returnedAt: {
              isSet: false,
            },
          },
        ],
      },
    })

    if (!rented) {
      return null
    }

    const rentID = IdentityObjectId.create(rented.id, rented.uuid)

    const rental = new Rental(rentID, {
      userID: IdentityObjectId.create(rented.user.id, rented.user.uuid),
      bookID: IdentityObjectId.create(rented.book.id, rented.book.uuid),
      rentedAt: rented.rentedAt,
      returnedAt: rented.returnedAt,
    })

    return rental
  }

  public async add(entity: Rental): Promise<void> {
    await this.db.rental.upsert({
      where: {
        id: entity.identity.props.id.valueOf(),
      },
      update: {
        returnedAt: entity.props.returnedAt,
      },
      create: {
        id: entity.identity.props.id.valueOf(),
        uuid: entity.identity.props.uuid.valueOf(),
        rentedAt: entity.props.rentedAt,
        returnedAt: entity.props.returnedAt,
        user: {
          connect: {
            id: entity.props.userID.props.id.valueOf(),
          },
        },
        book: {
          connect: {
            id: entity.props.bookID.props.id.valueOf(),
          },
        },
      },
    })
  }

  public async get(identity: IdentityObjectId): Promise<Rental | null> {
    await Promise.resolve([this, identity])
    throw new Error('Method not implemented.')
  }

  public async getAll(): Promise<Rental[]> {
    await Promise.resolve([this])
    throw new Error('Method not implemented.')
  }

  public async findByUUID(uuid: UUID): Promise<Rental | null> {
    await Promise.resolve([this, uuid])
    throw new Error('Method not implemented.')
  }

  public async remove(entity: Rental): Promise<void> {
    await Promise.resolve([this, entity])
    throw new Error('Method not implemented.')
  }

  public async removeAll(): Promise<void> {
    await Promise.resolve([this])
    throw new Error('Method not implemented.')
  }
}
