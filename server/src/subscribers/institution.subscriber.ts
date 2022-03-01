import { EntitySubscriberInterface, EventSubscriber, InsertEvent, UpdateEvent } from 'typeorm'
import { validate } from 'class-validator'
import { Institution } from '../entities/institution.entity'

@EventSubscriber()
export class InstitutionSubscriber implements EntitySubscriberInterface<Institution> {
  listenTo() {
    return Institution
  }

  async beforeInsert({ entity: institution }: InsertEvent<Institution>): Promise<void> {
    const errors = await validate(institution)

    if (errors.length > 0) {
      throw errors
    }
  }

  async beforeUpdate({ entity: institution }: UpdateEvent<Institution>): Promise<void> {
    const errors = await validate(institution as Institution)

    if (errors.length > 0) {
      throw errors
    }
  }
}
