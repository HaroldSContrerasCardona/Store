import { Directive, ElementRef, inject } from '@angular/core';

@Directive({
  selector: '[highlight]',
  standalone: true
})
export class HighlightDirective {

  elemet = inject(ElementRef);

  constructor() { }

  ngOnInit(){
    this.elemet.nativeElement.style.backgroundColor = "red";
  }

}
