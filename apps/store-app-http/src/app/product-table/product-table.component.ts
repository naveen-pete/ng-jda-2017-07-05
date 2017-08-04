import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Product } from '../models/product';
import { ProductsService } from '../services/products.service';
import { StoreAppError } from '../errors/store-app-error';

@Component({
  selector: 'app-product-table',
  templateUrl: './product-table.component.html',
  styleUrls: ['./product-table.component.css']
})
export class ProductTableComponent implements OnInit {
  products: Product[] = [];
  filterName = '';

  constructor(private service: ProductsService) { }

  ngOnInit() {
    this.service.getProducts()
      .subscribe(
        (products: Product[]) => this.products = products,
        (error: StoreAppError) => console.log(error)
      );
  }
}
