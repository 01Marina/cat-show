import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { HomeComponent } from './home/home.component';
import { LoadingComponent } from './loading/loading.component';
import { FooterComponent } from './footer/footer.component';
import { CarouselGalleryComponent } from './carousel-gallery/carousel-gallery.component';
import { BreedsComponent } from './breeds/breeds.component';
import { BreedInfoTrueOrFalseStatisticsComponent } from './breed-info-true-or-false-statistics/breed-info-true-or-false-statistics.component';
import { BreedInfoComponent } from './breed-info/breed-info.component';
import { BreedInfoLevelStatisticsComponent } from './breed-info-level-statistics/breed-info-level-statistics.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    LoadingComponent,
    FooterComponent,
    CarouselGalleryComponent,
    BreedsComponent,
    BreedInfoTrueOrFalseStatisticsComponent,
    BreedInfoComponent,
    BreedInfoLevelStatisticsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
