import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CatsService } from '../api/cats.service';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { Cat } from '../model/Cat';
import { Breed } from '../model/Breed';
/**
 * Class una
 *  @extends ProductType
 */
@Component({
  selector: 'app-breed-info',
  templateUrl: './breed-info.component.html',
  styleUrls: ['./breed-info.component.css']
})
export class BreedInfoComponent {
  /**
   * Tipos de productos seleccionados
   * @type {string[] | null}
   * @public
  */
  public cat$: BehaviorSubject<Cat> = new BehaviorSubject<Cat>({} as Cat);
  public catBreeds$: Observable<Breed[]> = new Observable<Breed[]>();
  private subcriptions: Subscription[] = [];



  public breed: Breed = {} as Breed;
 /**
   * @constructor
   * @param {Router} router - Router service.
   * @param {RoutingState} routingState - Routing State service.
   */
  constructor(private activatedRoute: ActivatedRoute, private catService: CatsService) {
    this.subcriptionToBreedOfService();
  }
/**
   * Establecer el número de productos por su tipo
   * @param {string} type : ProductType Name
   * @param {number} count : ProductType Count
   * @public
   */
  private subcriptionToBreedOfService():void {
    let newSubcription = this.catService.getBreed$()
    .subscribe((_breed: Breed)=>{
      this.breed = _breed;
    })
    this.subcriptions.push(newSubcription);
  }

  ngOnInit(): void {
    let id_breed = this.activatedRoute.snapshot.paramMap.get('id');
    //let pos_breed = this.activatedRoute.snapshot.paramMap.get('pos_breed');
    if(!!id_breed){
      let newSubcription = this.catService.getCatBybreed_DB(id_breed)
      .subscribe((_cat: Cat[])=>{
        this.cat$.next(_cat[0]);
      })
      this.subcriptions.push(newSubcription);
    }
  }

  ngOnDestroy(): void {
    this.subcriptions.forEach(s => s.unsubscribe());
  }
}
