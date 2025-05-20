import { Component, inject, OnInit } from '@angular/core';
import { ProductService } from '../../../../../shared/services/product/product.service';
import { Product } from '../../../../../shared/interfaces/product';
import { ProductItemComponent } from '../../../../../shared/components/ui/product-item/product-item.component';
import { CartService } from '../../../../../shared/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-all-products',
  imports: [ProductItemComponent],
  templateUrl: './all-products.component.html',
  styleUrl: './all-products.component.scss'
})
export class AllProductsComponent implements OnInit {
  productList!: Product[]

  _productService = inject(ProductService);
  _cartService = inject(CartService);
  _toastrService = inject(ToastrService);

  constructor() { }

  ngOnInit(): void {
    this.getProducts()
  }

  getProducts() {
    this._productService.getProducts().subscribe({
      next: (res) => {
        this.productList = res.data;
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        console.log('Done');
      }
    })
  }

  addToCart(id: string) {
    this._cartService.addProductToCart(id).subscribe({
      next: (res) => {
        console.log(res);
        this._toastrService.success(res.message,res.status)
      }
    })
  }

}
