import UseCase from '../../BuildingBlocks/UseCase/UseCase'
import Book from '../Book/Book'
import BookDTO from '../Book/BookDTO'
import BookRepository from '../Book/BookRepository'

export interface Command {
  title: string,
  author: string,
  summary?: string,
}

export interface Result {
  success: boolean,
  message: string,
  data: BookDTO | null,
}

export default class CreateBookUseCase implements UseCase<Command, Result> {
  private readonly repository: BookRepository

  constructor(repository: BookRepository) {
    this.repository = repository
  }

  public async execute(command: Command): Promise<Result> {
    const id = await this.repository.nextIdentity()

    const book = new Book(id, {
      title: command.title,
      author: command.author,
      summary: command.summary || null,
    })

    await this.repository.add(book)

    return {
      success: true,
      message: 'Book Created',
      data: {
        id: book.identity.props.uuid.valueOf(),
        title: book.props.title,
        author: book.props.author,
        summary: book.props.summary,
      },
    }
  }
}
