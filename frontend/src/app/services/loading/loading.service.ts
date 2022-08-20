import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  loadingSubjects: BehaviorSubject<boolean>[] = []

  authLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)
  dashboardLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)
  recentsLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)

  constructor() {
    this.loadingSubjects.push(this.authLoading, this.dashboardLoading, this.recentsLoading)
  }

  resetSubjectBehaviours = () => this.loadingSubjects.forEach(subject => subject.next(false))
}
