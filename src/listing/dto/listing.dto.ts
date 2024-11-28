import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNotEmpty, IsNumber, IsString, IsPositive, IsUrl,  } from "class-validator";

export class ListingDto {
 
 
  @ApiProperty({
    description: 'Name of the hostel',

  })
  
  @IsString()
  Hostelname: string;

  @ApiProperty({
    description: 'Description of the hostel',

  })
  @IsNotEmpty()
  @IsString()  
  description: string;

  @ApiProperty({
    description: 'type of the room',

  })
  @IsNotEmpty()
  @IsArray()
  @IsString({ each: true })
  roomType: string[];



  @ApiProperty({
    description: 'Monthly rental fee',
  })
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  rentalFee: number;

  @ApiProperty({
    description: 'Array of image URLs for the accommodation',
    type: [String],
    required: true,
  })
  @IsArray()
  @IsUrl({}, { each: true })
  image: string[];


}