import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { IGlobal } from './global';
import { ICountries } from './countries';

@Injectable()
export class GlobalDataService {
  private globalDataUrl = `https://api.covid19api.com/summary`;

  constructor(private http: HttpClient) {}

  fetchGlobalData() {
    return this.http
      .get<{ Countries: ICountries[]; Global: IGlobal }>(this.globalDataUrl)
      .pipe(
        map((data) => ({
          countries: data.Countries,
          global: data.Global,
        }))
      );
  }
}
