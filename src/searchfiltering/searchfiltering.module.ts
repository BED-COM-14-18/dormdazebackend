import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SearchfilteringService } from './searchfiltering.service';
import { SearchfilteringController } from './searchfiltering.controller';
import { Searchfiltering } from './entities/searchfiltering.entity';
import { Listing } from 'src/listing/entities/listing.entity';
import { ListingModule } from 'src/listing/listing.module';

@Module({
    imports: [ListingModule, TypeOrmModule.forFeature([Searchfiltering])], 
    providers: [SearchfilteringService],
    controllers: [SearchfilteringController],
})
export class SearchfilteringModule {}
