import { Component } from '@angular/core';
import { AllProductsComponent } from './components/all-products/all-products.component';
import { PopularCategoriesComponent } from "./components/popular-categories/popular-categories.component";
import { MainSliderComponent } from "./components/main-slider/main-slider.component";

@Component({
  selector: 'app-home',
  imports: [AllProductsComponent, PopularCategoriesComponent, MainSliderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
