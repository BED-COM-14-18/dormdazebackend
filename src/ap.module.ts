import { Module } from '@nestjs/common';
import { ApiController } from './ap.icontroller';

@Module({
  controllers: [ApiController], 
})
export class ApiModule {}
