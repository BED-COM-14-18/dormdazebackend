import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookingService } from './booking.service';
import { BookingController } from './booking.controller';
import { Booking } from './entities/booking.entity';
import { Listing } from 'src/listing/entities/listing.entity';


@Module({
  imports: [
    TypeOrmModule.forFeature([Booking, Listing]),  
    
  ],
  providers: [BookingService],
  controllers: [BookingController],
})
export class BookingModule {}
