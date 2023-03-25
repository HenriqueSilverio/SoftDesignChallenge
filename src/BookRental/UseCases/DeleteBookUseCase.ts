import UseCase from '../../BuildingBlocks/UseCase/UseCase'
import BookRepository from '../Book/BookRepository'
import RentalRepository from '../Rental/RentalRepository'
import UUID from '../../BuildingBlocks/ValueObject/UUID'

export interface Command {
  id: string,
}

export interface Result {
  success: boolean,
  message: string,
}

export default class DeleteBookUseCase implements UseCase<Command, Result> {
  private readonly bookRepository: BookRepository

  private readonly rentalRepository: RentalRepository

  constructor(bookRepository: BookRepository, rentalRepository: RentalRepository) {
    this.bookRepository = bookRepository
    this.rentalRepository = rentalRepository
  }

  public async execute(command: Command): Promise<Result> {
    const bookUUID = UUID.create(command.id)

    const book = await this.bookRepository.findByUUID(bookUUID)

    if (!book) {
      return {
        success: false,
        message: 'Book not found',
      }
    }

    const rented = await this.rentalRepository.findActiveOf(book)

    if (rented) {
      return {
        success: false,
        message: 'Cannot delete a rented book',
      }
    }

    await this.bookRepository.remove(book)

    return {
      success: true,
      message: 'Book deleted',
    }
  }
}
