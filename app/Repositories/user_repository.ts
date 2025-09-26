import type { UserRepositoryInterface } from './Interfaces/user_repository_interface.js'
import User from '#models/user'
import { createUserValidator } from '../validators/User/create_user_validator.js'
import { errors } from '@vinejs/vine'

export class UserRepository implements UserRepositoryInterface {
  async store(usersData: any[]): Promise<any> {
    let validUsers: any[]

    try {
      validUsers = await createUserValidator.validate(usersData)
    } catch (error) {
      if (error instanceof errors.E_VALIDATION_ERROR) {
        console.error('Falha ao validar usuários:', error.messages)
        throw new Error('Falha na validação de usuários')
      }
      throw error
    }

    const createdUsers = []
    for (const userData of validUsers) {
      const user = await User.create(userData)
      createdUsers.push(user)
    }

    return createdUsers
  }
}
