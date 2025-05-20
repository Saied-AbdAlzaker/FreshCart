import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from './../../services/auth/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnDestroy, OnInit {

  _authService = inject(AuthService)
  _router = inject(Router)
  apiError!: string
  isLoading: boolean = false
  subscription: Subscription = new Subscription()
  registerForm!: FormGroup
  togglePass: boolean = true
  toggleNewPass: boolean = true

  ngOnInit(): void {
    this.initForm()
  }

  initForm() {
    this.registerForm = new FormGroup({
      name: new FormControl(null, [Validators.required, Validators.minLength(5), Validators.maxLength(20)]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)]),
      rePassword: new FormControl(null, [Validators.required, Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)]),
      phone: new FormControl(null, [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]),
    }, this.validateRePassword)
  }

  onSubmitForm() {
    console.log(this.registerForm);
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched() // inputs empty => click button with error 
    } else {
      this.apiError = ''
      this.isLoading = true
      if (this.subscription) this.subscription.unsubscribe()
      this.subscription = this._authService.registerUser(this.registerForm.value).subscribe({
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
          this.registerForm.reset()
        }
      })
    }
  }

  validateRePassword(form: AbstractControl) {
    const password = form.get('password')?.value;
    const rePassword = form.get('rePassword')?.value;
    if (password == rePassword) {
      return null
    } else {
      return { misMatch: true }
    }
  }

  togglePassword() {
    this.togglePass = !this.togglePass
  }
  toggleConfirmPassword() {
    this.toggleNewPass = !this.toggleNewPass
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

}
