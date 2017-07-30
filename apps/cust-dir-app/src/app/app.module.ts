import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BasicHighlightDirective } from './directives/basic-highlight.directive';
import { BetterHighlightDirective } from './directives/better-highlight.directive';
import { ReactiveHighlight1Directive } from './directives/reactive-highlight-1.directive';
import { ReactiveHighlight2Directive } from './directives/reactive-highlight-2.directive';
import { ReactiveHighlight3Directive } from './directives/reactive-highlight-3.directive';

@NgModule({
  declarations: [
    AppComponent,
    BasicHighlightDirective,
    BetterHighlightDirective,
    ReactiveHighlight1Directive,
    ReactiveHighlight2Directive,
    ReactiveHighlight3Directive
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
