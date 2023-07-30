import { Test, TestingModule } from '@nestjs/testing';
import { CityController } from './city.controller';
import { CityService } from './city.service';

describe('CityController', () => {
  let controller: CityController;
  let service: CityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CityController],
      providers: [CityService],
    }).compile();

    controller = module.get<CityController>(CityController);
    service = module.get<CityService>(CityService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return matching cities', () => {
    // Mock the searchCities method in the CityService
    const mockSearchCities = jest.fn();
    mockSearchCities.mockReturnValue([
      {
        uuid: '123',
        cityName: 'Wilhelmshavenig',
        count: 461,
      },
    ]);
    service.searchCities = mockSearchCities;

    const searchTerm = 'Wilhelmshavenig';
    const page = 1;

    const result = controller.searchCities(searchTerm, page);

    expect(result).toEqual([
      {
        uuid: '123',
        cityName: 'Wilhelmshavenig',
        count: 461,
      },
    ]);

    expect(mockSearchCities).toHaveBeenCalledWith(searchTerm, page, 5);
  });
});
