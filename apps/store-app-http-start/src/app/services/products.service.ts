import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { Product } from '../models/product';
import { LoggingService } from './logging.service';
import { StoreAppError } from "app/errors/store-app-error";

@Injectable()
export class ProductsService {
    private products: Product[];
    private apiUrl = 'http://localhost:3000/products123';

    constructor(
        private loggingService: LoggingService,
        private http: Http
    ) {
        this.products = [
            { id: 1, name: 'Data Structures and Algorithms', description: 'An ideal book for first course on data structures and algorithms, its text ensures a style and content relevant to present-day programming.', isAvailable: true, price: 285 },
            { id: 2, name: 'Premsons 608 Four Bearing Fidget Spinner', description: 'Perfect toy for fidgeters.', isAvailable: false, price: 160 },
            { id: 3, name: 'Bahubali', description: 'Raised in a remote tribal village, Shivudu grows up a carefree young man who relentlessly pursues his heart\'s desire.', isAvailable: true, price: 268 }
        ];
    }

    getProductsLocal() {
        this.loggingService.log('Returning all products.');

        return this.products;
    }

    getProducts() : Observable<Product[]> {
        return this.http.get(this.apiUrl)
            .map( (response: Response) => response.json() )
            .catch( (error: Response) => {

                return Observable.throw(new StoreAppError(error.json()));
            });
    }

    getProduct(id: number) {
        const product = this.products.find(
            product => product.id === id
        );

        this.loggingService.log('Returning a single product for product id: ' + id);
        return product; 
    }

    addProduct(product: Product) {
        let newProduct = new Product();
        newProduct.id = this.generateId();
        newProduct.name = product.name;
        newProduct.description = product.description;
        newProduct.isAvailable = product.isAvailable;
        newProduct.price = product.price;

        this.products.push(newProduct);
    }

    private generateId(): number {
        let id = 1;
        let lastItemIndex = this.products.length - 1;
        if(lastItemIndex > -1) {
            id = this.products[lastItemIndex].id + 1;
        }
        return id;
    }

    updateProduct(id: number, productInfo: Product) {
        const product = this.getProduct(id);

        if(product) {
            product.name = productInfo.name;
            product.description = productInfo.description;
            product.isAvailable = productInfo.isAvailable;
            product.price = productInfo.price;
        }
    }

    deleteProduct(id: number) {
        const index = this.products.findIndex(
            product => product.id === id
        )

        if(index >= 0) {
            this.products.splice(index, 1);
        }
    }
}
