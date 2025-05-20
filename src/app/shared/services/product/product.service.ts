import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { API_BASE_URL } from '../../../token/api-token';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private readonly baseUrl = inject(API_BASE_URL)

  private readonly _httpClient = inject(HttpClient)

  constructor() { }

  getProducts(categoryId?:string): Observable<any> {
    let url = categoryId ? `${this.baseUrl}/products?category[in]=${categoryId}` : `${this.baseUrl}/products`
    return this._httpClient.get(url)
  }
  getProductById(id: string): Observable<any> {
    return this._httpClient.get(`${this.baseUrl}/products/${id}`)
  }
}
