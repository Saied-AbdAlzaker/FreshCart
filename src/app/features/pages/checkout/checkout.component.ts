import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../../../shared/services/order/order.service';

@Component({
  selector: 'app-checkout',
  imports: [ReactiveFormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent implements OnInit {

  checkoutForm!: FormGroup
  isLoading: boolean = false
  cartId!: string

  ngOnInit(): void {
    this.getCartId()
    this.initForm()
  }

  private readonly _activatedRoute = inject(ActivatedRoute)
  private readonly _orderService = inject(OrderService)

  getCartId() {
    this.cartId = this._activatedRoute.snapshot.params['cartId']
  }

  initForm() {
    this.checkoutForm = new FormGroup({
      details: new FormControl(null, [Validators.required]),
      phone: new FormControl(null, [Validators.required]),
      city: new FormControl(null, [Validators.required]),
    })
  }

  onSubmitForm() {
    this.isLoading = true
    // onlinePayment
    this._orderService.onlinePayment(this.cartId, this.checkoutForm.value).subscribe({
      next: (res) => {
        console.log(res);
        open(res.session.url)
        this.isLoading = false
      }
    })
    
    // createCashOrder
    // this._orderService.createCashOrder(this.cartId, this.checkoutForm.value).subscribe({
    //   next: (res) => {
    //     console.log(res);
    //     this.isLoading = false

    //   }, error: (err) => {
    //     console.log(err);
    //     this.isLoading = false
    //   }
    // })
  }

}
