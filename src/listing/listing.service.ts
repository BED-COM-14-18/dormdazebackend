import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Listing } from 'src/listing/entities/listing.entity';
import { ListingDto } from './dto/listing.dto';
import { UpdateListingDto } from './dto/updatelisting.dto';
import { Searchfiltering } from 'src/searchfiltering/entities/searchfiltering.entity';

@Injectable()
export class ListingService {
  constructor(
    @InjectRepository(Listing)
    private readonly accommodationRepository: Repository<Listing>,
  ) {}

  async findById(id: number): Promise<Listing | null> {
    return this.accommodationRepository.findOne({ where: { id } });
  }

  async findAll(searchDto: Searchfiltering): Promise<Listing[]> {
    const queryBuilder = this.accommodationRepository.createQueryBuilder('accommodation');

    if (searchDto.rentalfee) {
      queryBuilder.andWhere('accommodation.rentalFee <= :rentalFee', {
        rentalFee: searchDto.rentalfee,
      });
    }

    if (searchDto.roomType) {
      queryBuilder.andWhere('accommodation.roomType= :roomType', {
        roomType: searchDto.roomType,
      });
    }

    if (searchDto.rentalfee_Min) {
      queryBuilder.andWhere('accommodation.rentalFee >= :rentalfee_Min', {
        rentalfee_Min: searchDto.rentalfee_Min,
      });
    }

    if (searchDto.rentalfee_Max) {
      queryBuilder.andWhere('accommodation.rentalFee <= :rentalfee_Max', {
        rentalfee_Max: searchDto.rentalfee_Max,
      });
    }

    return queryBuilder.getMany();
  }

  async findByUserId(accomodation_id: number): Promise<Listing | null> {
    return this.accommodationRepository.findOneBy({ id: accomodation_id }); 
  }

  async create(listingDto: ListingDto): Promise<Listing> {
    return this.accommodationRepository.save(listingDto);
  }

  async update(id: number, updateAccomodationListingDto: UpdateListingDto): Promise<void> {
    await this.accommodationRepository.update(id, UpdateListingDto);
  }

  async remove(id: number): Promise<void> {
    await this.accommodationRepository.delete(id);
  }
}

