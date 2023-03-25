import { ObjectId as BSONObjectId } from 'bson'
import ValueObject from './ValueObject'

export interface Props {
  value: string,
}

export default class ObjectId extends ValueObject<Props> {
  private constructor(props: Props) {
    super(props)
  }

  public static create(value?: string): ObjectId {
    if (value === undefined || value === null) {
      return new ObjectId({
        value: (new BSONObjectId(value)).toHexString(),
      })
    }

    if (!ObjectId.isValid(value)) {
      throw new Error('ArgumentException')
    }

    return new ObjectId({
      value: (new BSONObjectId(value)).toHexString(),
    })
  }

  public static isValid(value: string): boolean {
    return (
      BSONObjectId.isValid(value)
      && (new BSONObjectId(value)).toHexString() === value
    )
  }

  public valueOf(): string {
    return this.props.value
  }
}
