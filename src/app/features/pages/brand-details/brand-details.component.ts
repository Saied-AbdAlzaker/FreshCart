import { Component, inject, OnInit } from '@angular/core';
import { Brand, SpecificBrand } from '../../../shared/interfaces/brand';
import { BrandService } from '../../../shared/services/brand/brand.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-brand-details',
  imports: [],
  templateUrl: './brand-details.component.html',
  styleUrl: './brand-details.component.scss'
})
export class BrandDetailsComponent implements OnInit {

  brandDetails!: SpecificBrand
  brandId!: string
  apiErroe!: string

  private readonly _categoriesService = inject(BrandService)
  private readonly _activatedRoute = inject(ActivatedRoute)

  ngOnInit(): void {
    this.getBrandById()
  }

  getBrandById() {
    this._activatedRoute.paramMap.subscribe({
      next: (res: any) => {
        this.brandId = res?.params?.id
        this.getSpecificBrand(this.brandId)
      }
    })
  }

  getSpecificBrand(id: string) {
    this._categoriesService.getBrandById(id).subscribe({
      next: (res) => {
        this.brandDetails = res.data
      }, error: (err) => {
        this.apiErroe = err.error.message
      }
    })
  }


}
