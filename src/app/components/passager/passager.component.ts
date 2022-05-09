import { Component, Input } from '@angular/core';
import { Passager } from 'src/app/models/passager.model';


@Component({
  selector: 'app-passager',
  templateUrl: './passager.component.html',
  styleUrls: ['./passager.component.scss']
})
export class PassagerComponent {
  @Input() passenger: Passager | undefined;
  @Input() displayThumb: boolean = false;
}