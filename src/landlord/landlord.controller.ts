import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LandlordService } from './landlord.service';
import { LandlordDto } from './dto/landlord.dto';
import { UpdateLandlordDto } from './dto/updatelandlord.dto';
import { SignUpDto } from 'src/auth/dto/SignUp.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Landlord')
@Controller('Landlord')
export class LandlordController {
  constructor(private readonly landlordService: LandlordService) {}

  @Post()
  create(@Body() landlordDto: SignUpDto) {
    return this.landlordService.create(landlordDto);
  }

  @Get()
  findAll() {
    return this.landlordService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.landlordService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateLandlordDto: UpdateLandlordDto) {
    return this.landlordService.update(+id, updateLandlordDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.landlordService.remove(+id);
  }
}
