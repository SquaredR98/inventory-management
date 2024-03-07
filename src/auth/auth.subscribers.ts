import { EntitySubscriberInterface, EventSubscriber, InsertEvent, UpdateEvent } from "typeorm";
import { Auth } from "./entities/auth.entity";
import { AuthProvider } from "./auth.provider";


@EventSubscriber()
export class AuthSubscriber implements EntitySubscriberInterface<Auth> {
  listenTo() {
    return Auth;
  }
  async beforeInsert({ entity }: InsertEvent<Auth>): Promise<void> {
    console.log(entity.password);
    
    if(entity.password) {
      entity.password = await AuthProvider.generateHash(entity.password);
    }
  }
  async beforeUpdate(event: UpdateEvent<Auth>): Promise<void> {
    
  }
}