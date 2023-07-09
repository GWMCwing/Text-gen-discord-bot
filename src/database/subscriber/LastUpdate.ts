import { EventSubscriber, EntitySubscriberInterface, UpdateEvent } from 'typeorm';
import LastUpdate from '../entity/abstract/LastUpdate';

@EventSubscriber()
export class LastUpdateSubscriber implements EntitySubscriberInterface<LastUpdate> {
  listenTo() {
    return LastUpdate;
  }

  async beforeUpdate(event: UpdateEvent<LastUpdate>) {
    if (event.entity) {
      event.entity.lastUpdate = new Date();
    }
  }
}
