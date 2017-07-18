import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Product } from '../../models/product';
import { ProductsService } from '../../services/products.service';
import { LoggingService } from '../../services/logging.service';
import { AppError } from '../../errors/app-error';
import { BadInputError } from '../../errors/bad-input-error';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  id: number;
  product: Product = new Product();
  addNew: boolean = true;

  constructor(
    private productsService: ProductsService,
    private loggingService: LoggingService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.params.subscribe(
      params => {
        this.id = +params['id'];

        this.getProduct();
      }
    );
  }

  getProduct() {
    if(this.id == null || isNaN(this.id))
      return;

    // this.product = this.productsService.getProductLocal(this.id);
    // if(!this.product) {
    //   this.product = new Product();
    //   this.addNew = true;
    // }

    this.productsService.getProduct(this.id)
      .subscribe(
        (product: Product) => {
          console.log('Product details retrieved successfully.', product);
          this.product = product;
          this.addNew = false;
        }
      );
  }

  onSave() {
    this.sanitizeProduct();

    if(this.addNew) {
      this.productsService.addProduct(this.product)
        .subscribe(
          (newProduct: Product) => {
            console.log('New product added successfully!', newProduct);
          },
          (error: AppError) => {
            if(error instanceof BadInputError) {
              alert('Bad input error!');
            } else {
              throw error;
            }
          }
        );
      this.router.navigate(['/products']);
    } else {
      this.productsService.updateProduct(this.id, this.product)
        .subscribe(
          (updatedProduct: Product) => {
            console.log('Product updated successfully!', updatedProduct);
          }
        );
      this.router.navigate(['/products', this.id]);
    }
  }

  private sanitizeProduct() {
    this.product.price = +this.product.price;
    this.product.isAvailable = this.product.isAvailable ? this.product.isAvailable : false;
  }
}
