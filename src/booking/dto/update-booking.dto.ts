import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsNumber, IsDateString } from 'class-validator';

export class UpdateBookingDto {

  @ApiProperty({ description: 'listing ID being booked' })
  @IsUUID()
  listingId: string;

  @ApiProperty({ description: 'Check-in date for the booking' })
  @IsDateString()
  checkInDate: string;

  @ApiProperty({ description: 'Check-out date for the booking' })
  @IsDateString()
  checkOutDate: string;

  @ApiProperty()
  @IsNumber()
  totalPrice?: number;
}
