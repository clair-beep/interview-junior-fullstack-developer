import { Controller, Get, Query } from '@nestjs/common';
import { City } from './city.model';
import { CityService } from './city.service';

@Controller('cities')
export class CityController {
    constructor(private readonly cityService: CityService) { }

    @Get('search')
    searchCities(
        @Query('searchTerm') searchTerm: string,
        @Query('page') page: number = 1,
    ): City[] {
        // If searchTerm is not provided or empty, return an empty array
        if (!searchTerm || searchTerm.trim().length === 0) {
            return [];
        }

        // Set the number of entries per page to 5
        const pageSize = 5;
        const matchingCities = this.cityService.searchCities(
            searchTerm,
            page,
            pageSize,
        );

        return matchingCities;
    }
}
