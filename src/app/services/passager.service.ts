import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { IPassagerDto, Passager } from './../models/passager.model';

@Injectable({
  providedIn: 'root'
})
export class PassagerService {

  constructor(private http: HttpClient) { }

  /**
   * Récupération de la liste des passagers pour un N° de vol donné.
   * N'ayant pas la capacité des avions nous récupérons uniquement 20 passagers par vol.
   * L'attribut seed de l'APi permet de récupérer la même liste de passager pour chaque vol, par rapport à son icao.
   * Random User Generator
   * https://randomuser.me/
   */
  getPassagers(icao: string): Observable<Passager[]> {
    return this.http.get<any>(`https://randomuser.me/api?results=20&inc=email,name,picture&seed=${icao}`).pipe(
      map((response) => response.results.map((dto: IPassagerDto) => new Passager(dto))));
  }
}
