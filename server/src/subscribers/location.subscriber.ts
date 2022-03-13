import { Location } from '../entities/location.entity'
import { EntitySubscriberInterface, EventSubscriber, InsertEvent, UpdateEvent } from 'typeorm'
import { validate } from 'class-validator'

@EventSubscriber()
export class LocationSubscriber implements EntitySubscriberInterface<Location> {
  listenTo() {
    return Location
  }

  async beforeInsert({ entity: location }: InsertEvent<Location>): Promise<void> {
    const errors = await validate(location)

    if (errors.length > 0) {
      throw errors
    }
  }

  async beforeUpdate({ entity: location }: UpdateEvent<Location>): Promise<void> {
    const errors = await validate(location as Location)

    if (errors.length > 0) {
      throw errors
    }
  }
}
