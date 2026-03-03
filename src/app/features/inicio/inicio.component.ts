import { ChangeDetectionStrategy, Component, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
//new imports
import { OnInit } from '@angular/core';
// import { SessionStorageService } from '~shared/services/storage/storage-service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AppConfigService } from '~core/services/appConfigService.service';
import { NewMenuLandingComponent } from '~shared/components/new-menu-landing/new-menu-landing.component';
import { FooterComponent } from '~shared/components/footer/footer.component';

@Component({
  selector: 'app-inicio',
  imports: [NewMenuLandingComponent,FooterComponent],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InicioComponent implements OnInit {
    private readonly isBrowser: boolean;
    constructor(
    // private sessionStorageService: SessionStorageService,
    @Inject(PLATFORM_ID) platformId: object,
    private router: Router,
    private spinner: NgxSpinnerService,
    private appConfig: AppConfigService
    ) {
      this.isBrowser = isPlatformBrowser(platformId);
    }

    // Helpers seguros
    private setLS(key: string, value: string) {
      if (this.isBrowser) localStorage.setItem(key, value);
    }

    private getLS(key: string): string | null {
      return this.isBrowser ? localStorage.getItem(key) : null;
    }

    ngOnInit() {
      this.setLS('showNewMenu', 'true');
      // localStorage.setItem('showNewMenu', 'true');
    }

     trackClient() {
    this.trackAnalitycs('Compra tu SOAT y participa de los sorteos');
    this.setLS('showNewMenu', 'false');

    this.appConfig.pixelEvent(
      'virtualEvent',
      'SOAT Digital - Cliente - Paso 0',
      'Botón - Home',
      '(not available)'
    );

    this.router.navigate(['soat']);
  }

  trackBroker() {
    const raw = this.getLS('currentUser');
    const currentUser = raw ? JSON.parse(raw) : null;

    if (currentUser && currentUser.forwardAccount) {
      this.router.navigate(['/extranet/welcome']);
      return;
    }

    this.trackAnalitycs('Soy un Corredor de Negocios');
    this.setLS('showNewMenu', 'false');
    this.router.navigate(['extranet']);
  }

  trackAllye() {
    this.spinner.show();
    this.trackAnalitycs('Soy un Canal Aliado');
    this.setLS('showNewMenu', 'false');
    this.router.navigate(['extranet']);
  }

  trackAnalitycs(description: string) {
    this.appConfig.pixelEvent(
      'virtualEvent',
      'SOAT Digital - Home',
      'Clic en botón',
      description
    );
  }



  // trackClient() {
  //   // this.spinner.show();
  //   this.trackAnalitycs('Compra tu SOAT y participa de los sorteos');
  //   localStorage.setItem('showNewMenu', 'false');
  //   this.appConfig.pixelEvent(
  //     'virtualEvent',
  //     'SOAT Digital - Cliente - Paso 0',
  //     'Botón - Home',
  //     '(not available)'
  //   );
  //   this.router.navigate(['soat']);
  // }

  // trackBroker() {
  //   const currentUser = JSON.parse(localStorage.getItem('currentUser'));

  //   if (currentUser && currentUser.forwardAccount) {
  //     this.router.navigate(['/extranet/welcome']);
  //     return;
  //   }

  //   this.trackAnalitycs('Soy un Corredor de Negocios');
  //   localStorage.setItem('showNewMenu', 'false');
  //   this.router.navigate(['extranet']);
  // }

  // trackAllye() {
  //   this.spinner.show();
  //   this.trackAnalitycs('Soy un Canal Aliado');
  //   localStorage.setItem('showNewMenu', 'false');
  //   this.router.navigate(['extranet']);
  // }

  // trackAnalitycs(description) {
  //   this.appConfig.pixelEvent(
  //     'virtualEvent',
  //     'SOAT Digital - Home',
  //     'Clic en botón',
  //     description
  //   );
  // }


}
  