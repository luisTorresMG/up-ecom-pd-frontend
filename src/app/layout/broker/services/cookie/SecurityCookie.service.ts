import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AppConfig } from "../../../../app.config";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class SecurityCookieService {

    private headers = new HttpHeaders({ 'Content-Type': 'application/json', 'authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJZCI6IjUyMDIyIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvbmFtZSI6IkpPU1VFIFJFTkFUTyIsIkNhbmFsIjoiMjAxODAwMDAzOCIsIlB1bnRvVmVudGEiOiIzMiIsIkJyb2tlcklkIjoiMjAxODAwMDAzOCIsIkludGVybWVkaWFJZCI6IjAiLCJQcm9maWxlSWQiOiI3IiwiVGlwb0NhbmFsIjoiOCIsImp0aSI6IjAxZDU3NDIwLTViYmEtNDRkZi1hOWFmLTcwOWFmYjY4NmNlZSIsImV4cCI6MTc3Mjc1MzEzMSwiaXNzIjoiaHR0cHM6Ly9wbGF0YWZvcm1hZGlnaXRhbC5wcm90ZWN0YXNlY3VyaXR5LnBlLyIsImF1ZCI6Imh0dHBzOi8vcGxhdGFmb3JtYWRpZ2l0YWwucHJvdGVjdGFzZWN1cml0eS5wZS8ifQ.jsDDPRsMPmCFptj3OSX6ZVJM3hbnp28Uq2ijrvR0I7w' });
    private Url = AppConfig.URL_API_SCTR;

    constructor(private http: HttpClient) { }

    public getSecurityCookie(): Observable<any> {
        return this.http.post(this.Url + '/Security/GenerateCookieSecurity', null, {
            headers: this.headers,
            // withCredentials: true
        });
    }
}