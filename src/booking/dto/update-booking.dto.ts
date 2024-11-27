import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID, IsNumber, IsDateString } from 'class-validator';

export class UpdateBookingDto {
  //@ApiProperty({ description: 'User ID of the person making the booking' })
  //@IsUUID()
  //userId: string;

  @ApiProperty({ description: 'Accommodation ID being booked' })
  @IsUUID()
  accomodationId: string;

  @ApiProperty({ description: 'Check-in date for the booking' })
  @IsDateString()
  checkInDate: string;

  @ApiProperty({ description: 'Check-out date for the booking' })
  @IsDateString()
  checkOutDate: string;

  //@ApiProperty()
  //@IsString()
  //status: string;

 // @ApiProperty()
 // @IsString()
  //paymentStatus: string;

  @ApiProperty()
  @IsNumber()
  totalPrice?: number;
}
