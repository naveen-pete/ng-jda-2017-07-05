import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/observable';

import { Product } from '../models/product';
import { ProductsService } from '../services/products.service';
import { StoreAppError } from '../errors/store-app-error';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  product: Product = new Product();
  id: number;

  constructor(
    private productsService: ProductsService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.params.subscribe(
      params => {
        this.id = +params['id'];
        this.productsService.getProduct(this.id)
          .subscribe(
            (product: Product) => this.product = product,
            (error) => console.log(error)
          );
      }
    );

    this.productsService.productUpdated.subscribe(
      (updatedProduct: Product) => {
        this.product.name = updatedProduct.name;
        this.product.description = updatedProduct.description;
        this.product.price = updatedProduct.price;
        this.product.isAvailable = updatedProduct.isAvailable;
      }
    );
  }

  onEdit() {
    this.router.navigate(['/products', this.id, 'edit']);
  }

  onDelete() {
    this.productsService.deleteProduct(this.id)
      .subscribe(
        (product: Product) => {
          console.log('Product deleted successfully!');
        },
        (error: StoreAppError) => console.log(error)
      );
    this.router.navigate(['/products']);
  }
}
