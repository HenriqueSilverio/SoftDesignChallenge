import Repository from '../../BuildingBlocks/Repository/Repository'
import IdentityObjectId from '../../BuildingBlocks/ValueObject/IdentityObjectId'
import Book from '../Book/Book'
import Rental from './Rental'

export default interface RentalRepository extends Repository<IdentityObjectId, Rental> {
  findActiveOf(book: Book): Promise<Rental | null>
}
