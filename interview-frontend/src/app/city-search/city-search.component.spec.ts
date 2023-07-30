import { CitySearchComponent } from './city-search.component';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs'; // Import 'of' operator to create an observable with test data

describe('CitySearchComponent', () => {
  let component: CitySearchComponent;
  let httpClientMock: jasmine.SpyObj<HttpClient>; // Create a mock of HttpClient

  beforeEach(() => {
    // Create a mock of HttpClient
    httpClientMock = jasmine.createSpyObj('HttpClient', ['get']);

    // Create an instance of the component and inject the mock HttpClient
    component = new CitySearchComponent(httpClientMock);
  });

  it('should call the backend endpoint with the correct search term when onSubmit() is called', () => {
    const searchTerm = 'test';
    const expectedUrl = `http://localhost:3001/cities/search?searchTerm=${searchTerm}`;

    // Set the searchTerm to the desired value
    component.searchTerm = searchTerm;

    // Mock the HTTP get request with an observable that returns test data
    const testData = [{ name: 'City 1' }, { name: 'City 2' }];
    httpClientMock.get.and.returnValue(of(testData));

    // Call the onSubmit() method
    component.onSubmit();

    // Assert that the get method of HttpClient was called with the correct URL
    expect(httpClientMock.get).toHaveBeenCalledWith(expectedUrl);

    // Assert that the cities array is updated with the test data returned from the backend
    expect(component.cities).toEqual(testData);
  });

  it('should not call the backend endpoint when onSubmit() is called with an empty search term', () => {
    // Set the searchTerm to an empty string
    component.searchTerm = '';

    // Call the onSubmit() method
    component.onSubmit();

    // Assert that the get method of HttpClient was not called
    expect(httpClientMock.get).not.toHaveBeenCalled();

    // Assert that the cities array remains empty
    expect(component.cities).toEqual([]);
  });
});
