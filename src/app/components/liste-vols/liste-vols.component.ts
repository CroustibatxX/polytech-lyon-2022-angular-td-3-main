import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Vol } from 'src/app/models/vol.model';

@Component({
  selector: 'app-liste-vols',
  templateUrl: './liste-vols.component.html',
  styleUrls: ['./liste-vols.component.scss']
})
export class ListeVolsComponent {
  @Input() listeVols: Vol[] | undefined
  @Output() displayPassenger = new EventEmitter<Vol>();

  selectVol(vol: Vol): void {
    this.displayPassenger.emit(vol);
  }
}
