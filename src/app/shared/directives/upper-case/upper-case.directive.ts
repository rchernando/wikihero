import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appUpperCase]',
  standalone: true
})
export class UpperCaseDirective {

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  @HostListener('input', ['$event.target.value'])
  onInput(value: string) {
    const uppercasedValue = value.toUpperCase();
    this.renderer.setProperty(this.el.nativeElement, 'value', uppercasedValue);
  }

}
