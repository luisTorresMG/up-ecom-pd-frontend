import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { map } from 'rxjs/operators';

import { AuthenticationService } from './authentication.service';
import { User } from '../models';
import {HttpClient, HttpHeaders} from '@angular/common/http';
// import { AppConfig } from '../../../app.config';
import { BaseService } from './base/base.service';
//new imports
import { AppConfigService } from '~core/services/appConfigService.service';
import { inject } from '@angular/core';

@Injectable()
export class UserService  extends BaseService {
    private readonly appConfig = inject(AppConfigService);
    constructor(
            private http: HttpClient,
            private authenticationService: AuthenticationService,
            private config: AppConfigService) {
            super();
    }
    getUsers(): Observable<User[]> {
    const httpOption = { headers: new HttpHeaders({ 'Authorization': 'Bearer ' + this.authenticationService.token }) };
    return this.http.get<User[]>(this.config.apiUrl + '/user', httpOption)
                    .pipe(
                        map(response => {
                            // Lógica de mapeo si es necesario
                            return response;
                        }),
                        catchError(this.handleError)  // Aquí usamos catchError desde 'rxjs/operators'
                    );
}
    // getUsers(): Observable<User[]> {
    //     // Agregar encabezado de autorización con token jwt
    //     const  httpOption = {headers: new HttpHeaders ({'Authorization': 'Bearer ' + this.authenticationService.token})};
    //     return this.http.get<User[]>(this.config.apiUrl + '/user', httpOption)
    //                                                         .pipe(catchError(this.handleError));
    // }
}
