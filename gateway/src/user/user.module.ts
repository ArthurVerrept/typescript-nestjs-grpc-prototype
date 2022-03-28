import { Module } from '@nestjs/common'
import { UserController } from './user.controller'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { UserService } from './user.service'
import { ClientsModule, Transport } from '@nestjs/microservices'
import { MathServicePath, MathServiceName } from 'proto-npm'

@Module({
  imports: [
    ClientsModule.register([
      {
        name: MathServiceName,
        transport: Transport.GRPC,
        options: {
          package: MathServiceName,
          protoPath: MathServicePath
        }
      }
    ]),
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET')
      })
    })],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
