import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
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

  @Post('test')
  cache(@Req() req: Request, @Res() res: Response, @Body() test:BodyDTO) {
    return this.appService.cache(req,res,test);
  }
}
