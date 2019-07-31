import { Controller, Get } from '@nestjs/common';

@Controller('hello')
export class HelloController {
  @Get()
  index() {
    return { status: 'hello world' }
  }
}
