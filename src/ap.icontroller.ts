import { Controller, Get } from '@nestjs/common';

@Controller('api') 
export class ApiController {
  @Get()
  getApi() {
    return { message: 'API is working!' }; 
  }
}
