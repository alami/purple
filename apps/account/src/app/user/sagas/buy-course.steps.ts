import {BuyCourseSagaState} from "./buy-course.state";
import {UserEntity} from "../entities/user.entity";
import {CourseGetCourse, PaymentGenerateLink} from "@purple/contracts";
import {PurchaseState} from "@purple/interfaces";

export class BuyCourseSagaStateStarted extends BuyCourseSagaState {
  public async pay(): Promise<{ paymentLink: string; user: UserEntity }> {
    const {course} = await this.saga.rmqService.send<CourseGetCourse.Request, CourseGetCourse.Response>
    (CourseGetCourse.topic, {
      id: this.saga.courseId
    });
    if (!course) {
      throw new Error('Такого курса не сущ-ет')
    }
    if (course.price == 0) {
      //this.saga.user.updateCourseStatus(course._id, PurchaseState.Purchased);
      this.saga.setState(PurchaseState.Purchased, course._id); //==>--^
      return { paymentLink: null, user: this.saga.user };
    }
    const { paymentLink } = await this.saga.rmqService.send<PaymentGenerateLink.Request, PaymentGenerateLink.Response>
    (PaymentGenerateLink.topic, {
      courseId: course._id,
      userId: this.saga.user._id,
      sum: course.price
    });
    this.saga.setState(PurchaseState.WaitingForPayment, course._id);
    return { paymentLink, user: this.saga.user };
  }

  public async checkPayment(): Promise<{ user: UserEntity }> {
    throw new Error('Нельзя проверить платёж, который не начался');
  }

  public async cancel(): Promise<{ user: UserEntity }> {
    this.saga.setState(PurchaseState.Canceled, this.saga.courseId);
    return { user: this.saga.user };
  }
}
