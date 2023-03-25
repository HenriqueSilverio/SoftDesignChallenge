import EntityObjectId from '../../BuildingBlocks/Entity/EntityObjectId'
import Password from './Password'

export interface Props {
  email: string,
  password: Password,
}

export default class User extends EntityObjectId<Props> {}
