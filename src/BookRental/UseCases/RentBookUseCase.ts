import UseCase from '../../BuildingBlocks/UseCase/UseCase'
import UUID from '../../BuildingBlocks/ValueObject/UUID'
import Rental from '../Rental/Rental'
import RentalDTO from '../Rental/RentalDTO'
import RentalRepository from '../Rental/RentalRepository'
import User from '../User/User'
import BookRepository from '../Book/BookRepository'

export interface Command {
  user: User,
  bookID: string,
}

export interface Result {
  success: boolean,
  message: string,
  data: RentalDTO | null
}

export interface Options {
  bookRepository: BookRepository,
  rentalRepository: RentalRepository,
}

export default class RentBookUseCase implements UseCase<Command, Result> {
  private readonly bookRepository: BookRepository

  private readonly rentalRepository: RentalRepository

  constructor(options: Options) {
    this.bookRepository = options.bookRepository
    this.rentalRepository = options.rentalRepository
  }

  public async execute(command: Command): Promise<Result> {
    const bookUUID = UUID.create(command.bookID)

    const book = await this.bookRepository.findByUUID(bookUUID)

    if (!book) {
      return {
        success: false,
        message: 'Book not found',
        data: null,
      }
    }

    const rented = await this.rentalRepository.findActiveOf(book)

    if (rented) {
      return {
        success: false,
        message: 'Unavailable book',
        data: null,
      }
    }

    const rentID = await this.rentalRepository.nextIdentity()

    const rent = new Rental(rentID, {
      userID: command.user.identity,
      bookID: book.identity,
      rentedAt: new Date(),
    })

    await this.rentalRepository.add(rent)

    return {
      success: true,
      message: 'Book rented',
      data: {
        rental: {
          id: rent.identity.props.uuid.valueOf(),
          rentedAt: rent.props.rentedAt.toISOString(),
          returnedAt: rent.props.returnedAt?.toISOString() || null,
        },
        user: {
          id: command.user.identity.props.uuid.valueOf(),
          email: command.user.props.email,
        },
        book: {
          id: book.identity.props.uuid.valueOf(),
          title: book.props.title,
        },
      },
    }
  }
}
