import {Body, Controller, Post} from '@nestjs/common';
import {AccountLogin, AccountRegister} from "@purple/contracts";

@Controller('auth')
export class AuthController {
  constructor() {}

  @Post('register')
  async register(dto: AccountRegister.Request)    {
  }

  @Post('login')
  async login(@Body() { email, password }: AccountLogin.Request)   {
  }

}


