import { Component, EventEmitter, Output, ViewEncapsulation } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MAT_DATE_RANGE_SELECTION_STRATEGY } from '@angular/material/datepicker';
import { FiveDayRangeSelectionStrategy } from 'src/app/date-adapter';
import { IAeroport } from 'src/app/models/aeroport.model';
import { IFiltres } from 'src/app/models/filtres.model';
import { AEROPORTS } from './../../constants/aeroport.constant';

@Component({
  selector: 'app-filtres',
  templateUrl: './filtres.component.html',
  styleUrls: ['./filtres.component.scss'],
  providers: [
    {
      provide: MAT_DATE_RANGE_SELECTION_STRATEGY,
      useClass: FiveDayRangeSelectionStrategy,
    },
  ],
  encapsulation: ViewEncapsulation.None
})
export class FiltresComponent {

  @Output() filtresEvent = new EventEmitter<IFiltres>();

  /**
   * La liste des aéroports disponibles est une constante,
   * on n'utilise que les principaux aéroports français pour l'instant
   */
  aeroports: IAeroport[] = AEROPORTS;

  aeroport = new FormControl(null, Validators.required);
  debut = new FormControl(null, Validators.required);
  fin = new FormControl(null, Validators.required);

  emitFiltres(): void {
    this.filtresEvent.emit({
      aeroport: this.aeroport.value,
      debut: this.debut.value,
      fin: this.fin.value
    });
  }

  appliquerEstDesactive(): boolean {
    return !!this.aeroport?.errors?.['required'] ||
      !!this.debut?.errors?.['required'] ||
      !!this.fin?.errors?.['required'];
  }

}
