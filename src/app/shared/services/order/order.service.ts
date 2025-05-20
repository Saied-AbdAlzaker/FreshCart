import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_BASE_URL } from '../../../token/api-token';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private readonly _httpClient = inject(HttpClient)
  private readonly baseUrl = inject(API_BASE_URL)
  constructor() { }


  createCashOrder(id: string, shippingAddress: { details: string, phone: string, city: string }): Observable<any> {
    return this._httpClient.post(`${this.baseUrl}/orders/${id}`, { shippingAddress }
    )
  }

  getAllOrders(): Observable<any> {
    return this._httpClient.get(`${this.baseUrl}/orders`)
  }

  getUserOrders(id: string): Observable<any> {
    return this._httpClient.get(`${this.baseUrl}/orders/user/${id}`)
  }

  onlinePayment(id: string, shippingAddress: { details: string, phone: string, city: string }): Observable<any> {
    return this._httpClient.post(`${this.baseUrl}/orders/checkout-session/${id}?url=http://localhost:3000`,
      { shippingAddress }
    )
  }


}
