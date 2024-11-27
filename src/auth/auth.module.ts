import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AdminModule } from 'src/admin/admin.module';
import { LandlordModule } from 'src/landlord/landlord.module';
import { StudentModule } from 'src/student/student.module';
import { AuthController } from './auth.controller';


@Module({
  imports: [StudentModule, AdminModule, LandlordModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}