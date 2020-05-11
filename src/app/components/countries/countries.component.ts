import { Component, OnInit } from '@angular/core';
import { GlobalDataService } from 'src/app/globalData.service';
import { ICountries } from 'src/app/countries';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.scss'],
})
export class CountriesComponent implements OnInit {
  loading: boolean = false;
  country = '';
  totalData = {
    totalConfirmed: 0,
    totalDeaths: 0,
    totalRecovered: 0,
  };
  lon: number;
  lat: number;
  weatherData = { temp: null, name: '' };
  dataCountries: ICountries[];
  dataForCountry: ICountries[];
  countries: string[] = [];
  dataServiceSub$: Subscription;
  serviceSub$: Subscription[] = [];
  defaultCountry = 'Serbia';
  datatable = [];
  chart = {
    LineChart: 'LineChart',
    height: 400,
    dynamicResize: true,
    options: {
      hAxis: {
        title: 'Date',
      },
      vAxis: {
        title: 'Cases',
      },
    },
  };
  columnLabels: string[] = ['Date', 'Cases'];

  constructor(private dataService: GlobalDataService) {}

  ngOnInit(): void {
    this.loading = true;
    this.dataServiceSub$ = this.dataService
      .fetchGlobalData()
      .subscribe(({ countries }) => {
        this.dataCountries = countries;
        this.loading = false;

        this.dataCountries
          .filter((el) => el.Country == this.defaultCountry)
          .map((opt) => {
            this.totalData.totalConfirmed = opt.TotalConfirmed;
            this.totalData.totalDeaths = opt.TotalDeaths;
            this.totalData.totalRecovered = opt.TotalRecovered;
          });
      });
    this.dataCountry(this.defaultCountry);
  }

  ngOnDestroy() {
    this.dataServiceSub$.unsubscribe();
    this.serviceSub$.forEach((sub) => sub.unsubscribe());
  }

  onChange(Country: string) {
    this.dataCountry(Country);
    this.dataCountries.forEach((cs) => {
      if (cs.Country == Country) {
        this.totalData.totalConfirmed = cs.TotalConfirmed;
        this.totalData.totalDeaths = cs.TotalDeaths;
        this.totalData.totalRecovered = cs.TotalRecovered;
      }
    });
  }

  dataCountry(data: string) {
    this.serviceSub$.push(
      this.dataService.fetchDataCountry(data).subscribe((data) => {
        this.dataForCountry = data;
        if (data.length) {
          this.country = this.dataForCountry[0].Country;
          this.initChart();
          let lastElemant = this.dataForCountry[this.dataForCountry.length - 1];
          this.totalData.totalConfirmed = +lastElemant.Confirmed;
          this.totalData.totalDeaths = +lastElemant.Deaths;
          this.totalData.totalRecovered = +lastElemant.Recovered;
          this.lat = +this.dataForCountry[0].Lat;
          this.lon = +this.dataForCountry[0].Lon;
          this.serviceSub$.push(
            this.dataService.fetchWeatherData(this.lat, this.lon).subscribe(
              (data) =>
                (this.weatherData = {
                  ...this.weatherData,
                  temp: Math.round(data.temp),
                  name: data.name,
                })
            )
          );
        } else {
          this.totalData.totalConfirmed = 0;
          this.totalData.totalDeaths = 0;
          this.totalData.totalRecovered = 0;
        }
      })
    );
  }

  initChart() {
    this.datatable = [];
    this.dataForCountry.map((el) => {
      this.datatable.push([el.Date, +el.Confirmed]);
    });
  }
}
