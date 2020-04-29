import { Component, OnInit } from "@angular/core";
import { GlobalDataService } from "src/app/globalData.service";
import { IGlobal } from "src/app/global";
import { GoogleChartInterface } from "ng2-google-charts";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  NewConfirmed = 0;
  TotalConfirmed = 0;
  TotalDeaths = 0;
  TotalRecovered = 0;
  Date = "";
  Country = "";
  data: IGlobal[];
  pieChart: GoogleChartInterface = {
    chartType: "PieChart",
  };
  lineChart: GoogleChartInterface = {
    chartType: "LineChart",
  };
  isShowDivIf = true;

  toggleDisplayDivIf() {
    this.isShowDivIf = !this.isShowDivIf;
  }
  constructor(private dataService: GlobalDataService) {}

  initChart() {
    let datatable = [];
    datatable.push(["Country", "Cases"]);
    this.data.forEach((el) => {
      if (el.TotalConfirmed > 2000)
        datatable.push([el.Country, el.TotalConfirmed]);
    });
    console.log(datatable);

    this.pieChart = {
      chartType: "PieChart",
      dataTable: datatable,
      options: { height: 450, pieHole: 0.4 },
    };

    this.lineChart = {
      chartType: "LineChart",
      dataTable: datatable,
      options: { height: 450 },
    };
  }

  ngOnInit() {
    this.dataService.fetchGlobalData().subscribe({
      next: (result) => {
        console.log(result);
        this.data = result;
        console.log(this.data);
        result.forEach((el) => {
          if (!Number.isNaN(el.NewConfirmed)) {
            this.NewConfirmed += el.NewConfirmed;
            this.TotalConfirmed += el.TotalConfirmed;
            this.TotalDeaths += el.TotalDeaths;
            this.TotalRecovered += el.TotalRecovered;
            this.Date = el.Date;
          }
        });
        this.initChart();
      },
    });
  }
}
