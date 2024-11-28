import { PartialType } from '@nestjs/mapped-types';
import { ListingDto } from './listing.dto';
import { IsString, IsArray, IsNumber, IsOptional, IsPositive, IsUrl} from 'class-validator';

export class UpdateListingDto extends PartialType(ListingDto) {

   
    @IsString()
    Hostelname?: string; 
  
    @IsString()
    description?: string; 

    @IsArray()
    @IsString({ each: true })
    roomType?: string[];
  
    @IsNumber()
    @IsPositive()
    rentalFee?: number; 
  
    @IsOptional()
    @IsUrl({}, { each: true })
    image?: string[]; 

  
  }


