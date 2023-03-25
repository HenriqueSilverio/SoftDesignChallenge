export default interface RentalDTO {
  rental: {
    id: string,
    rentedAt: string,
    returnedAt: string | null,
  },
  user: {
    id: string,
    email: string,
  },
  book: {
    id: string,
    title: string,
  },
}
