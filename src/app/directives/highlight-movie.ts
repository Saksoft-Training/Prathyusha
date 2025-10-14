import { Directive,  ElementRef, HostListener, Renderer2 } from '@angular/core';


/**
 * Directive to highlight a movie card on mouse hover.
 * Adds a shadow and scale effect on mouse enter and removes them on mouse leave.
 */
@Directive({
  selector: '[appHighlightMovie]'
})
export class HighlightMovie {
  /**
   * @param el - ElementRef to access the host element
   * @param renderer - Renderer2 to safely manipulate styles
   */
constructor(private el: ElementRef, private renderer: Renderer2) {}
  /**
   * Handles mouse enter event on the host element.
   * Adds a box-shadow and scale effect.
   * @returns void
   */
  @HostListener('mouseenter') onMouseEnter() {
    this.renderer.setStyle(this.el.nativeElement, 'box-shadow', '0 4px 12px rgba(0,0,0,0.4)');
    this.renderer.setStyle(this.el.nativeElement, 'transform', 'scale(1.03)');
  }
  /**
   * Handles mouse leave event on the host element.
   * Removes the box-shadow and scale effect.
   * @returns void
   */
  @HostListener('mouseleave') onMouseLeave() {
    this.renderer.removeStyle(this.el.nativeElement, 'box-shadow');
    this.renderer.removeStyle(this.el.nativeElement, 'transform');
  }
}
