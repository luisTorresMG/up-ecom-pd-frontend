import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VersionCheckService } from '~shared/services/check-service/version-check.service';
import { AppConfig } from './app.config';

@NgModule({
  declarations: [
    AppComponent,   
  ],
  imports: [
    BrowserModule,  
    AppRoutingModule,
  ],
  providers: [
    VersionCheckService,
    AppConfig,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
