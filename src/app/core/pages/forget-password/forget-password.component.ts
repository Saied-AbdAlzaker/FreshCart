import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth/auth.service';
import { Dialog } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forget-password',
  imports: [FormsModule, Dialog, ButtonModule, InputTextModule],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.scss'
})
export class ForgetPasswordComponent {

  email!: string
  resetCode!: string
  isLoading: boolean = false
  apiError!: string
  apiErrorCode!: string
  subscription: Subscription = new Subscription()
  visible: boolean = false;

  _authService = inject(AuthService)
  _router = inject(Router)
  // forgetPassword
  forgetPassword(data: string) {
    console.log(data);
    
    this.apiError = ''
    this.isLoading = true
    if (this.subscription) this.subscription.unsubscribe()
    this.subscription = this._authService.forgetPassword(data).subscribe({
      next: (res) => {
        console.log(res);
        this.isLoading = false
        // Toastr

        // visible
        this.visible = true

      }, error: (err) => {
        this.isLoading = false
        this.apiError = err.error.message
      }, complete: () => {

      }
    })

  }
  // verifyCode
  verifyCode(data: string) {
    console.log(data);
    
    this.apiErrorCode = ''
    this.isLoading = true
    if (this.subscription) this.subscription.unsubscribe()
    this.subscription = this._authService.verifyCOde(data).subscribe({
      next: (res) => {
        console.log(res);
        this.isLoading = false
        // Toastr

        // Route
        this._router.navigate(['/auth/reset-password'])
      }, error: (err) => {
        this.isLoading = false
        this.apiErrorCode = err.error.message
      }, complete: () => {

      }
    })

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

}
