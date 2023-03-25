import UseCase from '../../BuildingBlocks/UseCase/UseCase'
import UserRepository from '../User/UserRepository'
import Gate from '../Auth/Gate'

export interface Command {
  email: string,
  password: string,
}

export interface Result {
  success: boolean,
  token: string | null,
}

export default class SignInUseCase implements UseCase<Command, Result> {
  private readonly gate: Gate

  private readonly userRepository: UserRepository

  constructor(gate: Gate, userRepository: UserRepository) {
    this.gate = gate
    this.userRepository = userRepository
  }

  public async execute(command: Command): Promise<Result> {
    const user = await this.userRepository.findByEmail(command.email)

    if (!user) {
      return { success: false, token: null }
    }

    const passwordMatches = await user.props.password.matchesWith(command.password)

    if (!passwordMatches) {
      return { success: false, token: null }
    }

    const token = await this.gate.signIn(user)

    if (!token) {
      return { success: false, token: null }
    }

    return { success: true, token }
  }
}
