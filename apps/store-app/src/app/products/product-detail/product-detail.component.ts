import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Product } from '../../models/product';
import { ProductsService } from '../../services/products.service';
import { LoggingService } from '../../services/logging.service';
import { AppError } from '../../errors/app-error';
import { NotFoundError } from '../../errors/not-found-error';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  id: number;
  product: Product = new Product();

  constructor(
    private productsService: ProductsService,
    private loggingService: LoggingService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.id = +this.route.snapshot.params['id'];
    this.route.params.subscribe(
      params => {
        this.id = +params['id'];
        this.getProduct();
      }
    );

    this.productsService.productUpdated.subscribe(
      (updatedProduct) => {
        this.product.name = updatedProduct.name;
        this.product.description = updatedProduct.description;
        this.product.price = updatedProduct.price;
        this.product.isAvailable = updatedProduct.isAvailable;
      }
    );
  }

  private getProduct() {
    // this.product = this.productsService.getProductLocal(this.id);
    // if(!this.product) {
    //   this.product = new Product();
    // }

    this.productsService.getProduct(this.id)
      .subscribe(
        (product: Product) => {
          console.log('Product details retrieved successfully.', product);
          this.product = product;
        }
      );
  }

  onEdit() {
    this.loggingService.logMessage('Product Detail - Edit button clicked.');
    this.router.navigate(['/products', this.id, 'edit']);
  }

  onDelete() {
    this.loggingService.logMessage('Product Detail - Delete button clicked.');
    //this.productsService.deleteProductLocal(this.id);

    this.productsService.deleteProduct(this.id)
      .subscribe(
        (product: Product) => {
          console.log('Product deleted successfully!', product);
        },
        (error: AppError) => {
          if(error instanceof NotFoundError) {
            alert('Product not found!');
          }
          else {
            throw error;
          }
        }
      );

    this.router.navigate(['/products']);
  }
}
