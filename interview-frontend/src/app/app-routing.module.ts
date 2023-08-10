import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CitySearchComponent } from './city-search/city-search.component';

const routes: Routes = [
  { path: 'search', component: CitySearchComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
