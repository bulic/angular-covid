import { Component, OnInit } from '@angular/core';
import { GlobalDataService } from 'src/app/globalData.service';
import { IGlobal } from 'src/app/global';
import { ICountries } from 'src/app/countries';
import { GoogleChartInterface } from 'ng2-google-charts';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  Date = '';
  Country = '';
  dataCountries: ICountries[];
  dataGlobal: IGlobal;
  isTableShow = true;

  pieChart: GoogleChartInterface = {
    chartType: 'PieChart',
  };
  columnChart: GoogleChartInterface = {
    chartType: 'ColumnChart',
  };

  constructor(private dataService: GlobalDataService) {}

  toggleTable() {
    this.isTableShow = !this.isTableShow;
  }

  initChart() {
    let arr = this.dataCountries.filter((a) => {
      if (a.TotalConfirmed > 10000) {
        return a.TotalConfirmed;
      }
    });

    this.pieChart = {
      chartType: 'PieChart',
      dataTable: [['Country', 'Cases'], ...this.getDataTable()],
      options: { height: 450, pieHole: 0.4 },
    };
    this.columnChart = {
      chartType: 'ColumnChart',
      dataTable: [
        ['Country', 'Cases'],
        ...arr.map((el) => [el.Country, el.TotalConfirmed]),
      ],
      options: { height: 450 },
    };
  }

  getDataTable() {
    return this.dataCountries.map((el) => [el.Country, el.TotalConfirmed]);
  }

  ngOnInit() {
    this.fetchData();
  }

  fetchData() {
    this.dataService.fetchGlobalData().subscribe(({ countries, global }) => {
      this.dataCountries = countries;
      this.dataGlobal = global;
      countries.map((el) => {
        this.Date = el.Date;
      });
      this.initChart();
    });
  }
}
