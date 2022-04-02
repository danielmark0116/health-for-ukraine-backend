import {
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  RemoveEvent,
  UpdateEvent,
} from 'typeorm'
import { User } from '../entities/user.entity'
import { validate } from 'class-validator'

@EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface<User> {
  listenTo() {
    return User
  }

  async beforeInsert({ entity: user }: InsertEvent<User>): Promise<void> {
    this.optionallyHashThePassword(user)

    const errors = await validate(user)

    if (errors.length > 0) {
      throw errors
    }
  }

  async afterInsert({ entity: user }: InsertEvent<User>): Promise<void> {
    user.password_hash = ''
  }

  async afterUpdate({ entity: user }: UpdateEvent<User>): Promise<void> {
    if (user) {
      user.password_hash = ''
    }
  }

  async afterRemove({ entity: user }: RemoveEvent<User>): Promise<void> {
    if (user) {
      user.password_hash = ''
    }
  }

  async beforeUpdate({ entity: user }: UpdateEvent<User>): Promise<void> {
    this.optionallyHashThePassword(user as User)

    const errors = await validate(user as User)

    if (errors.length > 0) {
      throw errors
    }
  }

  private optionallyHashThePassword(_user: User): void {
    // To be used in other case, hashing done in UserService
    // If (user.password) {
    // if (true) {
    //   console.log('This is the moment we are supposed to hash the password')
    // }
  }
}
