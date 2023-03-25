import UUID from '../ValueObject/UUID'

export default interface Repository<TIdentity, TEntity> {
  nextIdentity(): Promise<TIdentity>
  add(entity: TEntity): Promise<void>
  get(identity: TIdentity): Promise<TEntity | null>
  getAll(): Promise<Array<TEntity>>
  findByUUID(uuid: UUID): Promise<TEntity | null>
  remove(entity: TEntity): Promise<void>
  removeAll(): Promise<void>
}
