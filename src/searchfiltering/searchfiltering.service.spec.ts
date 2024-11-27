import { Test, TestingModule } from '@nestjs/testing';
import { SearchfilteringService } from './searchfiltering.service';

describe('SearchfilteringService', () => {
  let service: SearchfilteringService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SearchfilteringService],
    }).compile();

    service = module.get<SearchfilteringService>(SearchfilteringService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
