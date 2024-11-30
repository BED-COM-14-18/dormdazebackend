import { Module } from '@nestjs/common';
import { typeOrmConfig } from './typeOrmConfig';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentModule } from './student/student.module';
import { AdminModule } from './admin/admin.module';
import { LandlordModule } from './landlord/landlord.module';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { ListingModule } from './listing/listing.module';
import { BookingModule } from './booking/booking.module';
import { SearchfilteringModule } from './searchfiltering/searchfiltering.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), ListingModule, BookingModule, 
    SearchfilteringModule, StudentModule, AdminModule, LandlordModule, AuthModule,

    JwtModule.register({
      secret: 'dormdazeSecret',
      signOptions: {expiresIn: '0.5hr'},
      global: true
    })
  ],

})

export class AppModule {}
