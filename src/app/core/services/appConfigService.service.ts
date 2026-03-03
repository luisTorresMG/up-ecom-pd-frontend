import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import {
  ElementRef,
  Injectable,
  inject,
  PLATFORM_ID,
  Renderer2,
  RendererFactory2,
} from '@angular/core';
import { environment } from '~environments/environment';

@Injectable({ providedIn: 'root' })
export class AppConfigService {
  private readonly env = environment;
  private readonly platformId = inject(PLATFORM_ID);
  private readonly document = inject(DOCUMENT);

  private readonly renderer: Renderer2 = inject(RendererFactory2).createRenderer(
    null,
    null,
  );

  private isBrowser(): boolean {
    return isPlatformBrowser(this.platformId) && typeof window !== 'undefined';
  }

  private get dataLayer(): any[] | null {
    if (!this.isBrowser()) return null;
    return (window as any).dataLayer ?? null;
  }

 
  public readonly apiUrl = this.env.backendapi;

 
  public get ACTION_FORM_VISA_CLIENT(): string {
    return this.env.backendapi + '/pago/formresponse/1';
  }

  public get IS_PROTECTA(): boolean {
    if (!this.isBrowser()) return false;

    try {
      const raw = localStorage.getItem('currentUser');
      if (!raw) return false;

      const currentUser = JSON.parse(raw);
      return currentUser?.canal?.toString() === '2018000011';
    } catch {
      return false;
    }
  }

  public get FILTER_CHANNEL_ONLY_BROKER(): { res: boolean; channel: string | null } {
    if (!this.isBrowser()) {
      return { res: false, channel: null };
    }

    const key = this.PROFILE_ADMIN_STORE;
    if (key !== null) {
      try {
        const simulateChannelRaw = localStorage.getItem(key);
        const simulateChannel = simulateChannelRaw ? JSON.parse(simulateChannelRaw) : null;

        if (simulateChannel) {
          return {
            res: true,
            channel: simulateChannel.nchannel,
          };
        }
      } catch {
        // ignore
      }
    }

    return { res: false, channel: null };
  }

  public get ACTION_FORM_VISA_BROKER(): string {
    return this.env.backendapi + '/pago/formresponse/2';
  }

  public get ACTION_FORM_VISA_PAYROLL(): string {
    return this.env.backendapi + '/pago/formresponse/3';
  }

  public get ACTION_FORM_VISA_PREPAYROLL(): string {
    return this.env.backendapi + '/pago/formresponse/4';
  }

  public get ACTION_FORM_VISA_SOAT(): string {
    return this.env.backendapi + '/pago/formresponse/6';
  }

  public get ACTION_FORM_VISA_RENOVATION(): string {
    return this.env.backendapi + '/pago/formresponse/8';
  }

  public get ACTION_FORM_VISA_VIDALEY(): string {
    return this.env.backendapi + '/pago/formresponse/7';
  }

  public get ACTION_FORM_VISA_SCTR(): string {
    return this.env.backendapi + '/pago/formresponse/9';
  }

  public get ACTION_FORM_VISA_SCTR_ECOMMERCE(): string {
    return this.env.backendapi + '/pago/formresponse/10';
  }

  public get ACTION_FORM_VISA_ECOMMERCE(): string {
    return this.env.backendapi + '/pago/formresponse/11';
  }

  public get ACTION_FORM_VIDA_VIDAINDIVIDUAL(): string {
    return this.env.backendapi + '/pago/formresponse/12';
  }

  public get ACTION_FORM_ACCIDENTES_PERSONALES(): string {
    return this.env.backendapi + '/pago/formresponse/13';
  }

  public get ACTION_VISA_PAY(): string {
    return `${this.WSPD_API}/pago/transaction`;
  }

  public get MERCHANT_LOGO_VISA(): string {
    return this.env.domainurl + '/assets/logos/logo_protecta_security_cajon.png';
  }

  public get LOGO_PROTECTA(): string {
    return `${this.env.domainurl}/assets/logos/logo-latest.png`;
  }

  public get MERCHANT_NAME_VISA(): string {
    return 'Protecta Security';
  }

  public get CAPTCHA_KEY(): string {
    return this.env.recaptchaKey;
  }

  public get CAPTCHA_KEY_SOAT(): string {
    return this.env.recaptchaKeySoat;
  }

  public get ITEMS_POR_PAGINA(): number {
    return 5;
  }

