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
  isInputFocused: boolean = false;
  selectedCity: any;
  page: number = 1;
  constructor(private http: HttpClient) { }


  onInputFocus() {
    this.isInputFocused = true;
  }

  onInputBlur() {
    this.isInputFocused = false;
  }

  onCitySelect(city: any) {
    this.selectedCity = city;
  }

  onSubmit() {
    if (this.searchTerm.trim().length === 0) {
      return; // Do not search if the search term is empty
    }


    // Call the backend endpoint to fetch the search results
    this.http.get<any[]>(`http://localhost:3001/cities/search?searchTerm=${this.searchTerm}&page=${this.page}`)
      .subscribe((data) => {
        this.cities = data;
      });
  }

  onNextPage() {
    this.page++;
    this.onSubmit();
  }

  onBackPage() {
    if (this.page > 1) {
      this.page--;
      this.onSubmit();
    }
  }
}
