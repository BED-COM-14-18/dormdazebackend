
import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ListingService } from './listing.service';
import { ListingDto } from './dto/listing.dto';
import { UpdateListingDto } from './dto/updatelisting.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Searchfiltering } from 'src/searchfiltering/entities/searchfiltering.entity';

@ApiTags('Listings')
@Controller('listing')
export class ListingController {
  constructor(private readonly listingService: ListingService) {}
  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.listingService.findById(id);
  }

  @Get()
  async findAll(@Query() searchfilteringDto: Searchfiltering) {
    return this.listingService.findAll(searchfilteringDto); 
  }

  @Post()
  @ApiOperation({ summary: 'Create a new hostel listing' })
  @ApiBody({
    description: 'Details of the accommodation to be created',
    type: ListingDto, 
  })
  @ApiResponse({
    status: 201,
    description: 'hostel listing successfully uploaded.',
    type: ListingDto,
  })
  async create(@Body() listingDto: ListingDto) {
    return this.listingService.create(listingDto);
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() updateListingDto: UpdateListingDto) {
    return this.listingService.update(id, updateListingDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.listingService.remove(id);
  }
}