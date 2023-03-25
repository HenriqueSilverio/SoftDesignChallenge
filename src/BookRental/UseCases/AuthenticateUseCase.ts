import UseCase from '../../BuildingBlocks/UseCase/UseCase'
import UUID from '../../BuildingBlocks/ValueObject/UUID'

import Gate from '../Auth/Gate'

import User from '../User/User'
import UserRepository from '../User/UserRepository'

export interface Command {
  jwt: string,
}

export interface Result {
  success: boolean,
  user: User | null,
}

export interface DecodedToken {
  userID: string,
}

export default class AuthenticateUseCase implements UseCase<Command, Result> {
  private readonly gate: Gate

  private readonly userRepository: UserRepository

  constructor(gate: Gate, userRepository: UserRepository) {
    this.gate = gate
    this.userRepository = userRepository
  }

  public async execute(command: Command): Promise<Result> {
    const decoded = await this.gate.verify(command.jwt)

    if (!decoded || !AuthenticateUseCase.isDecodedToken(decoded)) {
      return { success: false, user: null }
    }

    const userID = UUID.create(decoded.userID)

    const found = await this.userRepository.findByUUID(userID)

    if (!found) {
      return { success: false, user: null }
    }

    return { success: true, user: found }
  }

  private static isDecodedToken(decoded: unknown): decoded is DecodedToken {
    return (decoded as DecodedToken).userID !== undefined
  }
}
