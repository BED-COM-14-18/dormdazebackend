import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Booking } from './entities/booking.entity';
import { BookingDto } from './dto/create-booking.dto';
import { Listing } from 'src/listing/entities/listing.entity';
import { BookingResponseDto } from './dto/booking-response.dto';
import { LessThanOrEqual, MoreThanOrEqual } from 'typeorm';

@Injectable()
export class BookingService {
  constructor(
    @InjectRepository(Booking)
    private bookingRepository: Repository<Booking>,
    @InjectRepository(Listing)
    private listingRepository: Repository<Listing>,
  ) {}

  async createBooking(createBookingDto: BookingDto): Promise<BookingResponseDto> {
    const {  listingId, checkInDate, checkOutDate } = createBookingDto; 

    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);

    const room = await this.listingRepository.findOne({
      where: { id: listingId },
    });

    if (!room) {
      throw new NotFoundException('room not found');
    }


    
    const existingBookings = await this.bookingRepository.find({
      where: {
      
        checkInDate: LessThanOrEqual(checkOut), 
        checkOutDate: MoreThanOrEqual(checkIn), 
      },
    });

    if (existingBookings.length > 0) {
      throw new BadRequestException('room is already booked for the selected dates');
    }

    const booking = this.bookingRepository.create({
  
      
      checkInDate: checkIn,
      checkOutDate: checkOut,
      totalPrice: createBookingDto.totalPrice,
    });


    await this.bookingRepository.save(booking);

    await this.listingRepository.save(room);
   
    return this.mapToResponseDto(booking);
  }

  async getAllBookings(): Promise<BookingResponseDto[]> {
    const bookings = await this.bookingRepository.find();
    return bookings.map((booking) => this.mapToResponseDto(booking));
  }

  async getBookingById(id: string): Promise<BookingResponseDto> {
    const booking = await this.bookingRepository.findOne({
      where: { id },
    });
    if (!booking) {
      throw new NotFoundException('Booking not found');
    }
    return this.mapToResponseDto(booking);
  }

  async updateBooking(id: string, updateBookingDto: 
    
    BookingDto): Promise<BookingResponseDto> {
    const booking = await this.bookingRepository.findOne({
      where: { id },
    });
    if (!booking) {
      throw new NotFoundException('Booking not found');
    }

    booking.totalPrice = updateBookingDto.totalPrice;
    booking.checkInDate = new Date(updateBookingDto.checkInDate);
    booking.checkOutDate = new Date(updateBookingDto.checkOutDate);

    await this.bookingRepository.save(booking);

    return this.mapToResponseDto(booking);
  }

  async deleteBooking(id: string): Promise<void> {
    const booking = await this.bookingRepository.findOne({
      where: { id },
    });
    if (!booking) {
      throw new NotFoundException('Booking not found');
    }

    const room = await this.listingRepository.findOneBy({});
    if (room) {
      await this.listingRepository.save(room);
    }

   
    await this.bookingRepository.delete(id);
  }

 
  async deleteAllBookings(): Promise<string> {
    await this.bookingRepository.clear(); 
    return 'All bookings have been deleted';
  }

  
  mapToResponseDto(booking: Booking): BookingResponseDto {
    if (!booking) {
      throw new NotFoundException('Booking not found');
    }

    const checkInDate = new Date(booking.checkInDate);
    const checkOutDate = new Date(booking.checkOutDate);

    if (isNaN(checkInDate.getTime())) {
      throw new BadRequestException('Invalid check-in date');
    }

    if (isNaN(checkOutDate.getTime())) {
      throw new BadRequestException('Invalid check-out date');
    }

    return {
      checkInDate: checkInDate.toISOString(),
      checkOutDate: checkOutDate.toISOString(),
      totalPrice: booking.totalPrice,
    };
  }

}
