import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../../shared/services/cart/cart.service';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { Cart } from '../../../shared/interfaces/cart';
import { ToastrService } from 'ngx-toastr';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  imports: [ButtonModule, CommonModule,RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {
  userCart!: Cart
  isLoading: boolean = false
  _cartService = inject(CartService)
  _toastrService = inject(ToastrService)

  ngOnInit(): void {
    this.getUserCart()
  }
  // All Cart
  getUserCart() {
    this.isLoading = true
    this._cartService.getLoggedUserCart().subscribe({
      next: (res) => {
        this.userCart = res
        this.isLoading = false
      }
    })
  }
  // Remove Item
  rmoveItem(id: string) {
    this.isLoading = true
    this._cartService.removeSpecificCartItem(id).subscribe({
      next: (res) => {
        this._toastrService.success('Product deleted successfully', res.status)
        this.userCart = res
        this.isLoading = false
      }
    })
  }

  // Update Cart Item
  updateCart(id: string, count: number) {
    this._cartService.updateProductCartQuantity(id, `${count}`).subscribe({
      next: (res) => {
        this.userCart = res
      }
    })
  }

  // Clear Cart
  clear() {
    this.isLoading = true
    this._cartService.clearUserCart().subscribe({
      next: (res) => {
        this.getUserCart()
        this.isLoading = false
      }
    })
  }

}
