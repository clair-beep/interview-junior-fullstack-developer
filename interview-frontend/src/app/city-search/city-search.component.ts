import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

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

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.searchTerm = params['searchTerm'] || '';
      this.page = +params['page'] || 1;

      this.fetchCities();
    });
  }

  fetchCities() {
    const lowerCaseSearchTerm = this.searchTerm.toLowerCase();
    this.http.get<any[]>(`http://localhost:3001/cities/search?searchTerm=${encodeURIComponent(lowerCaseSearchTerm)}&page=${this.page}`)
      .subscribe((data) => {
        this.cities = data;
      });
  }

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

    // Update the URL with new query parameters
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { searchTerm: this.searchTerm, page: this.page },
      queryParamsHandling: 'merge'
    });

    // Fetch data based on the updated query parameters
    this.fetchCities();
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