  // Estados de Planilla
  public get PAYROLL_STATUS_PENDING(): number {
    return 1;
  }

  public get PAYROLL_STATUS_PAID(): number {
    return 2;
  }

  // Estados Pre planilla
  public get PREPAYROLL_STATUS_PENDING(): number {
    return 1;
  }

  public get PREPAYROLL_STATUS_PAID(): number {
    return 2;
  }

  // Estados detalle pago
  public get PAYMENT_DETAIL_STATUS_PENDING(): string {
    return '1';
  }

  public get PAYMENT_DETAIL_STATUS_PAID(): string {
    return '2';
  }

  public get URL_API(): string {
    return this.env.backendapi;
  }

  public get URL_API2(): string {
    return this.env.backendapi;
  }

  public get URL_API_SCTR(): string {
    return this.env.kunturapi;
  }

  public get URL_API_IDECON(): string {
    return this.env.ideconapi;
  }

  public get URL_API_REG_NEGATIVO(): string {
    return this.env.reg_negativo_api;
  }

  public get URL_API_WORLD_CHECK(): string {
    return this.env.worldcheckapi;
  }

  public get URL_API_REPORT(): string {
    return this.env.reportapi;
  }

  public get URL_API_SCORING(): string {
    return this.env.scoringapi;
  }

  public get FLUJO_CLIENTE(): string {
    return '1';
  }

  public get FLUJO_BROKER(): string {
    return '2';
  }

  public get FLUJO_PLANILLA(): string {
    return '3';
  }

  public get FLUJO_PREPLANILLA(): string {
    return '4';
  }

  // Configuración tipo de pago
  public get SETTINGS_SALE(): string {
    return '2';
  }

  public get SETTINGS_PAYROLL(): string {
    return '3';
  }

  // Backoffice
  public get BACKOFFICE_API(): string {
    return this.env.backofficeApi;
  }

  public get BIGPRIME_API(): string {
    return this.env.apiBigprime;
  }

  public get PRODUCTION_MODE(): boolean {
    return this.env.production;
  }

  public get DOMAIN_URL(): string {
    return this.env.domainurl;
  }

  public get PATH_PDF_FILES(): string {
    return this.env.domainurl + '/assets/files';
  }

  public get TIPO_PERSONA_FLUJO_CLIENTE(): number {
    return 1;
  }

  public get CUSTOM_SERIAL_NUMBER(): string {
    return '^w{7}$|^w{17}$|^w{20}$';
  }

