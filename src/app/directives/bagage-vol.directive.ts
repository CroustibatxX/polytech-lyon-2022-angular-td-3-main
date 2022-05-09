import { Directive, Input, SimpleChanges, ElementRef } from '@angular/core';
import { Passager } from '../models/passager.model';

@Directive({
  selector: '[appBagageVol]'
})
export class BagageVolDirective {

  constructor(private el: ElementRef) { }

  @Input() appBagageVol: Passager | undefined;

  ngOnChanges(changes: SimpleChanges){
    this.bagagesCheck(changes['appBagageVol'].currentValue["nbBagagesSoute"], changes['appBagageVol'].currentValue["classeVol"])
  }

  bagagesCheck(bgNumber: number, passengerClasse: string): void {
    if ((passengerClasse == 'BUSINESS' && bgNumber > 3) || (passengerClasse == 'PREMIUM' && bgNumber > 2) || (passengerClasse == 'STANDARD' && bgNumber > 1)) {
      this.el.nativeElement.style.backgroundColor = 'red'
    }
  }

}
