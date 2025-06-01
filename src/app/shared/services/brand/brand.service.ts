import { inject, Injectable } from '@angular/core';
import { API_BASE_URL } from '../../../token/api-token';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

   // env = environment.baseUrl
  baseUrl = inject(API_BASE_URL)

  private readonly _HttpClient = inject(HttpClient)

  constructor() { }

  getBrands(): Observable<any> {
    return this._HttpClient.get(`${this.baseUrl}/brands`)
  }

  getBrandById(id:string): Observable<any> {
    return this._HttpClient.get(`${this.baseUrl}/brands/${id}`)
  }
}
