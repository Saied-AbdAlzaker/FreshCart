import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './core/layout/navbar/navbar.component';
import { FooterComponent } from './core/layout/footer/footer.component';
import { initFlowbite } from './../../node_modules/flowbite/lib/esm/components/index';
import { FlowbiteService } from './shared/services/flowbite.service';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { LoaderComponent } from "./shared/components/ui/loader/loader.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, FooterComponent, NgxSpinnerModule, LoaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'FreshCart';

  _flowbiteService = inject(FlowbiteService)
  // spinner = inject(NgxSpinnerService)
  constructor() { }


  ngOnInit(): void {
    this._flowbiteService.loadFlowbite((flowbite) => {
      initFlowbite();
    });

    // /** spinner starts on init */
    // this.spinner.show();

    // setTimeout(() => {
    //   /** spinner ends after 5 seconds */
    //   this.spinner.hide();
    // }, 2000);

  }
}
