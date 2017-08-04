import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/observable';

import { ProductsService } from '../services/products.service';
import { Product } from '../models/product';
import { StoreAppError } from '../errors/store-app-error';

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
Product
  ngOnInit() {
    this.productsService.productAdded
      .subscribe(
        (newProduct: Product) => this.products.push(newProduct)
      );

    this.productsService.productUpdated
      .subscribe(
        (updatedProduct: Product) => {
          const product = this.products.find(
              product => product.id === updatedProduct.id
          );

          if(product) {
              product.name = updatedProduct.name;
              product.description = updatedProduct.description;
              product.isAvailable = updatedProduct.isAvailable;
              product.price = updatedProduct.price;
          }
        }
      );

    this.productsService.productDeleted
      .subscribe(
        (id: number) => {
          const index = this.products.findIndex(
            product => product.id === id
          )

          if(index >= 0) {
            this.products.splice(index, 1);
          }
        }
      );

    this.productsService.getProducts()
      .subscribe(
        (products: Product[]) => {
          console.log('products:', products);
          this.products = products;
        },
        (error: StoreAppError) => console.log(error)
      );
  }

  onAdd() {
    this.router.navigate(['/products', 'new', 'edit']);
  }
}
