import { PrismaClient } from '@prisma/client'
import Repository from '../../BuildingBlocks/Repository/Repository'
import UUID from '../../BuildingBlocks/ValueObject/UUID'

export default abstract class PrismaRepository<TIdentity, TEntity> implements Repository<TIdentity, TEntity> {
  protected readonly db: PrismaClient

  constructor(client: PrismaClient) {
    this.db = client
  }

  public abstract nextIdentity(): Promise<TIdentity>

  public abstract add(entity: TEntity): Promise<void>

  public abstract get(identity: TIdentity): Promise<TEntity | null>

  public abstract getAll(): Promise<Array<TEntity>>

  public abstract findByUUID(uuid: UUID): Promise<TEntity | null>

  public abstract remove(entity: TEntity): Promise<void>

  public abstract removeAll(): Promise<void>
}
