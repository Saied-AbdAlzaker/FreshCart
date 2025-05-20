import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_BASE_URL } from '../../../token/api-token';
import { Cart } from '../../interfaces/cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private readonly _httpClient = inject(HttpClient)
  private readonly baseUrl = inject(API_BASE_URL)
  // token: string = JSON.stringify(localStorage.getItem('userToken'))
  constructor() { }

  getLoggedUserCart(): Observable<Cart> {
    return this._httpClient.get<Cart>(`${this.baseUrl}/cart`
    )
  }

  addProductToCart(productId: string): Observable<Cart> {
    return this._httpClient.post<Cart>(`${this.baseUrl}/cart`, { productId }
    )
  }

  updateProductCartQuantity(productId: string, count: string): Observable<Cart> {
    return this._httpClient.put<Cart>(`${this.baseUrl}/cart/${productId}`, { count }
    )
  }

  removeSpecificCartItem(productId: string): Observable<any> {
    return this._httpClient.delete(`${this.baseUrl}/cart/${productId}`
    )
  }

  clearUserCart(): Observable<any> {
    return this._httpClient.delete(`${this.baseUrl}/cart`
    )
  }
}
