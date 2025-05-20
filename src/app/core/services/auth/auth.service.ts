import { HttpClient } from '@angular/common/http';
import { afterNextRender, inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { LoginUser, RegisterUser, ResetPassword, User } from '../../interfaces/auth-user';
import { API_BASE_URL } from '../../../token/api-token';
import { jwtDecode } from "jwt-decode";
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  _httpClient = inject(HttpClient)
  _router = inject(Router)
  baseUrl = inject(API_BASE_URL)
  userData: BehaviorSubject<any> = new BehaviorSubject('') // Subscribe with variables

  constructor() {
    afterNextRender(() => {
      this.isLoggedIn()
    })
  }

  registerUser(userInfo: RegisterUser): Observable<RegisterUser> {
    return this._httpClient.post<RegisterUser>(`${this.baseUrl}/auth/signup`, userInfo)
  }
  loginUser(userInfo: User): Observable<User> {
    return this._httpClient.post<User>(`${this.baseUrl}/auth/signin`, userInfo)
  }
  forgetPassword(userInfo: string): Observable<string> {
    return this._httpClient.post<string>(`${this.baseUrl}/auth/forgotPasswords`, { email: userInfo })
  }
  verifyCOde(userInfo: string): Observable<string> {
    return this._httpClient.post<string>(`${this.baseUrl}/auth/verifyResetCode`, { resetCode: userInfo })
  }
  resetPassword(userInfo: ResetPassword): Observable<ResetPassword> {
    return this._httpClient.put<ResetPassword>(`${this.baseUrl}/auth/resetPassword`, userInfo)
  }

  saveUser() {
    if (localStorage.getItem('userToken')) {
      this.userData.next(jwtDecode(localStorage.getItem('userToken')!))
    }
  }

  logout() {
    localStorage.removeItem('userToken');
    this.userData.next(null);
    this._router.navigate(['/auth/login'])
  }

  isLoggedIn(): boolean {
    if (localStorage.getItem('userToken')) {
      this.userData.next(jwtDecode(localStorage.getItem('userToken')!))
      return true
    } else {
      return false
    }
  }
}
