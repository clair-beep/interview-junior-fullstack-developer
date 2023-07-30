import { Test, TestingModule } from '@nestjs/testing';
import { CityService } from './city.service';

describe('CityService', () => {
  let service: CityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CityService],
    }).compile();

    service = module.get<CityService>(CityService);

    service['cities'] = [];
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return matching cities for a given search term', () => {
    // Mock the cities data
    const mockCities = [
      {
        "uuid": "b1c08e86-c043-4e5b-8a96-e581f75d82f1",
        "cityName": "Norderstedt",
        "count": 503
      },
      {
        "uuid": "afe8ff22-b736-4ea6-b9c3-aae4f4f4cd7b",
        "cityName": "Delmenhorst",
        "count": 743
      },
      {
        "uuid": "1c73a42d-9f6a-4b38-85bc-c482915db449",
        "cityName": "Villingen-Schwenningen",
        "count": 65
      },
    ];

    //setting up mockdata
    service['cities'] = mockCities;

    const searchTerm = 'Delmenhorst';
    const page = 1;
    const pageSize = 2;

    const result = service.searchCities(searchTerm, page, pageSize);

    expect(result).toEqual([
      {
        uuid: 'afe8ff22-b736-4ea6-b9c3-aae4f4f4cd7b',
        cityName: 'Delmenhorst',
        count: 743,
      },
    ]);
  });

  it('should return an empty array if search term is not provided', () => {
    const searchTerm = '';
    const page = 1;
    const pageSize = 2;

    const result = service.searchCities(searchTerm, page, pageSize);

    expect(result).toEqual([]);
  });

  it('should return an empty array if no matching cities are found', () => {
    // Mock the cities data
    const mockCities = [
      {
        "uuid": "b1c08e86-c043-4e5b-8a96-e581f75d82f1",
        "cityName": "Norderstedt",
        "count": 503
      },
      {
        "uuid": "afe8ff22-b736-4ea6-b9c3-aae4f4f4cd7b",
        "cityName": "Delmenhorst",
        "count": 743
      },
      {
        "uuid": "1c73a42d-9f6a-4b38-85bc-c482915db449",
        "cityName": "Villingen-Schwenningen",
        "count": 65
      },
    ];
    //setting up mockdata
    service['cities'] = mockCities;

    const searchTerm = 'NonExistentCity';
    const page = 1;
    const pageSize = 2;

    const result = service.searchCities(searchTerm, page, pageSize);

    expect(result).toEqual([]);
  });
});
