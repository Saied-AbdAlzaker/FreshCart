import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../../../core/services/auth/auth.service';
import { OrderService } from '../../../shared/services/order/order.service';
import { CartItem, Order } from '../../../shared/interfaces/order';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-orders',
  imports: [TableModule, CommonModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent implements OnInit {

  allOrders!: Order[]
  cartItems!: CartItem[]
  showModel:boolean=false

  private readonly _authService = inject(AuthService)
  private readonly _orderService = inject(OrderService)

  ngOnInit(): void {
    this.getUserId()
  }

  getUserId() {
    this._authService.userData.subscribe({
      next: (res) => {
        res.id && this.getAllOrders(res.id)
      }
    })
  }

  getAllOrders(id: string) {
    this._orderService.getUserOrders(id).subscribe({
      next: (res) => {
        this.allOrders = res
      }
    })
  }

  openMoel(index:number){
    this.cartItems = this.allOrders[index].cartItems
    console.log(this.cartItems);
    
    this.showModel = true
  }

}
