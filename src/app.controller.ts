import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { BodyDTO } from './dto/body.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello() {
    return this.appService.getHello();
  }

  @Post()
  setCache(@Body() test:BodyDTO) {
    return this.appService.setCache(test);
  }
}
