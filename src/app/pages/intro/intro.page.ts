import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonSlides } from '@ionic/angular';
import { Storage } from '@capacitor/storage';
import { AppConstants } from 'src/app/app.constants';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
})
export class IntroPage implements OnInit {

  @ViewChild(IonSlides)slides: IonSlides;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  next() {
    this.slides.slideNext();
  }
 
  async start() {
    await Storage.set({key: AppConstants.INTRO_KEY, value: 'true'});
    this.router.navigateByUrl('/login', { replaceUrl:true });
  }

}
