import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-city-search',
  templateUrl: './city-search.component.html',
  styleUrls: ['./city-search.component.scss']
})
export class CitySearchComponent {
  searchTerm: string = '';
  cities: any[] = [];

  constructor(private http: HttpClient) { }

  onSubmit() {
    if (this.searchTerm.trim().length === 0) {
      return; // Do not search if the search term is empty
    }

    // Call the backend endpoint to fetch the search results
    this.http.get<any[]>(`http://localhost:3001/cities/search?searchTerm=${this.searchTerm}`)
      .subscribe((data) => {
        this.cities = data;
      });
  }
}
