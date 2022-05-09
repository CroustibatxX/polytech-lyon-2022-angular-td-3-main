import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IFiltres } from 'src/app/models/filtres.model';
import { Vol } from 'src/app/models/vol.model';
import { VolService } from '../../services/vol.service';
import { Passager } from 'src/app/models/passager.model';
import { PassagerService } from 'src/app/services/passager.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-airfrance',
  templateUrl: './view-airfrance.component.html',
  styleUrls: ['./view-airfrance.component.scss'],
})
export class ViewAirFranceComponent implements OnDestroy, OnInit {

  vols!: Vol[];
  passengers!: Passager[];
  type!: string;

  displayLoader: boolean = false;

  private _volSubscriptions!: Subscription;
  private _passengersSubscriptions!: Subscription;
  private _activatedRouteSubscription!: Subscription;

  constructor(
    private _volService: VolService,
    private _passagerService: PassagerService,
    private _activatedRoute: ActivatedRoute
  ) {}

  /**
   * Réaction à la mise à jour des filtres
   * On souhaite récupérer les vols qui correspondent aux filtres passés en paramètre
   * en utilisant le service défini dans le constructeur
   * @param filtres récupérés depuis le composant enfant
   */
  onFiltresEvent(filtres: IFiltres): void {
    this.displayLoader = true

    let depart = Math.floor(filtres.debut.getTime() / 1000);
    let arrive = Math.floor(filtres.fin.getTime() / 1000);
    console.log(this.type)
    if (this.type == 'decollages') {
      this._volSubscriptions = this._volService.getVolsDepart(filtres.aeroport.icao, depart, arrive).subscribe((value) => {
          this.vols = value;
          this.displayLoader = false
        });
    } else {
      this._volSubscriptions = this._volService.getVolsArrivee(filtres.aeroport.icao, depart, arrive).subscribe((value) => {
          this.vols = value;
          this.displayLoader = false
        });
    }
  }

  ngOnInit(): void {
    this._activatedRouteSubscription = this._activatedRoute.data.subscribe(
      (data$) => (this.type = data$['type'] ? data$['type'] : 'decollages')
    );
  }

  ngOnDestroy(): void {
    if (this._volSubscriptions !== undefined) {
      this._volSubscriptions.unsubscribe();
    }
    if (this._passengersSubscriptions !== undefined) {
      this._passengersSubscriptions.unsubscribe();
    }
    this._activatedRouteSubscription.unsubscribe();
  }

  displayPassenger(vol: Vol): void {
    this._passengersSubscriptions = this._passagerService
      .getPassagers(vol.icao)
      .subscribe((value) => (this.passengers = value));
  }
}
