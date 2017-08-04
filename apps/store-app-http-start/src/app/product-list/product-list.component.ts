import { StoreAppError } from './../errors/store-app-error';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { ProductsService } from '../services/products.service';
import { Product } from '../models/product';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[];

  constructor(
    private productsService: ProductsService,
    private router: Router
  ) {}

  ngOnInit() {
    //this.products = this.productsService.getProducts();
    this.productsService.getProducts()
      .subscribe(
        (products: Product[]) => {
          console.log(products);
          this.products = products;
        },
        (error: StoreAppError) => {
          console.log(error);
        }
      )
  }

  onAdd() {
    this.router.navigate(['/products', 'new', 'edit']);
  }
}
