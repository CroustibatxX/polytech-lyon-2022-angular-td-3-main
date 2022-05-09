import { Component, Input } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { Passager } from 'src/app/models/passager.model';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-liste-passagers',
  templateUrl: './liste-passagers.component.html',
  styleUrls: ['./liste-passagers.component.scss']
})
export class ListePassagersComponent {
  @Input() passengers: Passager[] = [];

  displayThumb: boolean = false;

  onValChange(state: MatSlideToggleChange){
    this.displayThumb = state.checked;
  }

}
