import { PartialType } from '@nestjs/mapped-types';
import { LandlordDto } from './landlord.dto';

export class UpdateLandlordDto extends PartialType(LandlordDto) {}
