import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  public isLoading$ = new BehaviorSubject<boolean>(false);

  show() {
    console.log('call loader ')
    this.isLoading$.next(true);
  }

  hide() {
    this.isLoading$.next(false);
  }
}
