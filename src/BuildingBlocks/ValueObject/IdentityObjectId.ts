import ObjectId from './ObjectId'
import SurrogateIdentity, { Props as SurrogateIdentityProps } from './SurrogateIdentity'
import UUID from './UUID'

export type Props = SurrogateIdentityProps<ObjectId>

export default class IdentityObjectId extends SurrogateIdentity<ObjectId> {
  private constructor(props: Props) {
    super(props)
  }

  public static create(id?: string, uuid?: string): IdentityObjectId {
    return new IdentityObjectId({
      id: ObjectId.create(id),
      uuid: UUID.create(uuid),
    })
  }

  public valueOf() {
    return {
      id: this.props.id.valueOf(),
      uuid: this.props.uuid.valueOf(),
    }
  }
}
