import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";

import { Ng2GoogleChartsModule } from "ng2-google-charts";
import { AppRoutingModule, routingComponents } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HeaderComponent } from "./components/header/header.component";
import { GlobalDataService } from "./globalData.service";
import { VideoComponent } from "./components/video/video.component";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    routingComponents,
    VideoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    Ng2GoogleChartsModule,
  ],
  providers: [GlobalDataService],
  bootstrap: [AppComponent],
})
export class AppModule {}
