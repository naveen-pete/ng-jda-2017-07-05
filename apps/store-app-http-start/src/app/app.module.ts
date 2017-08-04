import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

// Components
import { AppComponent } from './app.component';

import { HomeComponent } from './home/home.component';
import { AppNavComponent } from './app-nav/app-nav.component';
import { NotFoundComponent } from './not-found/not-found.component';

import { ProductsComponent } from './products/products.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductFormComponent } from './product-form/product-form.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductTableComponent } from './product-table/product-table.component';

import { CustomersComponent } from './customers/customers.component';
import { CustomerFormComponent } from './customer-form/customer-form.component';

import { CustDirDemoComponent } from './cust-dir-demo/cust-dir-demo.component';

// Services
import { ProductsService } from './services/products.service';
import { LoggingService } from './services/logging.service';

// Application Routes
const appRoutes: Routes = [
  { path: 'products', component: ProductsComponent, children: [
    { path: ':id', component: ProductDetailComponent },
    { path: ':id/edit', component: ProductFormComponent }
  ] },

  { path: 'customers', component: CustomersComponent },

  { path: 'cust-pipes', component: ProductTableComponent }, 
  { path: 'cust-directives', component: CustDirDemoComponent },

  { path: '', component: HomeComponent},
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,

    HomeComponent,
    AppNavComponent,
    NotFoundComponent,

    ProductsComponent,
    ProductDetailComponent,
    ProductFormComponent,
    ProductListComponent,
    ProductTableComponent,
    
    CustomersComponent,
    CustomerFormComponent,

    CustDirDemoComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    HttpModule
  ],
  providers: [LoggingService, ProductsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
