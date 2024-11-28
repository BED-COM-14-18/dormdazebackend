import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminDto } from './dto/admin.dto';
import { UpdateAdminDto } from './dto/updateAdmin.dto';
import { SignUpDto } from 'src/auth/dto/SignUp.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Admin')
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post()
  create(@Body() adminDto: SignUpDto) {
    return this.adminService.create(adminDto);
  }

  @Get()
  findAll() {
    return this.adminService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.adminService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateAgentDto: UpdateAdminDto) {
    return this.adminService.update(+id, updateAgentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.adminService.remove(+id);
  }
}
