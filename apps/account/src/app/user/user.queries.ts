import {Body, Controller, Get} from '@nestjs/common';
import {RMQRoute, RMQService, RMQValidate} from "nestjs-rmq";
import {AccountRegister, AccountUserCourses, AccountUserInfo} from "@purple/contracts";
import {User} from "./models/user.model";
import {UserRepository} from "./repositories/user.repository";

@Controller('')
export class UserQueries {
  constructor(private readonly userRepository: UserRepository, private readonly rmqService: RMQService) {}

  @RMQValidate()
  @RMQRoute(AccountUserInfo.topic)
  async userInfo({id}: AccountUserInfo.Request)
    : Promise<AccountUserInfo.Response>{
    const user = await this.userRepository.findUserById(id)
    return {user}
  }

  @RMQValidate()
  @RMQRoute(AccountUserCourses.topic)
  async userCourses({id}: AccountUserCourses.Request)
    : Promise<AccountUserCourses.Response>{
    const user = await this.userRepository.findUserById(id)
    return {courses: user.courses}
  }

  @Get('healthcheck')
  async healthCheck() {
    const isRMQ = await this.rmqService.healthCheck();
  }
}


