import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { Observable } from "rxjs";

@Injectable()
export class GlobalDataService {
  private globalDataUrl = `https://api.covid19api.com/summary`;
  constructor(private http: HttpClient) {}

  fetchGlobalData(): Observable<any[]> {
    return this.http.get(this.globalDataUrl).pipe(
      map((result) => {
        const prop = "Countries";
        if (result.hasOwnProperty(prop)) {
          return result[prop];
        }
      })
    );
  }
}
