import Book from './Book'
import Repository from '../../BuildingBlocks/Repository/Repository'
import IdentityObjectId from '../../BuildingBlocks/ValueObject/IdentityObjectId'

export default interface BookRepository extends Repository<IdentityObjectId, Book> {
  search(term?: string): Promise<Array<Book>>
}
