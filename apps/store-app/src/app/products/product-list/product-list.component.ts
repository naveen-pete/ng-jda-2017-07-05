import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Product } from '../../models/product';
import { ProductsService } from '../../services/products.service';
import { LoggingService } from '../../services/logging.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[];

  constructor(
    private productsService: ProductsService,
    private loggingService: LoggingService,
    private router: Router
  ) { 
    this.products = [];
  }

  ngOnInit() {
    this.productsService.productAdded.subscribe(
      (newProduct) => {
        this.products.push(newProduct);
      }
    );
    this.productsService.productUpdated.subscribe(
      (updatedProduct) => {
        this.updateProduct(updatedProduct);
      }
    );
    this.productsService.productDeleted.subscribe(
      (id) => {
        this.deleteProduct(id);
      }
    );

    this.getProducts();
  }

  private updateProduct(updatedProduct: Product) {
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

  private deleteProduct(id: number) {
    const index = this.products.findIndex(
      product => product.id === id
    )

    if(index >= 0) {
      this.products.splice(index, 1);
    }
  }

  private getProducts() {
    // this.products = this.productsService.getProductsLocal();

    this.productsService.getProducts()
      .subscribe(
        (products: Product[]) => {
          this.products = products;
          console.log('Products retrieved successfully.', products);
        }
      );
  }

  onAdd() {
    this.loggingService.logMessage('Product List - Add button clicked.');
    this.router.navigate(['/products', 'new', 'edit']);
  }
}
