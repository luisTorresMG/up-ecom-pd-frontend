import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, LOCALE_ID, NgModule } from '@angular/core';

// Modules
import { BrokerRoutingModule } from './broker-routing.module';
import { NewMenuLandingComponent } from '~shared/components/new-menu-landing/new-menu-landing.component';


@NgModule({
    imports: [
      BrokerRoutingModule,
      NewMenuLandingComponent
    ],
    exports: [
        
    ],
    declarations: [
       
        
    ],

    schemas: [
        
    ],
    providers: [
        
    ],
})
export class BrokerModule { }
