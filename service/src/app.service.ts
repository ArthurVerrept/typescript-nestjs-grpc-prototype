import { Injectable } from '@nestjs/common'

@Injectable()
export class AppService {
    async accumulate(data: number[]) {
        // await new Promise(resolve => setTimeout(resolve, 1000))
        return data.reduce((a, b) => a + b, 0)
    }
}
