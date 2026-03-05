import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, LOCALE_ID, NgModule } from '@angular/core';

import { SessionStorageService } from './../../shared/services/storage/storage-service';

import { CommonModule, DatePipe, DecimalPipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// Modules
import { BrokerRoutingModule } from './broker-routing.module';
import { RecaptchaModule } from 'ng-recaptcha';
// Components
import { BrokerComponent } from './broker.component';
import { LoginComponent } from './components/login/login.component';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { AuthenticationService } from './services/authentication.service';
import { UserService } from './services/user.service';
import { AppConfig } from '../../app.config';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { ModalModule } from 'ngx-bootstrap/modal';
import { SidebarService } from '../../shared/services/sidebar/sidebar.service';
import { LoginRemoteComponent } from './components/login/login-remote.component';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { NavMenuProdModule } from '../../shared/components/navmenuprod/navmenuprod.module';
import { WelcomeComponent } from '../../shared/components/soat/generic/welcome/welcome.component';
import { PasswordService } from './services/password/password.service';
import { CommonComponentsModule } from '@shared/modules/common-components.module';

import { BrokerHttpInterceptor } from './guards/broker-http-interceptor';
import { AuthInterceptor } from '../../shared/interceptors/auth.interceptor';
import { PanelComponent } from './components/panel/panel.component';

@NgModule({
    imports: [
        CommonModule,
        BrokerRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        PaginationModule.forRoot(),
        TimepickerModule.forRoot(),
        ModalModule,
        BsDatepickerModule.forRoot(),
        ModalModule.forRoot(),
        RecaptchaModule,
        ReactiveFormsModule,
        TabsModule.forRoot(),
        NavMenuProdModule,
       CommonComponentsModule        
    ],
    exports: [FormsModule],
    declarations: [
        BrokerComponent,
        LoginComponent,
        LoginRemoteComponent,
        WelcomeComponent,
        PanelComponent,
    ], 
    schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    providers: [
        AppConfig,
        AuthenticationService,
        UserService,
        DatePipe,
        DecimalPipe,
        SidebarService,
        SessionStorageService,
        PasswordService,
         {
            provide: HTTP_INTERCEPTORS,
            useClass: BrokerHttpInterceptor,
            multi: true,
        },
         {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true,
        }
    ],
})
export class BrokerModule { }
