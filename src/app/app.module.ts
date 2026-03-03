import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VersionCheckService } from '~shared/services/check-service/version-check.service';

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
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
