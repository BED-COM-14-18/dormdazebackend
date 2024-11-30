import { Injectable } from '@nestjs/common';
import { SearchfilteringDto } from './dto/create-searchfiltering.dto';
import { UpdateSearchfilteringDto } from './dto/update-searchfiltering.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Searchfiltering } from './entities/searchfiltering.entity';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class SearchfilteringService {
  constructor(
    @InjectRepository(Searchfiltering)
    private readonly searchFilterRepository: Repository<Searchfiltering>,
  ) {}

  async create(createSearchfilteringDto: SearchfilteringDto) {
    try {
      // Manually map DTO to entity
      const searchFilter = this.searchFilterRepository.create(createSearchfilteringDto);
      
      // Save to the database
      return await this.searchFilterRepository.save(searchFilter);
    } catch (error) {
      console.error('Error creating search filter:', error);
      throw new Error('Failed to create search filter');
    }
  }

  async findAll() {
    return this.searchFilterRepository.find();
  }

  async findOne(id: string): Promise<Searchfiltering | null> {
    const searchFilter = await this.searchFilterRepository.findOne({
      where: { searchfilter_id: id }, // Correct property
    });
    if (!searchFilter) {
      throw new NotFoundException(`Search filter with ID ${id} not found`);
    }
    return searchFilter;
  }

  async update(id: string, updateSearchfilteringDto: UpdateSearchfilteringDto) {
    await this.searchFilterRepository.update(id, updateSearchfilteringDto);
    return this.findOne(id); // Fetch the updated entity
  }

  async remove(id: string) {
    const result = await this.searchFilterRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Search filter with ID ${id} not found`);
    }
    return result;
  }
}
