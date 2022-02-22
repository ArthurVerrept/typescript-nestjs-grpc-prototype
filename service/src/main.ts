import { Logger } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { Transport } from '@nestjs/microservices'
import { join } from 'path/posix'

const logger = new Logger('Main')

const microserviceOptions = {
  transport: Transport.GRPC,
  options: {
    package: 'math',
    protoPath: join(__dirname, '../src/app.proto')
    // url: 'localhost:50051'
  }
}

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, microserviceOptions)
  await app.listen()
  logger.log('microservice is listening...')
}

bootstrap()