  public get CUSTOM_MAIL_DOMAIN(): RegExp {
    return /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,6})$/;
  }

  // ===========================
  // Tracking / DataLayer
  // ===========================
  public pixelEvent(event: string, category: string, action: string, label: string): void {
    const dl = this.dataLayer;
    if (!dl) return;

    const script = this.document.createElement('script');
    script.type = 'text/javascript';
    script.innerHTML = `
      (function () {
        dataLayer.push({'event':'${event}','category' : '${category}' , 'action':'${action}', 'label': '${label}'});
      })();
    `;
    this.document.body.appendChild(script);
  }

  public gtmTrackEvent(_: { event: string; payload: any }): void {
    const dl = this.dataLayer;
    if (!dl) return;

    const payload = { event: _.event, ..._.payload };

    const script = this.document.createElement('script');
    script.type = 'text/javascript';
    script.innerHTML = `(function () { dataLayer.push(${JSON.stringify(payload)}); })();`;
    this.document.body.appendChild(script);
  }

  public pixelEventClient(
    event: string,
    category: string,
    action: string,
    label: string,
    clientType: string,
  ): void {
    const dl = this.dataLayer;
    if (!dl) return;

    const script = this.document.createElement('script');
    script.type = 'text/javascript';
    script.innerHTML = `(function () {
      dataLayer.push({
        'event':'${event}',
        'category' : '${category}' ,
        'action':'${action}',
        'label':'${label}',
        'clientType': '${clientType}'
      });
    })();`;
    this.document.body.appendChild(script);
  }

  public pageEvent(config: any): void {
    const dl = this.dataLayer;
    if (!dl) return;
    dl.push(config);
  }

  public pixelEventDetail(productID: string, productoPrecio: string, clase_vehiculo: string): void {
    const dl = this.dataLayer;
    if (!dl) return;

    const script = this.document.createElement('script');
    script.type = 'text/javascript';
    script.innerHTML = `
      (function () {
        dataLayer.push({'event':'productDetails'
          ,'dimension2' : 'Flujo Cliente'
          , 'ecommerce': {
            'currencyCode': 'PEN',
            'detail':{
              'actionField': {'list': 'SOAT Digital'},
              'products': [{
                'name': 'SOAT Digital',
                'id': '${productID}',
                'price': '${productoPrecio}',
                'brand': 'Protecta',
                'category': 'Seguros Vehiculares',
                'variant': '${clase_vehiculo}'
              }]
            }
          }
        });
      })();
    `;
    this.document.body.appendChild(script);
  }

  public pixelEventDetailSoat(
    event: string,
    action: string,
    productID: string,
    productoPrecio: string,
    clase_vehiculo: string,
  ): void {
    const dl = this.dataLayer;
    if (!dl) return;

    const script = this.document.createElement('script');
    script.type = 'text/javascript';
    script.innerHTML = `
      (function () {
        dataLayer.push({'event': '${event}'
          ,'dimension2' : 'Flujo Cliente'
          , 'ecommerce': {
            'currencyCode': 'PEN',
            '${action}':{
              'products': [{
                'name': 'SOAT Digital',
                'id': '${productID}',
                'price': '${productoPrecio}',
                'brand': 'Protecta',
                'category': 'Seguros Vehiculares',
                'variant': '${clase_vehiculo}',
                'quantity': 1
              }]
            }
          }
        });
      })();
    `;
    this.document.body.appendChild(script);
  }

  public pixelPagoExitoso(
    transactionID: string,
    precioVenta: string,
    productID: string,
    productoPrecio: string,
    clase_vehiculo: string,
    cliente_protecta: string,
  ): void {
    const dl = this.dataLayer;
    if (!dl) return;

    const script = this.document.createElement('script');
    script.type = 'text/javascript';
    script.innerHTML = `
      (function () {
        dataLayer.push({
          'event':'orderPurchase',
          'dimension1':'Visanet',
          'dimension2':'Flujo Cliente',
          'dimension8': '${cliente_protecta}',
          'ecommerce': {
            'currencyCode': 'PEN',
            'purchase': {
              'actionField': {
                'id': '${transactionID}',
                'affiliation': 'Standard',
                'revenue': '${precioVenta}',
                'tax':'0.00',
                'shipping': '0.00',
                'coupon': ''
              },
              'products': [{
                'name': 'SOAT Digital',
                'id': '${productID}',
                'price': '${productoPrecio}',
                'brand': 'Protecta',
                'category': 'Seguros Vehiculares',
                'variant': '${clase_vehiculo}',
                'quantity': 1,
                'coupon': ''
              }]
            }
          }
        });
      })();
    `;
    this.document.body.appendChild(script);
  }

  public pixelSaveClientID(): void {
    if (!this.isBrowser()) return;

    const script = this.document.createElement('script');
    script.type = 'text/javascript';
    script.innerHTML = `
      (function () {
        var dato = getClientID();
        sessionStorage.setItem("idClientTrack", dato);
        window.console.log('ClienteId :' + dato , new Date().toLocaleString());
      })();
    `;
    this.document.body.appendChild(script);
  }

  public AddEventAnalityc(): void {
    if (!this.isBrowser()) return;

    const script = this.document.createElement('script');
    script.type = 'text/javascript';
    script.innerHTML = `
      (function () {
        var myFunction2 = function() {
          dataLayer.push({'event':'virtualEvent','category' : 'SOAT Digital - Cliente - Pago' , 'action':'Pago Visa', 'label': 'Ver Pop up'});
        };

        var myVar = setInterval(myTimer, 1000);

        function myTimer() {
          window.console.log('MyTimer:' , new Date().toLocaleString());
          var btnPay = document.getElementsByClassName("start-js-btn modal-opener medium");
          if(btnPay != undefined) {
            for (var i = 0; i < btnPay.length; i++) {
              btnPay[i].addEventListener('click', myFunction2, false);
            }
            myStopFunction();
          }
        }

        function myStopFunction() {
          clearInterval(myVar);
        }
      })();
    `;
    this.document.body.appendChild(script);
  }

  // ===========================
  // Carga de scripts (Renderer2)
  // ===========================
  public loadScriptSubscription(el: ElementRef): Promise<boolean> {
    if (!this.isBrowser()) return Promise.resolve(false);

    const src = this.env.visabuttonserviceRenovacion;

    return new Promise((resolve, reject) => {
      const script = this.renderer.createElement('script');
      script.setAttribute('src', src);

      this.renderer.insertBefore(el.nativeElement.parentNode, script, el.nativeElement);

      // compat legacy
      if ((script as any).readyState) {
        (script as any).onreadystatechange = () => {
          const rs = (script as any).readyState;
          if (rs === 'loaded' || rs === 'complete') {
            (script as any).onreadystatechange = null;
            resolve(true);
          }
        };
      } else {
        script.onload = () => resolve(true);
      }

      script.onerror = (error: any) => {
        console.error(error);
        reject(false);
      };
    });
  }

  public loadGenericScriptBiometric(el: ElementRef, data: any): Promise<boolean> {
    if (!this.isBrowser()) return Promise.resolve(false);

    return new Promise((resolve, reject) => {
      const script = this.renderer.createElement('script');
      script.setAttribute('src', data.src);
      script.setAttribute('id', 'script-biometric');

      this.renderer.insertBefore(el.nativeElement.parentNode, script, el.nativeElement);

      // compat legacy
      if ((script as any).readyState) {
        (script as any).onreadystatechange = () => {
          const rs = (script as any).readyState;
          if (rs === 'loaded' || rs === 'complete') {
            (script as any).onreadystatechange = null;
            resolve(true);
          }
        };
      } else {
        script.onload = () => resolve(true);
      }

      script.onerror = (error: any) => {
        console.error(error);
        reject(false);
      };
    });
  }

  // ===========================
  // Resto de constantes
  // ===========================
  public get BIG_PRIME(): string {
    return this.env.bigPrime;
  }

  public get PROFILE_ADMIN_SOAT(): number {
    return 150;
  }

  public get PROFILE_ADMIN_GUID(): string {
    return 'ADD601A8CA7B';
  }

  public get PROFILE_ADMIN_STORE(): string {
    return '9FF2C61A';
  }

  public get PROFILES_LOAD_SOAT(): Array<{ id: number; name: string; product: number; orden: number }> {
    return [
      { id: 19, name: 'Vendedor', product: 1, orden: 1 },
      { id: 21, name: 'Liquidador', product: 1, orden: 2 },
    ];
  }

  public get TRACK_ID_AP(): string {
    return this.env.trackIdAP;
  }

  public get TRACK_ID_VDP(): string {
    return this.env.trackIdVDP;
  }

  public get GTM_ID_AP(): string {
    return this.env.tagManagerIdAP;
  }

  public get CLOUD_API_KEY_STORAGE(): string {
    return 'ps:cl0xd.4p1.5t0r4g3';
  }

  public get VIDADEVOLUCION_STORAGE(): string {
    return '_xvddv1cn_tr9x';
  }

  public get VIDADEVOLUCION_NSTEP(): string {
    return '_xvddv1cn_5tp';
  }

  public get DESGRAVAMEN_STORAGE(): string {
    return '_ps_dx59xvxmxn_dxtx';
  }

  public get DESGRAVAMEN_NSTEP(): string {
    return '_ps_dx59xvxmxn_nxt3p';
  }

  public get VIDADEVOLUCION_COMERCIAL_STORAGE(): string {
    return '_ps_vxdxdxvxlxcxxn_stxrxgx';
  }

  public get OTPAUTH_STORAGE(): string {
    return '_0tp4uth3nt1c4t10n_5tr9';
  }

  public get SECRET_KEY(): string {
    return 'SC#45@1q56we.r1s_qwe@w-qWx_aPlata#PS';
  }

  public get SECRET_KEY_APICLIENT(): string {
    return 'pms3JIVh2HsbEvVA6fvvy2EHW3t14HyG';
  }

  public get PD_API(): string {
    return this.env.backendapi;
  }

  public get WSPD_API(): string {
    return this.env.wspdApi;
  }

  public get WSPD_APIAWS(): string {
    return this.env.wspdApiAWS;
  }

  public get URL_API_OTPAWS(): string {
    return this.env.apiOtpAws;
  }

  public get CONTRATANTE(): string {
    return '01';
  }

  public get EXPUESTOS(): string {
    return '02';
  }

  public get REPORTESUCAVE(): string {
    return '091';
  }
}