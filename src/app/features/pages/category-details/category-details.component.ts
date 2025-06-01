import { Component, inject, OnInit } from '@angular/core';
import { CategoriesService } from '../../../shared/services/categories/categories.service';
import { ActivatedRoute } from '@angular/router';
import { SpecificCategory } from '../../../shared/interfaces/category';

@Component({
  selector: 'app-category-details',
  imports: [],
  templateUrl: './category-details.component.html',
  styleUrl: './category-details.component.scss'
})
export class CategoryDetailsComponent implements OnInit {

  categoryDetails!: SpecificCategory
  categoryId!: string
  apiErroe!: string

  private readonly _categoriesService = inject(CategoriesService)
  private readonly _activatedRoute = inject(ActivatedRoute)

  ngOnInit(): void {
    this.getCategoryById()
  }

  getCategoryById() {
    this._activatedRoute.paramMap.subscribe({
      next: (res: any) => {
        this.categoryId = res?.params?.id
        this.getSpecificCategory(this.categoryId)
      }
    })
  }

  getSpecificCategory(id: string) {
    this._categoriesService.getCategoryById(id).subscribe({
      next: (res) => {
        this.categoryDetails = res.data
      }, error: (err) => {
        this.apiErroe = err.error.message
      }
    })
  }

}
