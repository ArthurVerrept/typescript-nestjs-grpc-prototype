import { Body, Controller, Get, Inject, OnModuleInit, Post } from '@nestjs/common'
import { GetUserTokensDto } from './dto/user.dto'
import { UserService } from './user.service'
import { ClientGrpc } from '@nestjs/microservices'
import { Meta } from 'src/meta.decorator'
import { MathService, NumberArray } from 'gen2/src/app'
import { Metadata } from '@grpc/grpc-js'

@Controller('user')
export class UserController implements OnModuleInit  {
    private mathService: MathService

    onModuleInit(): void {
        this.mathService = this.client.getService<MathService>('MathService')
    }

    constructor(
        @Inject('math') private client: ClientGrpc,
        private userService: UserService
    ) {}

    @Get('tokens')
    getTokens(@Body() user: GetUserTokensDto) {
        return this.userService.getTokens(user)
    }

    @Post('add')
    add(@Body() data: NumberArray, @Meta() metadata: Metadata) {
        return this.mathService.accumulate(data, metadata)
    }
}
