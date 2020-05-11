import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { IGlobal } from './global';
import { ICountries } from './countries';

@Injectable()
export class GlobalDataService {
  private globalDataUrl = 'https://api.covid19api.com/summary';

  constructor(private http: HttpClient) {}

  fetchGlobalData() {
    return this.http
      .get<{ Countries: ICountries[]; Global: IGlobal }>(this.globalDataUrl)
      .pipe(
        map(({ Countries, Global }) => ({
          countries: Countries,
          global: Global,
        }))
      );
  }

  fetchDataCountry(name: string) {
    return this.http
      .get<any>(`https://api.covid19api.com/dayone/country/${name}`)
      .pipe(
        map((data) =>
          data.reduce(
            (acc, item) => [
              ...acc,
              { ...item, Date: new Date(item.Date).toLocaleDateString() },
            ],
            []
          )
        )
      );
  }

  fetchWeatherData(lat: number, lon: number) {
    return this.http
      .get<any>(
        `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=9c7178a58edc89a14593118e51a4e609`
      )
      .pipe(
        map((data) => {
          return {
            name: data.name,
            temp: data.main.temp,
          };
        })
      );
  }
}
