import EntityObjectId from '../../BuildingBlocks/Entity/EntityObjectId'

export interface Props {
  title: string,
  author: string,
  summary: string | null,
}

export default class Book extends EntityObjectId<Props> {}
