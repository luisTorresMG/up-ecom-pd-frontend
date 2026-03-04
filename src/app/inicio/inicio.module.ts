import { SessionStorageService } from './../shared/services/storage/storage-service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InicioComponent } from './inicio.component';
// import { CommonComponentsModule } from '~shared/modules/common-components.module';
import { InicioRoutingModule } from './inicio-routing.module';
import { NewMenuLandingComponent } from '~shared/components/new-menu-landing/new-menu-landing.component';
import { FooterComponent } from '~shared/components/footer/footer.component';
import { AppConfig } from '../app_.config';

@NgModule({
  imports: [
    CommonModule, 
    InicioRoutingModule, 
    // CommonComponentsModule
  ],
  declarations: [InicioComponent, NewMenuLandingComponent, FooterComponent],
  providers: [SessionStorageService,AppConfig],
})
export class InicioModule {}
//for review