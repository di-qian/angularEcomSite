import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductsDataService } from '../products-data.service';

@Component({
  selector: 'pm-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  products: Observable<any>;
  constructor(private productDataService: ProductsDataService) {}

  ngOnInit(): void {
    this.products = this.productDataService.getAllProducts();
  }
}
