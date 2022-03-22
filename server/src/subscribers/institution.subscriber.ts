import { EntitySubscriberInterface, EventSubscriber, InsertEvent, UpdateEvent } from 'typeorm'
import { Institution } from '../entities/institution.entity'

@EventSubscriber()
export class InstitutionSubscriber implements EntitySubscriberInterface<Institution> {
  listenTo() {
    return Institution
  }

  async beforeInsert({ entity: _institution }: InsertEvent<Institution>): Promise<void> {}

  async beforeUpdate({ entity: _institution }: UpdateEvent<Institution>): Promise<void> {}
}
