import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsEnum, IsNumber, IsPositive } from 'class-validator';

export class SearchfilteringDto {
  @ApiProperty({ description: 'Location type (urban or rural)', required: false })
  @IsOptional()
  @IsEnum(['urban', 'rural'])
  locationType?: 'urban' | 'rural';

  @ApiProperty({ description: 'Minimum space available for accommodation', required: false })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  spaceAvailable?: number;

 /* @ApiProperty({ description: 'Maximum rental fee', required: false })
  @IsOptional()
  @IsNumber()
  rentalFee?: number; */

  @ApiProperty({ description: 'Property type (e.g., apartment, house)', required: false })
  @IsOptional()
  @IsString()
  roomType?: string;

  @ApiProperty({ description: 'Minimum rental fee', required: false })
  @IsOptional()
  @IsNumber()
  rentalfee_Min?: number;

  @ApiProperty({ description: 'Maximum rental fee', required: false })
  @IsOptional()
  @IsNumber()
  rentalfee_Max?: number;
}
