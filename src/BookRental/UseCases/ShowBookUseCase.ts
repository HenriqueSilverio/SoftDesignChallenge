import UseCase from '../../BuildingBlocks/UseCase/UseCase'
import UUID from '../../BuildingBlocks/ValueObject/UUID'
import BookDTO from '../Book/BookDTO'
import BookRepository from '../Book/BookRepository'

export interface Command {
  id: string,
}

export interface Result {
  success: boolean,
  message: string,
  data: BookDTO | null,
}

export default class ShowBookUseCase implements UseCase<Command, Result> {
  private readonly repository: BookRepository

  constructor(repository: BookRepository) {
    this.repository = repository
  }

  public async execute(command: Command): Promise<Result> {
    const uuid = UUID.create(command.id)

    const book = await this.repository.findByUUID(uuid)

    if (!book) {
      return {
        success: false,
        message: 'Book not found',
        data: null,
      }
    }

    return {
      success: true,
      message: 'Book found',
      data: {
        id: book.identity.props.uuid.valueOf(),
        title: book.props.title,
        author: book.props.author,
        summary: book.props.summary,
      },
    }
  }
}
