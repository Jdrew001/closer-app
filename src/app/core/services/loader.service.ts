import { Injectable } from '@angular/core';
import { LoadingController, LoadingOptions } from '@ionic/angular';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  private shouldLoadSubject: Subject<boolean> = new Subject();
  shouldLoad$ = this.shouldLoadSubject.asObservable();

  constructor(
    private loadingController: LoadingController
  ) { }

  toggleLoader(shouldLoad) {
    this.shouldLoadSubject.next(shouldLoad);
  }
}
