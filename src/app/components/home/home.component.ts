import { Component, OnInit, OnDestroy } from '@angular/core';
import { GlobalDataService } from 'src/app/globalData.service';
import { IGlobal } from 'src/app/global';
import { ICountries } from 'src/app/countries';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  loading: boolean = false;
  totalData = {
    totalConfirmed: 0,
    totalDeaths: 0,
    totalRecovered: 0,
  };
  Date = '';
  Country = '';
  datatable = [];
  dataCountries: ICountries[];
  dataGlobal: IGlobal;
  dataServiceSub$: Subscription;
  isTableShow = true;
  chart = {
    PieChart: 'PieChart',
    ColumnChart: 'ColumnChart',
    height: 400,
    dynamicResize: true,
  };

  constructor(private dataService: GlobalDataService) {}

  ngOnInit() {
    this.fetchData();
  }

  ngOnDestroy() {
    this.dataServiceSub$.unsubscribe();
  }

  fetchData() {
    this.loading = true;
    this.dataServiceSub$ = this.dataService
      .fetchGlobalData()
      .subscribe(({ countries, global }) => {
        this.dataCountries = countries;
        this.dataGlobal = global;
        this.totalData.totalConfirmed = global.TotalConfirmed;
        this.totalData.totalDeaths = global.TotalDeaths;
        this.totalData.totalRecovered = global.TotalRecovered;
        this.loading = false;
        countries.map((el) => {
          this.Date = el.Date;
        });
        this.initChart();
      });
  }

  toggleTable() {
    this.isTableShow = !this.isTableShow;
  }

  initChart() {
    this.datatable = [];
    let arr = this.dataCountries.filter((a) => {
      if (a.TotalConfirmed > 20000) {
        return a.TotalConfirmed;
      }
    });
    arr.forEach((cs) => {
      let value: number;
      value = cs.TotalConfirmed;
      this.datatable.push([cs.Country, value]);
    });
  }

  getDataTable() {
    return this.dataCountries.map((el) => [el.Country, el.TotalConfirmed]);
  }
}
