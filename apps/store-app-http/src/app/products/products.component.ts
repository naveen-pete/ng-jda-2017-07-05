import { Component, OnInit } from '@angular/core';

import { Product } from '../models/product';
import { ProductsService } from '../services/products.service';

@Component({
    selector: 'app-products',
    templateUrl: './products.component.html',
    styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
    constructor(private productsService: ProductsService) {
    }

    ngOnInit() {}
}
