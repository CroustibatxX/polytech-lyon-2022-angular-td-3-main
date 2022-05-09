import { Directive, ElementRef, Input, OnChanges, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appClasseVol]'
})
export class ClasseVolDirective implements OnChanges {

  constructor(private el: ElementRef) { }

  @Input() appClasseVol: string | undefined;

  ngOnChanges(changes: SimpleChanges){
    this.color(changes['appClasseVol'].currentValue)
  }
  color(classe: string): void {
    let divColor = ''
    switch (classe.toUpperCase()) {
      case 'BUSINESS':
        divColor = "red"
        break;
      case 'PREMIUM':
        divColor = "green"
        break;
      case 'STANDARD':
        divColor = "blue"
    }  
    this.el.nativeElement.style.color = divColor
  }
}
