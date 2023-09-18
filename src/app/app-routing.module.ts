import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BreedsComponent } from './breeds/breeds.component';
import { BreedInfoComponent } from './breed-info/breed-info.component';

const routes: Routes = [
  {path: '',redirectTo: 'home',pathMatch: 'full' },
  {path: 'home', component: HomeComponent},
  {path: 'breeds', component: BreedsComponent},
  {path: 'breeds/catsbreed/idbreed/:id/:pos_breed', component: BreedInfoComponent},
  {path: 'breeds/breed/:id/cats', component: BreedInfoComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
