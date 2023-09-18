import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Img } from '../model/Img';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  public img$: BehaviorSubject<Img> = new BehaviorSubject<Img>({url: 'assets/catHome/cat_home_1.svg'});

  ngOnInit(): void {
    setInterval(this.animationTimer, 5000, this.img$);
  }

  private animationTimer(img$: BehaviorSubject<Img>):void{
    let img1: Img = {url: 'assets/catHome/cat_home_1.svg'}
    let img2: Img = {url: 'assets/catHome/cat_home_2.svg'}
    let img3: Img = {url: 'assets/catHome/cat_home_3.svg'}
    let img4: Img = {url: 'assets/catHome/cat_home_4.svg'}
    let img5: Img = {url: 'assets/catHome/cat_home_5.svg'}

    setTimeout(() => {
      img$.next(img2)
    }, 100);
    setTimeout(() => {
      img$.next(img3)
    }, 200);
    setTimeout(() => {
      img$.next(img4)
    }, 300);
    setTimeout(() => {
      img$.next(img5)
    }, 400);
    setTimeout(() => {
      img$.next(img4)
    }, 500);
    setTimeout(() => {
      img$.next(img3)
    }, 600);
    setTimeout(() => {
      img$.next(img2)
    }, 700);
    setTimeout(() => {
      img$.next(img1)
    }, 800);
  }

}
