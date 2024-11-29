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
    private readonly repository: Repository<Listing>,
  ) {}

  async findById(id: string): Promise<Listing | null> {
    return this.repository.findOne({ where: { id } });
  }

  async findAll(searchDto: Searchfiltering): Promise<Listing[]> {
    const queryBuilder = this.repository.createQueryBuilder('accommodation');

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

  async findByUserId(accomodation_id: string): Promise<Listing | null> {
    return this.repository.findOneBy({ id: accomodation_id }); 
  }

  async create(listingDto: ListingDto): Promise<Listing> {
    return this.repository.save(listingDto);
  }

  async update(id: number, updateListingDto: UpdateListingDto): Promise<void> {
    await this.repository.update(id, updateListingDto);
  } 

  async remove(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}

