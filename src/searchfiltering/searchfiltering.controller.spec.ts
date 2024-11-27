import { Test, TestingModule } from '@nestjs/testing';
import { SearchfilteringController } from './searchfiltering.controller';
import { SearchfilteringService } from './searchfiltering.service';

describe('SearchfilteringController', () => {
  let controller: SearchfilteringController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SearchfilteringController],
      providers: [SearchfilteringService],
    }).compile();

    controller = module.get<SearchfilteringController>(SearchfilteringController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
