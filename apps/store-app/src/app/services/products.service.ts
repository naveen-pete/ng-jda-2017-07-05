import { Injectable, EventEmitter } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { Product } from '../models/product';
import { LoggingService } from './logging.service';
import { AppError } from '../errors/app-error';
import { NotFoundError } from '../errors/not-found-error';
import { BadInputError } from '../errors/bad-input-error';

@Injectable()
export class ProductsService {
    productAdded = new EventEmitter<Product>();
    productUpdated = new EventEmitter<Product>();
    productDeleted = new EventEmitter<number>();

    private apiUrl = 'http://localhost:3000/products';

    private products: Product[] = [
        { id: 1, name: 'Data Structures and Algorithms', description: 'An ideal book for first course on data structures and algorithms, its text ensures a style and content relevant to present-day programming.', isAvailable: true, price: 285 },
        { id: 2, name: 'Premsons 608 Four Bearing Fidget Spinner', description: 'Perfect toy for fidgeters.', isAvailable: false, price: 160 },
        { id: 3, name: 'Bahubali', description: 'Raised in a remote tribal village, Shivudu grows up a carefree young man who relentlessly pursues his heart\'s desire.', isAvailable: true, price: 268 }
    ];

    constructor(
        private loggingService: LoggingService,
        private http: Http
    ) {}

    getProductsLocal(): Product[] {
        return this.products;
    }

    getProductLocal(id: number): Product {
        this.loggingService.logMessage('Get Product, id: ' + id);

        const product = this.products.find(
            product => product.id === id
        )
        return product; 
    }

    addProductLocal(product: Product) {
        const newProduct = new Product();
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

    updateProductLocal(id: number, productInfo: Product) {
        const product = this.getProductLocal(id);

        if(product) {
            product.name = productInfo.name;
            product.description = productInfo.description;
            product.isAvailable = productInfo.isAvailable;
            product.price = productInfo.price;
        }
    }

    deleteProductLocal(id: number) {
        const index = this.products.findIndex(
            product => product.id === id
        )

        if(index >= 0) {
            this.products.splice(index, 1);
        }
    }

    getProducts(): Observable<Product[]> {
        return this.http.get(this.apiUrl)
            .map((response: Response) => response.json())
            .catch(this.handleError);
    }

    getProduct(id: number): Observable<Product> {
        return this.http.get(this.apiUrl + '/' + id)
            .map((response: Response) => response.json())
            .catch(this.handleError);
    }

    addProduct(newProduct: Product): Observable<Product> {
        return this.http.post(this.apiUrl, newProduct)
            .map( 
                (response: Response) => {
                    console.log(response);
                    let p = response.json();
                    this.productAdded.emit(p);
                    return p;
                }
            )
            .catch(this.handleError);
    }

    updateProduct(id: number, product: Product): Observable<Product> {
        return this.http.patch(this.apiUrl + '/' + id, product)
            .map( 
                (response: Response) => {
                    let p = response.json();
                    this.productUpdated.emit(p);
                    return p;
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

    private handleError(error: Response) {
        if(error.status === 400) {
            return Observable.throw(new BadInputError());
        }

        if(error.status === 404) {
            return Observable.throw(new NotFoundError());
        }

        return Observable.throw(new AppError(error));
    }
}
