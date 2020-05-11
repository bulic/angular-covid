import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { GlobalDataService } from './globalData.service';
import { VideoComponent } from './components/video/video.component';
import { CardComponent } from './components/card/card.component';
import { GoogleChartsModule } from 'angular-google-charts';
import { AgmCoreModule } from '@agm/core';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    routingComponents,
    VideoComponent,
    CardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    GoogleChartsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCOAZ3sQ2kjkL8f7Uoil6B3R4fT562HsXM',
    }),
  ],
  providers: [GlobalDataService],
  bootstrap: [AppComponent],
})
export class AppModule {}
