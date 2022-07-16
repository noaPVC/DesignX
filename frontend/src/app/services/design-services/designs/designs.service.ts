import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Design } from 'src/app/models/design.model';

@Injectable({
  providedIn: 'root'
})
export class DesignsService {

  constructor(private httpClient: HttpClient) {}

  allDesigns(): Observable<any> {
    return this.httpClient.get<Design[]>('/designs/all')
  }

  exploreDesigns(): Observable<any> {
    return this.httpClient.get<Design[]>('/designs/explore')
  }

  savedDesigns(): Observable<any> {
    return this.httpClient.get<Design[]>('/designs/saved')
  }

  searchDesigns(term: string): Observable<any> {
    return this.httpClient.get<Design[]>(`/designs/search/${term}`)
  }

  recentDesigns(): Observable<any> {
    return this.httpClient.get<Design[]>('/designs/recent')
  }
}
