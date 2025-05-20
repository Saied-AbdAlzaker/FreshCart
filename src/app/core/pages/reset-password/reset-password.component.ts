import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ErrorMessageComponent } from '../../../shared/components/ui/error-message/error-message.component';

@Component({
  selector: 'app-reset-password',
  imports: [ErrorMessageComponent,ReactiveFormsModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss'
})
export class ResetPasswordComponent implements OnDestroy, OnInit{

   _authService = inject(AuthService)
  _router = inject(Router)
  apiError!: string
  isLoading: boolean = false
  subscription: Subscription = new Subscription()
  resetPasswordForm!: FormGroup
  toggleInput: boolean = true
  email:string=''

  ngOnInit(): void {
    this.initForm()
  }

  initForm() {
    this.resetPasswordForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      newPassword: new FormControl(null, [Validators.required, Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)]),
    })
  }

  onSubmitForm() {
    console.log(this.resetPasswordForm);
    if (this.resetPasswordForm.invalid) {
      this.resetPasswordForm.markAllAsTouched() // inputs empty => click button with error 
    } else {
      this.apiError = ''
      this.isLoading = true
      if (this.subscription) this.subscription.unsubscribe()
      this.subscription = this._authService.resetPassword(this.resetPasswordForm.value).subscribe({
        next: (res) => {
          console.log(res);
          this.isLoading = false
          this._router.navigate(['/auth/login'])
        },
        error: (err) => {
          this.apiError = err.error.message
          this.isLoading = false

        },
        complete: () => {
          console.log('Done');
          this.resetPasswordForm.reset()
        }
      })
    }
  }

  togglePassword() {
    this.toggleInput = !this.toggleInput
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

}
