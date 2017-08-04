import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs/observable';

import { Product } from '../models/product';
import { LoggingService } from '../services/logging.service';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  id: number;
  product: Product;
  showMessage: boolean;
  addNew: boolean;

  constructor(
    private loggingService: LoggingService,
    private productsService: ProductsService,
    private route: ActivatedRoute,
    private router: Router
  ) { 
    this.product = new Product();
    this.showMessage = false;
  }

  ngOnInit() {
    this.route.params.subscribe(
      (params) => {
        if(params['id'] === 'new') {
          this.product = new Product();
          this.addNew = true;
        } else {
          this.id = +params.id;
          this.product = this.productsService.getProduct(this.id);

          if(this.product) {
            this.addNew = false;
          }
          else {
            this.addNew = true;
            this.product = new Product();
          }
        }
      }
    );
  }

  onSave() {
    this.product.price = +this.product.price;
    this.product.isAvailable = this.product.isAvailable ? this.product.isAvailable : false;
    console.log('product:', this.product);

    if(this.addNew) {
      this.productsService.addProduct(this.product);
      this.router.navigate(['/products']);
    }
    else {
      this.productsService.updateProduct(this.id, this.product);
      this.router.navigate(['/products', this.id]);
    }
  }

  onSubmit(pf: NgForm) {
    console.log('form:', pf);
    console.log(pf.value);
  }

  onFocus() {
    console.log('hi');
  }

}
