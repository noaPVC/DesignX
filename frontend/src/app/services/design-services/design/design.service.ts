import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Design } from 'src/app/models/design.model';
import { DesignUpdateDto } from 'src/app/models/dtos/design-update.dto';
import { DesignDto } from 'src/app/models/dtos/design.dto';

@Injectable({
  providedIn: 'root'
})
export class DesignService {

  constructor(private httpClient: HttpClient) {}

  getDesign(id: string): Observable<any> {
    return this.httpClient.get<Design>(`/design/${id}`)
  }

  createDesign(payload: DesignDto): Observable<any> {
    const designFormData: FormData = new FormData()

    designFormData.append('caption', payload.caption)
    designFormData.append('description', payload.description)
    designFormData.append('cover', payload.cover, payload.cover.name)
    payload.tags.forEach(tag => designFormData.append('tags', tag))

    return this.httpClient.post('/design/new', designFormData)
  }

  removeDesign(id: string): Observable<any> {
    return this.httpClient.delete(`/design/remove/${id}`)
  }

  updateDesign(id: string, updatedPayload: DesignUpdateDto): Observable<any>  {
    return this.httpClient.put(`/design/update/${id}`, updatedPayload)
  }

  bookmarkSaveDesign(id: string): Observable<any> {
    return this.httpClient.get(`/design/save/${id}`)
  }
}
