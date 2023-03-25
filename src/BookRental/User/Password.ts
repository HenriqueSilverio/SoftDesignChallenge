import bcrypt from 'bcrypt'
import ValueObject from '../../BuildingBlocks/ValueObject/ValueObject'

export interface Props {
  hash: string,
}

export default class Password extends ValueObject<Props> {
  private constructor(props: Props) {
    super(props)
  }

  public static async fromRaw(raw: string): Promise<Password> {
    const hash = await bcrypt.hash(raw, 10)
    return new Password({ hash })
  }

  public static fromHash(hash: string): Password {
    return new Password({ hash })
  }

  public async matchesWith(raw: string): Promise<boolean> {
    return bcrypt.compare(raw, this.props.hash)
  }

  public valueOf(): string {
    return this.props.hash
  }
}
