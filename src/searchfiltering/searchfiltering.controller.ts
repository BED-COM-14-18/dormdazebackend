import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { SearchfilteringService } from './searchfiltering.service';
import { SearchfilteringDto } from './dto/create-searchfiltering.dto';
import { UpdateSearchfilteringDto } from './dto/update-searchfiltering.dto';
import { ApiTags } from '@nestjs/swagger';
import { ListingService } from 'src/listing/listing.service';
import { Listing } from 'src/listing/entities/listing.entity';
import { Searchfiltering } from 'src/searchfiltering/entities/searchfiltering.entity';

@ApiTags('Search & Filtering')
@Controller('searchfiltering')
export class SearchfilteringController {
  constructor(
    private readonly searchfilteringService: SearchfilteringService,
    private readonly accomodationListingService: ListingService,
  ) {}

  @Get()
  async findAll(@Query() searchDto: SearchfilteringDto): Promise<{ message: string; data: Listing[] }> {
    const searchFilter = new Searchfiltering();
    searchFilter.spaceAvailable = searchDto.spaceAvailable;
    searchFilter.roomType = searchDto.roomType;
    searchFilter.rentalfee_Min = searchDto.rentalfee_Min;
    searchFilter.rentalfee_Max = searchDto.rentalfee_Max;

    const accommodations = await this.accomodationListingService.findAll(searchFilter);

    if (accommodations.length === 0) {
      return { message: 'No accommodations found matching the search criteria', data: [] };
    }

    return { message: 'Accommodations found', data: accommodations };
  }

  @Post()
  create(@Body() createSearchfilteringDto: SearchfilteringDto) {
    return this.searchfilteringService.create(createSearchfilteringDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.searchfilteringService.findOne(id);
  }


  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSearchfilteringDto: UpdateSearchfilteringDto) {
    return this.searchfilteringService.update(id, updateSearchfilteringDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.searchfilteringService.remove(id);
  }
}
