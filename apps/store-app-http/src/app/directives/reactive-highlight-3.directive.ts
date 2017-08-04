import { Directive, ElementRef, OnInit, HostListener, HostBinding, Input } from '@angular/core';

@Directive({
  selector: '[appReactiveHighlight3]'
})
export class ReactiveHighlight3Directive {
  @Input() defaultColor = 'transparent';
  @Input() highlightColor = 'lightblue';
  @HostBinding('style.backgroundColor') backgroundColor;

  constructor() { }

  ngOnInit() {
    this.backgroundColor = this.defaultColor;
  }

  @HostListener('mouseenter') mouseEnter() {
    this.backgroundColor = this.highlightColor;
  }

  @HostListener('mouseleave') mouseLeave() {
    this.backgroundColor = this.defaultColor;
  }
}
