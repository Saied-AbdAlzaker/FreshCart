import { Component, inject, OnInit } from '@angular/core';
import { BrandService } from '../../../shared/services/brand/brand.service';
import { RouterLink } from '@angular/router';
import { Brand } from '../../../shared/interfaces/brand';

@Component({
  selector: 'app-brands',
  imports: [RouterLink],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss'
})
export class BrandsComponent implements OnInit{

  brandList!: Brand[]

  _brandService = inject(BrandService)

  ngOnInit(): void {
    this.getbrand()
  }

  getbrand() {
    this._brandService.getBrands().subscribe({
      next: (res) => {
        this.brandList = res.data;
      }
    })
  }


}
