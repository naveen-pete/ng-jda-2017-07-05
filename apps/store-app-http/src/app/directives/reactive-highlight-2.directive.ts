import { Directive, ElementRef, OnInit, HostListener, HostBinding } from '@angular/core';

@Directive({
  selector: '[appReactiveHighlight2]'
})
export class ReactiveHighlight2Directive implements OnInit {
  @HostBinding('style.backgroundColor') backgroundColor = 'transparent';

  constructor(
    private elementRef: ElementRef
  ) { }

  ngOnInit() {}

  @HostListener('mouseenter') mouseEnter() {
    this.backgroundColor = 'wheat';
  }

  @HostListener('mouseleave') mouseLeave() {
    this.backgroundColor = 'transparent';
  }
}
