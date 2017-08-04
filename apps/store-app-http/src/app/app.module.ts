import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';

// Components
import { AppComponent } from './app.component';
import { ProductsComponent } from './products/products.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductFormComponent } from './product-form/product-form.component';
import { ProductTableComponent } from './product-table/product-table.component';
import { CustomerFormComponent } from './customer-form/customer-form.component';
import { NotFoundComponent } from './not-found/not-found.component';

// Services
import { LoggingService } from './services/logging.service';
import { ProductsService } from './services/products.service';
import { HomeComponent } from './home/home.component';
import { CustomersComponent } from './customers/customers.component';
import { AppNavComponent } from './app-nav/app-nav.component';

// Pipes
import { ShortenPipe } from './common/shorten.pipe';
import { FilterPipe } from './common/filter.pipe';
import { CustDirDemoComponent } from './cust-dir-demo/cust-dir-demo.component';

// Custom Directives
import { BasicHighlightDirective } from './directives/basic-highlight.directive';
import { BetterHighlightDirective } from './directives/better-highlight.directive';
import { ReactiveHighlight1Directive } from './directives/reactive-highlight-1.directive';
import { ReactiveHighlight2Directive } from './directives/reactive-highlight-2.directive';
import { ReactiveHighlight3Directive } from './directives/reactive-highlight-3.directive';

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
    ProductsComponent,
    ProductFormComponent,
    ProductDetailComponent,
    ProductListComponent,
    NotFoundComponent,
    HomeComponent,
    CustomersComponent,
    AppNavComponent,
    CustomerFormComponent,
    ProductTableComponent,
    ShortenPipe,
    FilterPipe,
    CustDirDemoComponent,
    BasicHighlightDirective,
    BetterHighlightDirective,
    ReactiveHighlight1Directive,
    ReactiveHighlight2Directive,
    ReactiveHighlight3Directive
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [LoggingService, ProductsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
