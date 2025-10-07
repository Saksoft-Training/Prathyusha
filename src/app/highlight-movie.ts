import { Directive,  ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appHighlightMovie]'
})
export class HighlightMovie {
constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('mouseenter') onMouseEnter() {
    this.renderer.setStyle(this.el.nativeElement, 'box-shadow', '0 4px 12px rgba(0,0,0,0.4)');
    this.renderer.setStyle(this.el.nativeElement, 'transform', 'scale(1.03)');
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.renderer.removeStyle(this.el.nativeElement, 'box-shadow');
    this.renderer.removeStyle(this.el.nativeElement, 'transform');
  }
}
