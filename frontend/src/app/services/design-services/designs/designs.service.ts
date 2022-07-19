import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Design } from 'src/app/models/design.model';

@Injectable({
  providedIn: 'root'
})
export class DesignsService {

  constructor(private httpClient: HttpClient) {}

  allDesigns(): Observable<Design[]> {
    return this.httpClient.get<Design[]>('/designs/all')
  }

  exploreDesigns(): Observable<Design[]> {
    return this.httpClient.get<Design[]>('/designs/explore')
  }

  savedDesigns(): Observable<Design[]> {
    return this.httpClient.get<Design[]>('/designs/saved')
  }

  searchDesigns(term: string): Observable<Design[]> {
    return this.httpClient.get<Design[]>(`/designs/search/${term}`)
  }

  recentDesigns(): Observable<Design[]> {
    return this.httpClient.get<Design[]>('/designs/recent')
  }
}
