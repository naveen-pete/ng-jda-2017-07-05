import { Injectable, EventEmitter } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { Product } from '../models/product';
import { LoggingService } from './logging.service';
import { StoreAppError } from '../errors/store-app-error';

@Injectable()
export class ProductsService {
    private apiUrl: string = 'http://localhost:3000/products';

    productAdded = new EventEmitter<Product>();
    productUpdated = new EventEmitter<Product>();
    productDeleted = new EventEmitter<number>();

    constructor(
        private loggingService: LoggingService,
        private http: Http
    ) {}

    getProducts(): Observable<Product[]> {
        return this.http.get(this.apiUrl)
            .map(this.handleSuccess)
            .catch(this.handleError);
    }

    getProduct(id: number): Observable<Product> {
        return this.http.get(this.apiUrl + '/' + id)
            .map(this.handleSuccess)
            .catch(this.handleError);
    }

    addProduct(product: Product): Observable<Product> {
        return this.http.post(this.apiUrl, product)
            .map(
                (response: Response) => {
                    let newProduct = response.json();
                    this.productAdded.emit(newProduct);
                    return newProduct;
                }
            )
            .catch(this.handleError);
    }

    updateProduct(id: number, productInfo: Product): Observable<Product> {
        return this.http.patch(this.apiUrl + '/' + id, productInfo)
            .map(
                (response: Response) => {
                    let updatedProduct = response.json();
                    this.productUpdated.emit(updatedProduct);
                    return updatedProduct; 
                }
            )
            .catch(this.handleError);
    }

    deleteProduct(id: number): Observable<Product> {
        return this.http.delete(this.apiUrl + '/' + id)
            .map(
                (response: Response) => {
                    this.productDeleted.emit(id);
                    return response.json();
                }
            )
            .catch(this.handleError);
    }

    private handleSuccess(response: Response) {
        return response.json();
    }

    private handleError(error: Response) {
        let appError = new StoreAppError(error);
        return Observable.throw(appError);
    }
}
