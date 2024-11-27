import { Controller, Get, Post, Param, Body, Patch, Delete } from '@nestjs/common';
import { BookingService } from './booking.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { BookingResponseDto } from './dto/booking-response.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Booking')
@Controller('bookings')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  // Create a new booking
  @Post()
  async createBooking(@Body() createBookingDto: CreateBookingDto): Promise<BookingResponseDto> {
    return this.bookingService.createBooking(createBookingDto);  // Pass the entire DTO to the service
  }

  // Get all bookings
  @Get()
  async getAllBookings(): Promise<BookingResponseDto[]> {
    return this.bookingService.getAllBookings();  // Call the service to fetch all bookings
  }

  // Get a booking by ID
  @Get(':id')
  async getBooking(@Param('id') id: string): Promise<BookingResponseDto> {
    return this.bookingService.getBookingById(id);  // Get booking by ID
  }

  // Update a booking
  @Patch(':id')
  async updateBooking(@Param('id') id: string, @Body() updateBookingDto: UpdateBookingDto): Promise<BookingResponseDto> {
    return this.bookingService.updateBooking(id, updateBookingDto);  // Update a booking
  }

  // Delete a booking
  @Delete(':id')
  async deleteBooking(@Param('id') id: string): Promise<void> {
    return this.bookingService.deleteBooking(id);  // Delete a booking by ID
  }

  // Delete all bookings
  @Delete('delete-all')
  async deleteAllBookings(): Promise<string> {
    await this.bookingService.deleteAllBookings();
    return 'All bookings have been deleted';
  }
}

