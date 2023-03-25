import IdentityObjectId from '../../BuildingBlocks/ValueObject/IdentityObjectId'
import UUID from '../../BuildingBlocks/ValueObject/UUID'

import PrismaMongoRepository from '../../DataAccess/Prisma/PrismaMongoRepository'

import Book from './Book'
import BookRepository from './BookRepository'

export default class PrismaMongoBookRepository extends PrismaMongoRepository<Book> implements BookRepository {
  public async add(entity: Book): Promise<void> {
    await this.db.book.upsert({
      where: {
        id: entity.identity.props.id.valueOf(),
      },
      create: {
        id: entity.identity.props.id.valueOf(),
        uuid: entity.identity.props.uuid.valueOf(),
        title: entity.props.title,
        author: entity.props.author,
        summary: entity.props.summary,
      },
      update: {
        title: entity.props.title,
        author: entity.props.author,
        summary: entity.props.summary,
      },
    })
  }

  public async get(identity: IdentityObjectId): Promise<Book | null> {
    const document = await this.db.book.findUnique({
      where: {
        id: identity.props.id.valueOf(),
      },
    })

    if (!document) {
      return null
    }

    const id = IdentityObjectId.create(document.id, document.uuid)

    const book = new Book(id, {
      title: document.title,
      author: document.author,
      summary: document.summary,
    })

    return book
  }

  public async getAll(): Promise<Array<Book>> {
    const documents = await this.db.book.findMany()

    const books = documents.map((doc) => {
      const id = IdentityObjectId.create(doc.id, doc.uuid)

      const book = new Book(id, {
        title: doc.title,
        author: doc.author,
        summary: doc.summary,
      })

      return book
    })

    return books
  }

  public async search(term?: string): Promise<Array<Book>> {
    const documents = await this.db.book.findMany({
      where: {
        title: {
          contains: term,
          mode: 'insensitive',
        },
      },
    })

    const books = documents.map((doc) => {
      const id = IdentityObjectId.create(doc.id, doc.uuid)

      const book = new Book(id, {
        title: doc.title,
        author: doc.author,
        summary: doc.summary,
      })

      return book
    })

    return books
  }

  public async findByUUID(uuid: UUID): Promise<Book | null> {
    const document = await this.db.book.findUnique({
      where: {
        uuid: uuid.valueOf(),
      },
    })

    if (!document) {
      return null
    }

    const id = IdentityObjectId.create(document.id, document.uuid)

    const book = new Book(id, {
      title: document.title,
      author: document.author,
      summary: document.summary,
    })

    return book
  }

  public async remove(entity: Book): Promise<void> {
    await this.db.book.delete({
      where: {
        id: entity.identity.props.id.valueOf(),
      },
    })
  }

  public async removeAll(): Promise<void> {
    await Promise.resolve([this])
    throw new Error('Method not implemented.')
  }
}
