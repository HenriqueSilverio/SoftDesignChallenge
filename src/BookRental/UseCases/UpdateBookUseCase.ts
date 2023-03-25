import UseCase from '../../BuildingBlocks/UseCase/UseCase'
import Book from '../Book/Book'
import BookDTO from '../Book/BookDTO'
import BookRepository from '../Book/BookRepository'
import RentalRepository from '../Rental/RentalRepository'
import UUID from '../../BuildingBlocks/ValueObject/UUID'

export interface Command {
  id: string,
  title?: string,
  author?: string,
  summary?: string,
}

export interface Result {
  success: boolean,
  message: string,
  data: BookDTO | null,
}

export default class UpdateBookUseCase implements UseCase<Command, Result> {
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
        data: null,
      }
    }

    const rented = await this.rentalRepository.findActiveOf(book)

    if (rented) {
      return {
        success: false,
        message: 'Cannot update a rented book',
        data: null,
      }
    }

    const updatedBook = new Book(book.identity, {
      title: command.title || book.props.title,
      author: command.author || book.props.author,
      summary: command.summary || book.props.summary,
    })

    await this.bookRepository.add(updatedBook)

    return {
      success: true,
      message: 'Book updated',
      data: {
        id: updatedBook.identity.props.uuid.valueOf(),
        title: updatedBook.props.title,
        author: updatedBook.props.author,
        summary: updatedBook.props.summary,
      },
    }
  }
}
