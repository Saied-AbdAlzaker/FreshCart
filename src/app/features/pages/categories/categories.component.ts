import { Component, inject, OnInit } from '@angular/core';
import { CategoriesService } from '../../../shared/services/categories/categories.service';
import { Category } from '../../../shared/interfaces/category';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-categories',
  imports: [RouterLink],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements OnInit {

  categoriesList!: Category[]

  _categoriesService = inject(CategoriesService)

  ngOnInit(): void {
    this.getCategories()
  }

  getCategories() {
    this._categoriesService.getCategories().subscribe({
      next: (res) => {
        this.categoriesList = res.data;

      }
    })
  }


}
