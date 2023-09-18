import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

import { Cat} from '../model/Cat';
import { Breed } from '../model/Breed';

const URL = 'https://api.thecatapi.com/v1';

@Injectable({
  providedIn: 'root'
})

export class CatsService {

  private cat$: BehaviorSubject<Cat[]> = new BehaviorSubject<Cat[]>([]);
  private breed$: BehaviorSubject<Breed> = new BehaviorSubject<Breed>({} as Breed);
  private breeds$: BehaviorSubject<Breed[]> = new BehaviorSubject<Breed[]>([]);

  constructor(private http : HttpClient) {}
 /**
   * Obtiene el número de productos por su tipo
   * @param {string} type : ProductType Name
   * @return {number} count
   * @private
   */
  public getCatBybreed_DB(breed_id: String | null): Observable<Cat[]>{
    const _URL = URL+'/images/search?breed_ids='+breed_id;
    return this.http.get<Cat[]>(_URL);
  }

  public getBreeds_DB(): Observable<Breed[]>{
    const _URL = URL+'/breeds';
    return this.http.get<Breed[]>(_URL);
  }

  public getCatbyId_DB(cat_id: String): Observable<Cat>{
    const _URL = URL+'/images/'+cat_id;
    return this.http.get<Cat>(_URL);
  }

  public getCat$(): Observable<Cat[]>{
    return this.cat$.asObservable();
  }

  public getBreed$(): Observable<Breed>{
    return this.breed$.asObservable();
  }

  public getBreeds$(): Observable<Breed[]>{
    return this.breeds$.asObservable();
  }

  /*public setCat(cat: Cat): void{
    this.cat$.next([cat]);
  }*/

  public setCat$(_cat$: Cat[]): void{
    this.cat$.next(_cat$);
  }

  public setBreeds$(_catBreeds$: Breed[]): void{
    this.breeds$.next(_catBreeds$);
  }

  public setBreed$(catBreed: Breed): void {
    this.breed$.next(catBreed);
  }


}



