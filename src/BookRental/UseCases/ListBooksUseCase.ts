import UseCase from '../../BuildingBlocks/UseCase/UseCase'
import BookDTO from '../Book/BookDTO'
import BookRepository from '../Book/BookRepository'

export interface Command {
  search?: string,
}

export interface Result {
  success: boolean,
  message: string,
  data: Array<BookDTO>,
}

export default class ListBooksUseCase implements UseCase<Command, Result> {
  private readonly repository: BookRepository

  constructor(repository: BookRepository) {
    this.repository = repository
  }

  public async execute(command: Command): Promise<Result> {
    const books = await this.repository.search(command.search)

    const data = books.map((book) => ({
      id: book.identity.props.uuid.valueOf(),
      title: book.props.title,
      author: book.props.author,
      summary: book.props.summary,
    }))

    return {
      success: true,
      message: `Found "${books.length}" ${books.length > 1 ? 'books' : 'book'}`,
      data,
    }
  }
}
