import {UserEntity} from "../entities/user.entity";
import {RMQService} from "nestjs-rmq";
import {PurchaseState} from "@purple/interfaces";

export class BuyCourseSaga {
  private state: any;

  constructor(private user: UserEntity, private courseId: string, private rmqService: RMQService) { }
  setState(state: PurchaseState, courseId: string) {
    switch (state) {
      case PurchaseState.Started:
        break;
      case PurchaseState.WaitingForPayment:
        break;
      case PurchaseState.Purchased:
        break;
      case PurchaseState.Canceled:
        break;
    }
    this.state.setContext(this);   //установка контекста - связали сагу и состояние
    this.user.updateCourseStatus(courseId, state)
  }
  getState() {
    return this.state
  }

 }
