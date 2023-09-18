import { Injectable } from '@angular/core';
import { Cat } from '../model/Cat';
import { CatsService } from './cats.service';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CatsImageService {

  private cats$: BehaviorSubject<Cat[]> = new BehaviorSubject<Cat[]>([]);
  private cats: Cat[] =[];

  private subcriptions: Subscription[] = [];

  private limit_iteration = 50;
  private limit_iteration$:BehaviorSubject<number> = new BehaviorSubject<number>(50);

  constructor( private catService: CatsService) { }

  public resetCats():void{
    this.cats = [];
    this.cats$.next(this.cats);
    this.limit_iteration = 50;
    this.limit_iteration$.next(50);
  }

  public getCats$(): Observable<Cat[]>{
    return this.cats$.asObservable();
  }

  public listenToTheFullLimit():Observable<number>{
    return this.limit_iteration$.asObservable();
  }

  public uploadImages(breed_id: String): void{
    this.getImage(breed_id)
  }

  private getImage(breed_id:String){
    let newSubcription = this.catService.getCatBybreed_DB(breed_id)
    .subscribe((_cat: Cat[])=>{
      if(!!_cat[0].url){
        if(!this.repeatCat(_cat[0])){
          this.cats.push(_cat[0])
          this.cats$.next(this.cats);
        }
        if(this.limit_iteration>0){
          this.limit_iteration = this.limit_iteration-1;
          this.limit_iteration$.next(this.limit_iteration);
          this.getImage(breed_id)
        }
      }else{
        this.getImage(breed_id)
      }
    });
    this.subcriptions.push(newSubcription);
  }

  private repeatCat(_cat: Cat): boolean{
    let repeatcat = false;
    let i = 0;
    while(!repeatcat && i<= this.cats.length-1){
      let cat = this.cats[i];
      if(cat.url === _cat.url){
        repeatcat = true;
      }
      i+=1;
    }
    return repeatcat;
  }

  ngOnDestroy(): void {
    this.subcriptions.forEach(s => s.unsubscribe());
  }

}
