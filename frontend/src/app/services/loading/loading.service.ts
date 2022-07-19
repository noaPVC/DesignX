import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  dashboardLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)
  authLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)

  constructor() { }

  resetSubjectBehaviours() {
    this.dashboardLoading.next(false)
    this.authLoading.next(false)
  }
}
