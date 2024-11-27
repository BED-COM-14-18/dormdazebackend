import { Module } from '@nestjs/common';
import { LandlordService } from './landlord.service';
import { LandlordController } from './landlord.controller';
import { Landlord } from './entities/landlord.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ListingModule } from 'src/listing/listing.module';


@Module({
  imports: [TypeOrmModule.forFeature([Landlord]), ListingModule],
  controllers: [LandlordController],
  providers: [LandlordService],
  exports: [LandlordService]
})
export class LandlordModule {}
