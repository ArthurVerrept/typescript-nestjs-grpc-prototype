import { Metadata } from '@grpc/grpc-js'
import { Controller, Logger, UseGuards } from '@nestjs/common'
import { GrpcMethod } from '@nestjs/microservices'
import { NumberArray, SumOfNumberArray } from 'proto-npm'
import { AppService } from './app.service'
import { GrpcAuthGuard } from './grpcAuthGuard.strategy'

@Controller()
export class AppController {
  private logger = new Logger('AppController')

  constructor(private appService: AppService) {}

  @UseGuards(GrpcAuthGuard)
  @GrpcMethod('MathService', 'Accumulate')
  async accumulate(numberArray: NumberArray,  metadata: Metadata): Promise<SumOfNumberArray> {
    this.logger.log('adding ' + numberArray.data)
    console.log(metadata)
    return { sum: await this.appService.accumulate(numberArray.data) }
  }
}
