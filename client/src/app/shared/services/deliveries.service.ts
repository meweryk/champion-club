import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Delivery } from '../interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class DeliveriesServise {
  constructor(private http: HttpClient) {
  }

  create(delivery: Delivery): Observable<Delivery> {
    return this.http.post<Delivery>('/api/delivery', delivery)
  }
}
