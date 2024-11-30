import { Controller, Get, Post, Param, Body, Patch, Delete } from '@nestjs/common';
import { BookingService } from './booking.service';
import { BookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { BookingResponseDto } from './dto/booking-response.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Booking')
@Controller('bookings')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Post()
  async createBooking(@Body() createBookingDto: BookingDto): Promise<BookingResponseDto> {
    return this.bookingService.createBooking(createBookingDto); 
  }


  @Get()
  async getAllBookings(): Promise<BookingResponseDto[]> {
    return this.bookingService.getAllBookings(); 
  }

  @Get(':id')
  async getBooking(@Param('id') id: string): Promise<BookingResponseDto> {
    return this.bookingService.getBookingById(id); 
  }

 
  @Patch(':id')
  async updateBooking(@Param('id') id: string, @Body() updateBookingDto: UpdateBookingDto): Promise<BookingResponseDto> {
    return this.bookingService.updateBooking(id, updateBookingDto); 
  }

 
  @Delete(':id')
  async deleteBooking(@Param('id') id: string): Promise<void> {
    return this.bookingService.deleteBooking(id);  
  }

  @Delete('delete-all')
  async deleteAllBookings(): Promise<string> {
    await this.bookingService.deleteAllBookings();
    return 'All bookings have been deleted';
  }
}

