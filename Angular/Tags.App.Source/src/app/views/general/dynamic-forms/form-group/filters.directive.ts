import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[filter-host]',
})
export class FiltersDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }
}
