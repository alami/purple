import { MongooseModuleAsyncOptions} from "@nestjs/mongoose";
import {ConfigModule, ConfigService} from "@nestjs/config";

export const getMongoConfig = (): MongooseModuleAsyncOptions => {
  return {
    useFactory: (configService: ConfigService) => ({
      uri: getMongoString(configService)
    }),
    inject: [ConfigService],
    imports: [ConfigModule],
  }
}
const getMongoString = (ConfigService: ConfigService) =>
  'mongodb://'+
  ConfigService.get('MONGO_LOGIN')+
  ':'+
  ConfigService.get('MONGO_PASSWORD')+
  '@'+
  ConfigService.get('MONGO_HOST')+
  ':'+
  ConfigService.get('MONGO_PORT')+
  '/'+
  ConfigService.get('MONGO_DATABASE')+
  '@authSource='+
  ConfigService.get('MONGO_AUTHDATABASE');
