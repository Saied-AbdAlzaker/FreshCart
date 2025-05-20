import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../../interfaces/product';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-item',
  imports: [RouterLink],
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.scss'
})
export class ProductItemComponent {
  // product = input.required()
  @Input() product!: Product
  @Output() fireAddToCart: EventEmitter<string> = new EventEmitter()

  handleAddToCart(id: string) {
    this.fireAddToCart.emit(id)
  }
  
}
