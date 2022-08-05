import {Body, Controller} from '@nestjs/common';
import {RMQRoute, RMQService, RMQValidate} from "nestjs-rmq";
import {AccountBuyCourse, AccountChangeProfile, AccountCheckPayment} from "@purple/contracts";
import {UserService} from "./user.service";
import { UserRepository } from './repositories/user.repository';
import {UserEntity} from "./entities/user.entity";
import {BuyCourseSaga} from "./sagas/buy-course.saga";

@Controller()
export class UserCommands {
  constructor(
    private readonly userService: UserService,
    private readonly userRepository: UserRepository,
    private readonly rmqService: RMQService,
    ) {}

  @RMQValidate()
  @RMQRoute(AccountChangeProfile.topic)
  async changeProfile(@Body() { user, id }: AccountChangeProfile.Request): Promise<AccountChangeProfile.Response> {
    return this.userService.changeProfile(user, id);
  }

  @RMQValidate()
  @RMQRoute(AccountBuyCourse.topic)
  async buyCourse(@Body() { userId, courseId }: AccountBuyCourse.Request): Promise<AccountBuyCourse.Response> {
    return this.userService.buyCourse(userId, courseId);
  }

  @RMQValidate()
  @RMQRoute(AccountCheckPayment.topic)
  async checkPayment(@Body() { userId, courseId }: AccountCheckPayment.Request)/*: Promise<AccountCheckPayment.Response>*/ {
    return this.userService.checkPayments(userId, courseId);
  }
}


