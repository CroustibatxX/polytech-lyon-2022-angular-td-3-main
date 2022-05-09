import { Component, Input } from '@angular/core';
import { Vol } from 'src/app/models/vol.model';
import { COMPAGNIES } from 'src/app/constants/compagnie.constant';

@Component({
  selector: 'app-vol',
  templateUrl: './vol.component.html',
  styleUrls: ['./vol.component.scss']
})
export class VolComponent {
  @Input() vol: Vol | undefined;

  compganies = COMPAGNIES
  
}
