import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from './../../services/auth/auth.service';
import { AsyncPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { Dialog } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { timer } from 'rxjs';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, FormsModule, Dialog, ButtonModule, InputTextModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {

  _authService = inject(AuthService)
  isLoggedIn: any
  isLoading: boolean = false
  visible: boolean = false;

  constructor() {
    // this.isLoggedIn = this._authService.userData;
    // console.log(this._authService.userData.asObservable());
  }

  ngOnInit(): void {
    this.CheckLoggedInStatus()
  }

  CheckLoggedInStatus() {
    this._authService.userData.subscribe({
      next: (res) => {
        this.isLoggedIn = res
        console.log(this.isLoggedIn);
      }
    })
  }

  showDialog() {
    this.visible = true;
  }

  logout() {
    this.isLoading = true
    timer(1000).subscribe(()=>{
      this._authService.logout()
      this.visible = false;
    })
  }


}
