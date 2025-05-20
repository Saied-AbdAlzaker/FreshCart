import { Component, inject, OnInit } from '@angular/core';
import { CategoriesService } from '../../../../../shared/services/categories/categories.service';
import { Category } from '../../../../../shared/interfaces/category';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-popular-categories',
  imports: [CarouselModule],
  templateUrl: './popular-categories.component.html',
  styleUrl: './popular-categories.component.scss'
})
export class PopularCategoriesComponent implements OnInit {

  categoriesList!: Category[]

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
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 7
      }
    },
    nav: true
  }

  private _categoriesService = inject(CategoriesService)

  constructor() { }

  ngOnInit(): void {
    this.getCategories()
  }

  getCategories() {
    this._categoriesService.getCategories().subscribe({
      next: (res) => {
        this.categoriesList = res.data;

      },
      error: (err) => {
        console.log(err);

      },
      complete: () => {
        console.log('Done');

      }
    })
  }

}
