import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/observable';

import { Product } from '../models/product';
import { ProductsService } from '../services/products.service';

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
        this.product = this.productsService.getProduct(this.id);

        if(!this.product) this.product = new Product();
      }
    );
  }

  onEdit() {
    this.router.navigate(['/products', this.id, 'edit']);
  }

  onDelete() {
    this.productsService.deleteProduct(this.id);
    this.router.navigate(['/products']);
  }
}
