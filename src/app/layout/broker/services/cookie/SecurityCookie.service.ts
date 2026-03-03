import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
//new imports
import { inject } from '@angular/core';
import { AppConfigService } from '~core/services/appConfigService.service';


@Injectable({
    providedIn: 'root'
})

export class SecurityCookieService {
    private readonly appConfig = inject(AppConfigService);

    private headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    private Url = this.appConfig.URL_API_SCTR;

    constructor(private http: HttpClient) { }

    public getSecurityCookie(): Observable<any> {
        return this.http.post(this.Url + '/Security/GenerateCookieSecurity', null, {
            headers: this.headers,
            // withCredentials: true
        });
    }
}