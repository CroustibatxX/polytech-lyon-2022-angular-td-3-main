import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { COMPAGNIES } from './../constants/compagnie.constant';
import { IVolDto, Vol } from './../models/vol.model';

@Injectable({
  providedIn: 'root'
})
export class VolService {

  constructor(private http: HttpClient) { }

  /**
   * Récupération de la liste des vols en départ d'un aéroport donné en paramètre et selon un intervalle de temps donné.
   * Open Sky REST API
   * https://openskynetwork.github.io/opensky-api/rest.html#departures-by-airport
   */
  getVolsDepart(code: string, debut: number, fin: number): Observable<Vol[]> {
    return this.http.get<any>(`https://opensky-network.org/api/flights/departure?airport=${code}&begin=${debut}&end=${fin}`).pipe(
      map((response) => response
        .filter((dto: IVolDto) => this._estUnVolAirFrance(dto))
        .map((dto: IVolDto) => new Vol(dto))
    ));
  }

  /**
   * Récupération de la liste des vols en arrivé d'un aéroport donné en paramètre et selon un intervalle de temps donné.
   * Open Sky REST API
   * https://openskynetwork.github.io/opensky-api/rest.html#departures-by-airport
   */
   getVolsArrivee(code: string, debut: number, fin: number): Observable<Vol[]> {
    return this.http.get<any>(`https://opensky-network.org/api/flights/arrival?airport=${code}&begin=${debut}&end=${fin}`).pipe(
      map((response) => response
        .filter((dto: IVolDto) => this._estUnVolAirFrance(dto))
        .map((dto: IVolDto) => new Vol(dto))
    ));
  }



  private _estUnVolAirFrance(dto: IVolDto): boolean {
    return !!Object.keys(COMPAGNIES).find((key$) =>
      dto.callsign.includes(key$)
    );
  }
}
