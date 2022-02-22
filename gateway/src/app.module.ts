import { ConfigModule } from '@nestjs/config'
import { UserModule } from './user/user.module'
import { Module } from '@nestjs/common'


@Module({
  imports: [
    ConfigModule.forRoot(),
    UserModule
  ]
})
export class AppModule {}
