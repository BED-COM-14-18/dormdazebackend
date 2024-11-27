import { PartialType } from '@nestjs/swagger';
import { SearchfilteringDto } from './create-searchfiltering.dto';
import { IsOptional, IsString, IsBoolean, IsNumber, Min, Max } from 'class-validator';
import { Transform } from 'class-transformer';

export class UpdateSearchfilteringDto extends PartialType(SearchfilteringDto) {



    @IsOptional()
    @IsString()
    title?: string;
  
    @IsOptional()
    @IsString()
    roomType?: string;
  
    @IsOptional()
    @IsString()
    locationType?: 'urban' | 'rural';
  
    @IsOptional()
    @IsNumber()
    spaceAvailable?: number;
  
    @IsOptional()
    @IsNumber()
    @Min(0)
    min_price?: number;
  
    @IsOptional()
    @IsNumber()
    @Max(10000) 
    max_price?: number;
}
