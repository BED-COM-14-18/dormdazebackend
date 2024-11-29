
import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsDateString, IsNumber } from 'class-validator';

export class BookingDto {

  @ApiProperty({
    description: 'Listing ID being booked',
  })
  @IsUUID()
  listingId: string; 

  @ApiProperty({
    description: 'Check-in date for the booking',
  })
  @IsDateString()  
  checkInDate: string;  

  @ApiProperty({
    description: 'Check-out date for the booking',
  })
  @IsDateString()  
  checkOutDate: string;  

  @ApiProperty({
    description: 'Total price for the booking',
    required: true,
  })
   
  @IsNumber()  
  totalPrice?: number;
}
