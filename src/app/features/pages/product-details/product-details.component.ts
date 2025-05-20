import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../shared/services/product/product.service';
import { Product } from '../../../shared/interfaces/product';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { RelatedProductComponent } from "./components/related-product/related-product.component";
import { CartService } from '../../../shared/services/cart/cart.service';
import Swal from 'sweetalert2'
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-details',
  imports: [CarouselModule, RelatedProductComponent],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent implements OnInit {

  productId!: string
  productDetails: Product = {} as Product
  relatedProducts!: Product[]
  apiErroe!: string
  isLoading: boolean = false

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 500,
    navText: ['<i class="fa-solid fa-arrow-left"></i>', '<i class="fa-solid fa-arrow-right"></i>'],
    responsive: {
      0: {
        items: 1
      }
    },
    nav: true
  }

  private readonly _activatedRoute = inject(ActivatedRoute)
  private readonly _productService = inject(ProductService)
  private readonly _cartService = inject(CartService)
  private readonly _toastrService = inject(ToastrService)

  ngOnInit(): void {
    this.getProductId()

  }

  getProductId() {
    this._activatedRoute.paramMap.subscribe({
      next: (res: any) => {
        this.productId = res?.params?.id
        this.getProductDetails(this.productId)
        // console.log(res.params.id);
        // console.log(res);

      }
    })

    // this.productId = this._activatedRoute.snapshot.params['id']
    // this.getProductDetails(this.productId)

  }

  getProductDetails(id: string) {
    this._productService.getProductById(id).subscribe({
      next: (res) => {
        this.productDetails = res.data
        this.getRelatedProduct(this.productDetails.category._id)
        console.log(res);

      }, error: (err) => {
        this.apiErroe = err.error.message
      }
    })
  }

  getRelatedProduct(categoryId: string) {
    this._productService.getProducts(categoryId).subscribe({
      next: (res) => {
        this.relatedProducts = res.data

      }
    })
  }

  addToCart(id: string) {
    this.isLoading = true
    this._cartService.addProductToCart(id).subscribe({
      next: (res) => {
        console.log(res);
        this.isLoading = false
        this._toastrService.success(res.message,res.status)
      }
    })
  }

}
