import type { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';


@Injectable({ providedIn: 'root' })
export class SessionStorageService {

  private storageSub = new Subject<boolean>();
  private selling = new Subject<boolean>();


  watchStorage(): Observable<any> {
    return this.storageSub.asObservable();
  }
  getSellingStorage(): Observable<any> {
    return this.selling.asObservable();
  }
  setSellingStorage(val: boolean) {
    this.selling.next(val);
  }

  setItem(key: string, data: any) {
    sessionStorage.setItem(key, data);
    if (key === 'canalVentaCliente') {
      this.storageSub.next(true);
    }
  }

  refreshLogo() {
    this.storageSub.next(true);
  }

  removeItem(key: any) {
    sessionStorage.removeItem(key);
    // this.storageSub.next(true);
  }

  clearStorage() {
    sessionStorage.clear();
    localStorage.clear();
    this.storageSub.next(true);
  }
}
