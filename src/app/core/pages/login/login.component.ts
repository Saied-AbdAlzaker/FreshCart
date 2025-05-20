import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Router, RouterLink } from '@angular/router';
import { Subscription, timer } from 'rxjs';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ErrorMessageComponent } from "../../../shared/components/ui/error-message/error-message.component";
import { CustomInputComponent } from "../../../shared/components/ui/custom-input/custom-input.component";
import { ToastrService } from 'ngx-toastr';
import { User } from '../../interfaces/auth-user';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, ErrorMessageComponent,RouterLink,FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnDestroy, OnInit {

  // apiError!: string
  isLoading: boolean = false
  subscription: Subscription = new Subscription()
  loginForm!: FormGroup
  toggleInput: boolean = true
  email:string=''
  user!:User

  _authService = inject(AuthService)
  _router = inject(Router)
  _toastrService = inject(ToastrService)
  
  //  formBuilder & formArray
  // _formBuilder=inject(FormBuilder)
  // loginForm:FormGroup = this._formBuilder.group({
  //   // email: this._formBuilder.control()
  //   email: [null, [Validators.required, Validators.email]],
  //   password: [null, [Validators.required, Validators.pattern(/^[A-Z]\w{5,}$/)]],
  // })

  ngOnInit(): void {
    this.initForm()
  }

  initForm() {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)]),
    })
  }

  onSubmitForm() {
    console.log(this.loginForm);
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched() // inputs empty => click button with error 
    } else {
      // this.apiError = ''
      this.isLoading = true
      if (this.subscription) this.subscription.unsubscribe()
      this.subscription = this._authService.loginUser(this.loginForm.value).subscribe({
        next: (res) => {
          // console.log(res);
          this.user=res
          this.isLoading = false
          localStorage.setItem("userToken", res.token)
          this._authService.saveUser()
          this._router.navigate(['/home'])
        }
        ,
        error: (err) => {
          // this.apiError = err?.error?.message
          this.isLoading = false

        },
        complete: () => {
          this._toastrService.success(this.user.message,`Hello ${this.user.user.name}`)
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
