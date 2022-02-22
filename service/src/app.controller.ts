import { Metadata } from '@grpc/grpc-js'
import { Controller, Logger, UseGuards } from '@nestjs/common'
import { GrpcMethod } from '@nestjs/microservices'
import { NumberArray, SumOfNumberArray } from '../gen2/src/app'
import { AppService } from './app.service'
import { GoogleAuthService } from './google-auth/google-auth.service'
import { GrpcAuthGuard } from './grpcAuthGuard.strategy'

@Controller()
export class AppController {
  private logger = new Logger('AppController')

  constructor(
      private appService: AppService,
      private googleAuthService: GoogleAuthService
    ) {}

  @UseGuards(GrpcAuthGuard)
  @GrpcMethod('MathService', 'Accumulate')
  async accumulate(numberArray: NumberArray,  metadata: Metadata): Promise<SumOfNumberArray> {
    this.logger.log('adding ' + numberArray.data)
    console.log(metadata)
    return { sum: await this.appService.accumulate(numberArray.data) }
  }

  @GrpcMethod('MathService', 'GenerateAuthUrl')
  async generateAuthUrl() {
    return { url: await this.googleAuthService.generateAuthUrl() }
  }
}
