import { Component, Input } from '@angular/core';
import { BehaviorSubject, Subscription,} from 'rxjs';
import { Cat } from '../model/Cat';
import { CatsImageService } from '../api/cats-image.service';

@Component({
  selector: 'app-carousel-gallery',
  templateUrl: './carousel-gallery.component.html',
  styleUrls: ['./carousel-gallery.component.css']
})
export class CarouselGalleryComponent {

  public cat1$: BehaviorSubject<Cat> = new BehaviorSubject<Cat>({} as Cat);
  public cat2$: BehaviorSubject<Cat> = new BehaviorSubject<Cat>({} as Cat);
  public cat3$: BehaviorSubject<Cat> = new BehaviorSubject<Cat>({} as Cat);

  public catsHistory$: BehaviorSubject<Cat[]> = new BehaviorSubject<Cat[]>([])

  public cats: Cat[] =[];

  public cat1: Cat = {} as Cat;
  public cat2: Cat = {} as Cat;
  public cat3: Cat = {} as Cat;

  public catsHistory: Cat[] = [];
  private pos: number = 0;
  private hide_div: HTMLElement | null = null;
  private disable_btn: HTMLElement | null = null;

  private rotateY = 0;

  private subcriptions: Subscription[] = [];

  @Input() breed_id!: string;

  constructor(private catImagesService: CatsImageService){}
  ngOnInit(): void {
    this.catsHistory= [];
    this.catImagesService.resetCats();
    this.catImagesService.uploadImages(this.breed_id);
    let newSubcription = this.catImagesService.getCats$().subscribe((cats: Cat[])=>{
      this.catsHistory$.next(cats);
      this.catsHistory = cats;
    });
    this.subcriptions.push(newSubcription);
    this.initSetCatsInDiv();
    let id_button = 'btn_1_left';
    setTimeout(() => {
      this.disableButtonAndDiv(3, id_button)
      this.disableButtonsOfCards(1);
    }, 0.001);
  }

  private initSetCatsInDiv(): void{
    let newSubcription = this.catsHistory$
      .subscribe((cats: Cat[])=>{
        if(cats.length === 1){
          this.cat1$.next(cats[0])
        }
        if(cats.length === 2){
          this.cat2$.next(cats[1])
        }
        if(cats.length === 3){
          this.cat3$.next(cats[2])
        }
      })
    this.subcriptions.push(newSubcription);
  }


  public animation(direction:String, cardCurrent: Number, cardRight: Number, cardLeft: Number){
    this.activeButtonAndDiv();
    let cardsContent = document.getElementById('cards_content');
    if(cardsContent){
      let rotateYEnd;
      if(direction === 'right'){
        rotateYEnd = this.rotateY-120;
        this.pos = this.pos+1;
      }else{
        rotateYEnd = this.rotateY+120;
        this.pos = this.pos-1;
      }
      this.imageSettingMaster(cardRight, cardLeft);
      this.carouselStartAndEnd(cardCurrent, cardRight, cardLeft);
      this.disableButtonsOfCards(cardCurrent);
      this.applyAnimation(cardsContent, this.rotateY.toString(), rotateYEnd.toString());
    }
  }
  private disableButtonsOfCards(cardCurrent: Number) {
    if(cardCurrent == 1){
      setTimeout(() => {
        this.activeDivButtons('div_btns_1')
      }, 1500);
      this.hideDivButton('div_btns_2')
      this.hideDivButton('div_btns_3')
    }else if(cardCurrent == 2){
      setTimeout(() => {
        this.activeDivButtons('div_btns_2')
      }, 1500);
      this.hideDivButton('div_btns_1')
      this.hideDivButton('div_btns_3')
    }else if(cardCurrent==3){
      setTimeout(() => {
        this.activeDivButtons('div_btns_3')
      }, 1500);
      this.hideDivButton('div_btns_2')
      this.hideDivButton('div_btns_1')
    }
  }

  private hideDivButton(id_div_btns: string){
    let div_btns = document.getElementById(id_div_btns)!;
    div_btns?.classList.add('hide');
  }

  private activeDivButtons(id_div_btns: string){
    let div_btns = document.getElementById(id_div_btns)!;
    div_btns?.classList.remove('hide');
  }

  private carouselStartAndEnd(cardCurrent: Number, cardRight: Number, cardLeft: Number) {
    if (this.pos > this.catsHistory.length-1){
      let id_button = 'btn_'+cardCurrent+'_right';
      setTimeout(() => {
        this.disableButtonAndDiv(cardRight, id_button)
      }, 1010);
    }else if (this.pos == 0){
      let id_button = 'btn_'+cardCurrent+'_left';
      setTimeout(() => {
        this.disableButtonAndDiv(cardLeft, id_button)
      }, 1010);
    }
  }

  private disableButtonAndDiv(carNext: Number, id_button: string):void {
    let disable_btn = document.getElementById(id_button);
    disable_btn?.setAttribute('disabled', 'true');
    disable_btn?.classList.add('disabled');
    // disable_btn?.classList.add('hide');
    this.disable_btn = disable_btn;

    let hide_div = document.getElementById('card_'+carNext)!;
    hide_div?.classList.add('hide');
    this.hide_div = hide_div;
  }

  private activeButtonAndDiv():void {
    setTimeout(() => {
      this.disable_btn?.removeAttribute('disabled');
      this.disable_btn?.classList.remove('disabled')
      // this.disable_btn?.classList.remove('hide');
      this.hide_div?.classList.remove('hide');
    }, 1000);
  }

  private imageSettingMaster(cardRight: Number, cardLeft: Number) {
    if(this.pos < this.catsHistory.length-1 && this.pos > 0){
      let pos_nex = this.pos+1;
      this.imageSetting(cardRight, pos_nex);
      let pos_prev = this.pos-1;
      this.imageSetting(cardLeft, pos_prev);
    }
  }

  private imageSetting(card: Number, pos: number): void{
      setTimeout(() => {
        if(card == 1){
          this.cat1$.next(this.catsHistory[pos]);
        }else if(card == 2){
          this.cat2$.next(this.catsHistory[pos]);
        }else if(card == 3){
          this.cat3$.next(this.catsHistory[pos]);
        }
      }, 1000);
    }
  private applyAnimation(cardsContent: HTMLElement, yInit: String, yEnd: String){
    cardsContent.animate(
      [
        // fotogramas clave
        { transform: "translateZ(-30vw) rotateY("+yInit+")" },
        { transform: "translateZ(-30vw) rotateY("+yEnd+"deg)" },
      ],
      {
        // opciones de sincronización
        duration: 3000,
        iterations: 1,
        easing: 'cubic-bezier(0.77, 0, 0.175, 1)',
        fill: 'forwards'
        // animation: carousel_left 5s cubic-bezier(0.77, 0, 0.175, 1) forwards;
        // animation-iteration-count: 1;
      },
    );
    setTimeout(() => this.rotateY = Number.parseInt(yEnd.toString()), 3000);
  }

  ngOnDestroy(): void {
    this.subcriptions.forEach(s => s.unsubscribe());
  }
}
