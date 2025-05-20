import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { API_BASE_URL } from '../../../token/api-token';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  // env = environment.baseUrl
  baseUrl = inject(API_BASE_URL)

  private readonly _HttpClient = inject(HttpClient)

  constructor() { }

  getCategories(): Observable<any> {
    return this._HttpClient.get(`${this.baseUrl}/categories`)
  }
}
