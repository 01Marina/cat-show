import { Component } from '@angular/core';
import { CatsService } from '../api/cats.service';
import { Breed } from '../model/Breed';
import { BehaviorSubject, Subscription } from 'rxjs';
import { Cat } from '../model/Cat';
import { Router } from '@angular/router';

@Component({
  selector: 'app-breeds',
  templateUrl: './breeds.component.html',
  styleUrls: ['./breeds.component.css']
})
export class BreedsComponent{


  breeds: Breed[] = [];
  cat_url$: BehaviorSubject<String>[] =  [];
  private subcriptions: Subscription[] = [];

  constructor(private catService: CatsService, private router: Router){
  }

  private subcriptionToBreedsOfService():void {
    let newSubcription = this.catService.getBreeds_DB()
    .subscribe((_breeds: Breed[])=>{
      this.breeds = _breeds;
      this.setCatbreesAndImgCat(this.breeds);
    })
    this.subcriptions.push(newSubcription);
  }

  ngOnInit(): void {
    this.subcriptionToBreedsOfService();
  }

  private setCatbreesAndImgCat(breeds:  Breed[]): void{
    breeds.forEach((breed, index: number)=>{
      //seteo en que posición del araay se encuentra, para luego encontrarlo de forma más eficiente
      breed.pos_in_array=index;
      //seteo la url de imagen muestra
      let newSubcription  = this.catService.getCatbyId_DB(breed.reference_image_id)
      .subscribe((cat:Cat)=>{
        breed.reference_image_url = cat.url;
      })
      this.subcriptions.push(newSubcription);
    })
    this.catService.setBreeds$(breeds);
  }

  public navigateToBreed(catBreed: Breed):void{
    this.catService.setBreed$(catBreed);
    let url: String= 'breeds/breed/'+catBreed.id+'/cats';
    this.router.navigate([url]);
  }

  ngOnDestroy(): void {
    this.subcriptions.forEach(s => s.unsubscribe());
  }

}
