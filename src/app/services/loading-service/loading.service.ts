import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  private loading$ : BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)

  constructor() { }

  get loading_() {
    return this.loading$
  }

  public changeLoading(boolean: boolean) {
    this.loading$.next(boolean)
  }
}
