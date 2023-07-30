import { Injectable } from '@nestjs/common';
import { City } from './city.model';
import * as fs from 'fs';

@Injectable()
export class CityService {
    private cities: City[];

    constructor() {
        // Read the cities data from cities.json 
        const rawData = fs.readFileSync('cities.json', 'utf8');
        this.cities = JSON.parse(rawData);
    }

    searchCities(searchTerm: string, page: number, pageSize: number): City[] {
        // Convert the search term to lowercase for case-insensitive search
        const searchQuery = searchTerm.toLowerCase().trim();

        // Perform the city search based on the cityName property
        const matchingCities = this.cities.filter((city) =>
            city.cityName.toLowerCase().includes(searchQuery)
        );

        // Calculate the start index and end index for pagination
        const startIndex = (page - 1) * pageSize;
        const endIndex = startIndex + pageSize;

        // Return the paginated results (up to 5 entries per page)
        return matchingCities.slice(startIndex, endIndex);
    }
}
