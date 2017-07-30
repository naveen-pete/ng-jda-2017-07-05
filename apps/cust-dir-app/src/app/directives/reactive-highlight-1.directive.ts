import { Directive, OnInit, Renderer2, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appReactiveHighlight1]'
})
export class ReactiveHighlight1Directive implements OnInit {

  constructor(
    private elementRef: ElementRef, 
    private renderer: Renderer2
  ) { }

  ngOnInit() {

  }

  @HostListener('mouseenter') mouseOver() {
    this.renderer.setStyle(this.elementRef.nativeElement, 'background-color', 'greenyellow');
  } 

  @HostListener('mouseleave') mouseLeave() {
    this.renderer.setStyle(this.elementRef.nativeElement, 'background-color', 'transparent');
  } 
}
