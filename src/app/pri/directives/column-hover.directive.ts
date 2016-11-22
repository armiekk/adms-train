import { Directive, ElementRef, HostListener, Renderer } from '@angular/core';

@Directive({
  selector: '[appColumnHover]'
})
export class ColumnHoverDirective {


  constructor(private el: ElementRef, private renderer: Renderer) { }

  @HostListener('mouseenter') onMouseEnter() {
    this.highlight('800');
  }
  @HostListener('mouseleave') onMouseLeave() {
    this.highlight(null);
  }
  private highlight(weight: string) {
    this.renderer.setElementStyle(this.el.nativeElement, 'fontWeight', weight);
  }

}
