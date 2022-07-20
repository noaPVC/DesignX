import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  authLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)
  dashboardLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)
  recentsLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)

  constructor() { }

  resetSubjectBehaviours() {
    this.authLoading.next(false)
    this.dashboardLoading.next(false)
    this.recentsLoading.next(false)
  }
}
