import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from '../interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrdersServise {
  constructor(private http: HttpClient) { }

  create(order: Order): Observable<Order> {
    return this.http.post<Order>('/api/order', order)
  }

  fetch(params: any = {}): Observable<Order[]> {
    return this.http.get<Order[]>('/api/order', {
      params: new HttpParams({
        fromObject: params
      })
    })
  }

  update(objectFlag: any = {}): Observable<Order> {
    return this.http.patch<Order>(`/api/order/${objectFlag._id}`, objectFlag)
  }
}
