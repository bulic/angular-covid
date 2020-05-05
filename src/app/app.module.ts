import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { Ng2GoogleChartsModule } from 'ng2-google-charts';
import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { GlobalDataService } from './globalData.service';
import { VideoComponent } from './components/video/video.component';
import { CardComponent } from './components/card/card.component';
import { YouTubePlayerModule } from '@angular/youtube-player';

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
    Ng2GoogleChartsModule,
    YouTubePlayerModule,
  ],
  providers: [GlobalDataService],
  bootstrap: [AppComponent],
})
export class AppModule {}
