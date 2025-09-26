import type { ApplicationService } from '@adonisjs/core/types'
import { UserRepository } from '../../user_repository.js'
import { UserRepositoryInterface } from './Interfaces/user_repository_interface.js'

export default class UserRepositoryProvider {
  constructor(protected app: ApplicationService) { }

  public register() {
    this.app.container.bind('Repositories/UserRepository', () => {
      return new UserRepository() as UserRepositoryInterface
    })
  }

  async boot() { }
  async start() { }
  async ready() { }
  async shutdown() { }
}
