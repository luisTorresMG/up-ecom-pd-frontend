import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppConfig } from '../../../../../app.config';
import { ProductByUserRQ } from '../../../models/product/panel/Request/ProductByUserRQ';

@Injectable({
    providedIn: 'root'
})
export class ProductService {
    private headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    private Url = AppConfig.URL_API_SCTR;
    private apiOtp = AppConfig.URL_API_OTPAWS;
    constructor(private http: HttpClient) { }

    public getProductByUser(data: ProductByUserRQ): Observable<any> {
        const request = JSON.stringify(data);
        return this.http.post(this.Url + '/Product/ProductsByUser', request, { headers: this.headers });
    }

    public getEps(): Observable<any> {
        return this.http.post(this.Url + '/Product/EpsKuntur', '', { headers: this.headers });
    }

    public getDataSctr(data: any): Observable<any> {
      const request = JSON.stringify(data);
      return this.http.post(this.Url + '/Product/DataSctr', request, { headers: this.headers });
    }

    public getValidateUser (data: any): Observable<any> {
      debugger
        const url = `${this.apiOtp}/security/globalAuthentication/v0/authentication`;
        console.log(data)

        // const headersType = new HttpHeaders({
        //   'validation-type': '10'
        // });

         const headersType = new HttpHeaders({
        'accept': 'application/json, text/plain, */*',
        'accept-language': 'es-ES,es;q=0.9',
        'authorization': 'Bearer', // Aquí deberías agregar tu token
        'content-type': 'application/json',
        'origin': 'http://localhost:4400',
        'priority': 'u=1, i',
        'referer': 'http://localhost:4400/',
        'sec-ch-ua': '"Not:A-Brand";v="99", "Google Chrome";v="145", "Chromium";v="145"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'cross-site',
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36',
        'validation-type': '10' // Este es un encabezado personalizado
    });


        if (data.authentication.userData?.processId) {
          return this.http.post(url, data, { headers: headersType });
        }

        return this.http.post(url, data);
    }

    public validateToken(data: any, token: string): Observable<any> {
        const url = `${this.apiOtp}/security/globalAuthentication/v0/authentication`;

        const headersToken = new HttpHeaders({
          'validation-type': '10',
          'validation-data': token
        });
        return this.http.post(url, data, { headers: headersToken });
    }

}
