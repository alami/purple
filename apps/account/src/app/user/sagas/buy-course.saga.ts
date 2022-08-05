import {UserEntity} from "../entities/user.entity";
import {RMQService} from "nestjs-rmq";
import {PurchaseState} from "@purple/interfaces";
import { BuyCourseSagaStateCanceled, BuyCourseSagaStatePurchased,
  BuyCourseSagaStateStarted, BuyCourseSagaStateWaitingForPayment } from "./buy-course.steps";

export class BuyCourseSaga {
  private state: any;

  constructor(public user: UserEntity, public courseId: string, public rmqService: RMQService) {
    this.setState(user.getCourseState(courseId), courseId)
  }
  setState(state: PurchaseState, courseId: string) {
    switch (state) {
      case PurchaseState.Started:
        this.state = new BuyCourseSagaStateStarted();
        break;
      case PurchaseState.WaitingForPayment:
        this.state = new BuyCourseSagaStateWaitingForPayment();
        break;
      case PurchaseState.Purchased:
        this.state = new BuyCourseSagaStatePurchased();
        break;
      case PurchaseState.Canceled:
        this.state = new BuyCourseSagaStateCanceled();
        break;
    }
    this.state.setContext(this);   //установка контекста - связали сагу и состояние
    this.user.setCourseStatus(courseId, state)
  }
  getState() {
    return this.state
  }

 }
