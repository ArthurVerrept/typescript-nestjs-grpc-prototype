import { Logger } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { Transport } from '@nestjs/microservices'
import { MathServicePath } from 'proto-npm'

const logger = new Logger('Main')

const microserviceOptions = {
  transport: Transport.GRPC,
  options: {
    package: 'math',
    protoPath: MathServicePath
    // url: 'localhost:50051'
  }
}

async function bootstrap() {
  console.log(MathServicePath)
  const app = await NestFactory.createMicroservice(AppModule, microserviceOptions)
  await app.listen()
  logger.log('microservice is listening...')
}

bootstrap()
