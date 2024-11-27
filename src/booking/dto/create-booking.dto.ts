
import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsString, IsDateString, IsNumber, IsOptional } from 'class-validator';

export class CreateBookingDto {

  @ApiProperty({
    description: 'Accommodation ID being booked',
  })
  @IsUUID()
  accomodationId: string; 

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
