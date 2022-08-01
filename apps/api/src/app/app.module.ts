import { Module } from '@nestjs/common';
import {AuthController} from "./controllers/auth.controller";
import {ConfigModule} from "@nestjs/config";
import {RMQModule} from "nestjs-rmq";
import {getRMQConfig} from "./configs/rmq.config";
import {JwtModule} from "@nestjs/jwt";
import {getJWTConfig} from "./configs/jwt.config";
import {PassportModule} from "@nestjs/passport";

// import { AppController } from './app.controller';
// import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({envFilePath: 'envs/.api.env' , isGlobal: true}),
    RMQModule.forRootAsync(getRMQConfig()),
    JwtModule.registerAsync(getJWTConfig()),
    PassportModule
  ],
  controllers: [AuthController],
  // providers: [AppService],
})
export class AppModule {}
